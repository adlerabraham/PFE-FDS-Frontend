import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Table, Menu, Dropdown, notification } from 'antd';
import './NoteCardTable.scss';
import { useCreateGradesMutation, useUpdateSecondEntryMutation } from '../../api/ApiEndpoints';
import { SaveOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';  // Import useNavigate


const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);

    useEffect(() => {
        if (editing && inputRef.current!= null) {
            inputRef.current.focus();
        }
    }, [editing]);


    const toggleEdit = () => {
        setEditing((prevEditing) => !prevEditing); // Utilisation de la fonction de mise à jour de l'état
        // form.setFieldsValue({
        //     [dataIndex]: record[dataIndex],
        // });
    };
   
    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({
                ...record,
                ...values,
            });
            //form.resetFields(); // Ajoutez cette ligne
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };


    let childNode = children;
    if (editable) {
        childNode = (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />

            </Form.Item>
        );
    } else {
        childNode = (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }
    return <td {...restProps}>{childNode}</td>;
};


const NoteCardTableEdit = (props) => {
    const noteData = JSON.parse(localStorage.getItem('noteCards'));
    // console.log('Note Data from Local Storage:', noteData);
    const [dataSource, setDataSource] = useState(noteData);
    const group = localStorage.getItem('group')
    const noteCardId = JSON.parse(localStorage.getItem('noteCardID'));
    const [createGrades] = useCreateGradesMutation();
    const [updateSecondEntry]= useUpdateSecondEntryMutation();
    const [updatedData, setUpdatedData] = useState([]); // Ajoutez cette ligne
    const noteCardStatus = JSON.parse(localStorage.getItem('noteCardStatus'))


    // useEffect(() => {
    //     const noteData = JSON.parse(localStorage.getItem('noteCards')) || [];
    //     const dataSourceWithKey = noteData.map((item, index) => ({ ...item, key: index + 1 }));
    //     setDataSource(dataSourceWithKey);
    // }, []);
    

    const defaultColumns = [
        {
            title: 'Code',
            dataIndex: 'code',
            className: 'code',
        },
        {
            title: 'Prenom',
            dataIndex: 'prenom',
            className: 'prenom',
        },
        {
            title: 'Nom',
            dataIndex: 'nom',
            className: 'nom',
        },
        {
            title: 'Partiel',
            dataIndex: 'intra',
            editable: true,
            className: 'partiel',
        },
        {
            title: 'Final',
            dataIndex: 'examen',
            editable: true,
            className: 'final',
        },
    ];

    const [editableColumns, setEditableColumns] = useState([]);
    const [editableIndex, setEditableIndex] = useState("")

    const toggleEditable = (dataIndex) => {

        // Utilisez la fonction de rappel pour vous assurer que l'état est à jour
        setEditableColumns(prevColumns => {
            if (prevColumns.includes(dataIndex)) {
                return [];
            } else {
                return [dataIndex];
            }
        });
    
        // Utilisez la fonction de rappel pour vous assurer que l'état est à jour
        setEditableIndex(prevIndex => {
            if (prevIndex === dataIndex) {
                return "";
            } else {
                return dataIndex;
            }
        });
    
        // setTimeout(() => {
        //     console.log("After toggle - editableColumns:", editableColumns);
        //     console.log("After toggle - editableIndex:", editableIndex);
        // }, 0);
    };
    
    const navigate = useNavigate();

    const openNotification = () => {
        notification.success({
          message: 'Sauvegarde réussie',
          description: 'Les notes ont été sauvegardées avec succès.',
        });
    };

    const openUnsuccessfulNotification = () => {
        notification.error({
          message: 'Sauvegarde échouée',
          description: 'La sauvegarde des notes a échoué.',
        });
    };

    const handleSave = (row) => {
        //AAAAAAAAAA
        //setUpdatedData((prevData) => [...prevData, row]);
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
        localStorage.setItem('noteCards', JSON.stringify(newData));
    };


    const handleCreate = () => {
        if (localStorage.getItem('noteCards') != null) {
            const gradeList = JSON.parse(localStorage.getItem('noteCards'))
            const transcriptLength = localStorage.getItem('transcriptLength')
            const preparedData = []
            //var validRow = 0
            if (editableIndex === 'intra') {
                 //enregistrer les notes d'intra
                 if(group.toLowerCase() === 'teacher'){
                    for (let index = 0; index < gradeList.length; index++) {
                        const element = gradeList[index];
                        // if(element.intra != null)
                        //     validRow ++
                        preparedData.push({
                            grade: {
                                student: element.student_level_id,
                            },
                            first_entry: element.intra,
                        })
                    }
                    
                    //if(validRow == transcriptLength){
                        const grades = { entries: preparedData }                    
                        const createRequestResults = createGrades({ gradeList: grades, transcriptID: noteCardId.intra }).unwrap()
                        createRequestResults.then((result) => {
                            localStorage.setItem('intra_first_entry_temp_id', JSON.stringify(result))
                            openNotification(); 
                            navigate('../view');
                        }).catch((error)=>{
                            openUnsuccessfulNotification()
                        })
                    // }else{
                    //     openUnsuccessfulNotification()
                    // }
                    
                }else if (group.toLowerCase() === 'coordinator') {
                    if (localStorage.getItem('intra_second_entry_temp_id')) {
                        const idTable = JSON.parse(localStorage.getItem('intra_second_entry_temp_id'))
                        for (let index = 0; index < gradeList.length; index++) {
                            const element = gradeList[index];
                            // if(element.intra != null)
                            //     validRow ++
                            preparedData.push({
                                id: Number(idTable[index].second_entry_temp_id), // Convertir en entier
                                second_entry: element.intra,
                            })
                        }
                        
                        //if(validRow == transcriptLength){
                            const grades = { updates: preparedData }
                            updateSecondEntry({ gradeList: grades, transcriptID: noteCardId.intra })
                            openNotification(); 
                            navigate('../view');
                        // }else{
                        //     openUnsuccessfulNotification()
                        // }
                    }
                    
                }
            }else if(editableIndex === 'examen'){
                //enregistrer les notes d'examen
                if(group.toLowerCase() === 'teacher'){
                    for (let index = 0; index < gradeList.length; index++) {
                        const element = gradeList[index];
                        // if(element.examen != null)
                        //     validRow ++
                        preparedData.push({
                            grade: {
                                student: element.student_level_id,
                            },
                            first_entry: element.examen,
                        })
                    }
                    
                    //if(validRow == transcriptLength){
                        const grades = { entries: preparedData }                
                        const createRequestResults = createGrades({ gradeList: grades, transcriptID: noteCardId.examen }).unwrap()
                        createRequestResults.then((result) => {
                            localStorage.setItem('examen_first_entry_temp_id', JSON.stringify(result))
                            openNotification(); 
                            navigate('../view');
                        }).catch((error)=>{
                            openUnsuccessfulNotification()
                        })
                    // }else{
                    //     openUnsuccessfulNotification()
                    // }
                }else if(group.toLowerCase() === 'coordinator'){
                    if(localStorage.getItem('examen_second_entry_temp_id')){
                        const idTable = JSON.parse(localStorage.getItem('examen_second_entry_temp_id'))
                        for (let index = 0; index < gradeList.length; index++) {
                            const element = gradeList[index];
                            // if(element.examen != null)
                            //     validRow ++
                            preparedData.push({
                                id: idTable[index].second_entry_temp_id,
                                second_entry: element.examen,
                            })
                        }
                        
                        //if(validRow == transcriptLength){
                            const grades = { updates: preparedData }
                            updateSecondEntry({ gradeList: grades, transcriptID: noteCardId.examen })
                            openNotification(); 
                            navigate('../view');
                        // }else{
                        //     openUnsuccessfulNotification()
                        // }
                    }
                }   
            }
        }
        
    }
    
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }

        if(group.toLowerCase()==='teacher'){
            var intraMenu = (
                <Menu>
                    {noteCardStatus.isIntraSaved?
                        <Menu.Item key="edit" onClick={() => toggleEditable(col.dataIndex)} disabled>
                            {editableColumns.includes(col.dataIndex) ? 'Annuler' : 'Modifier'}
                        </Menu.Item>    
                    :
                        <Menu.Item key="edit" onClick={() => toggleEditable(col.dataIndex)}>
                            {editableColumns.includes(col.dataIndex) ? 'Annuler' : 'Modifier'}
                        </Menu.Item>
                    }
                    {noteCardStatus.isIntraSaved?
                        <Menu.Item key="save" onClick={handleCreate} disabled>
                            Sauvegarder
                        </Menu.Item>
                    :
                        <Menu.Item key="save" onClick={handleCreate}>
                            Sauvegarder
                        </Menu.Item>
                    }
                    
                </Menu>
            )

            var finaleMenu=(
                <Menu>
                    {noteCardStatus.isFinaleSaved?
                        <Menu.Item key="edit" onClick={() => toggleEditable(col.dataIndex)} disabled>
                            {editableColumns.includes(col.dataIndex) ? 'Annuler' : 'Modifier'}
                        </Menu.Item>    
                    :
                        <Menu.Item key="edit" onClick={() => toggleEditable(col.dataIndex)}>
                            {editableColumns.includes(col.dataIndex) ? 'Annuler' : 'Modifier'}
                        </Menu.Item>
                    }
                    {noteCardStatus.isFinaleSaved?
                        <Menu.Item key="save" onClick={handleCreate} disabled>
                            Sauvegarder
                        </Menu.Item>
                    :
                        <Menu.Item key="save" onClick={handleCreate}>
                            Sauvegarder
                        </Menu.Item>
                    }
                </Menu>
            )

        }else if(group.toLowerCase() === 'coordinator'){
            var intraMenu = (
                <Menu>
                    <Menu.Item key="edit" onClick={() => toggleEditable(col.dataIndex)}>
                        {editableColumns.includes(col.dataIndex) ? 'Annuler' : 'Modifier'}
                    </Menu.Item>
                    <Menu.Item key="save" onClick={handleCreate}>
                        Sauvegarder
                    </Menu.Item>
                </Menu>
            )

            var finaleMenu=(
                <Menu>
                    <Menu.Item key="edit" onClick={() => toggleEditable(col.dataIndex)}>
                        {editableColumns.includes(col.dataIndex) ? 'Annuler' : 'Modifier'}
                    </Menu.Item>
                    <Menu.Item key="save" onClick={handleCreate}>
                        Sauvegarder
                    </Menu.Item>
                </Menu>
            )
        }
        
        if(col.dataIndex === 'intra'){
            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: editableColumns.includes(col.dataIndex),
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave,
                    className: 'custom-size-cell',
                }),
                title: (
                    <div className="custom-column-header">
                        {col.title}
                        <Dropdown overlay={intraMenu} placement="bottomRight" trigger={['click']}>
                            <Button size="small" icon={<EllipsisOutlined />} />
                        </Dropdown>
                    </div>
                ),
            };
        }else if(col.dataIndex === 'examen'){
            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: editableColumns.includes(col.dataIndex),
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave,
                    className: 'custom-size-cell',
                }),
                title: (
                    <div className="custom-column-header">
                        {col.title}
                        <Dropdown overlay={finaleMenu} placement="bottomRight" trigger={['click']}>
                            <Button size="small" icon={<EllipsisOutlined />} />
                        </Dropdown>
                    </div>
                ),
            };
        }
    });

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 40, // Set the desired page size here
      });
    
      const handleTableChange = (pagination) => {
        setPagination(pagination);
      };
    

    return (
        <div>
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
                pagination={pagination}
                onChange={handleTableChange}
                // rowKey="key"
            />
        </div>
    );
};

export default NoteCardTableEdit;

// import React, { useContext, useEffect, useRef, useState } from 'react';
// import { Button, Form, Input, Table } from 'antd';
// import './NoteCardTable.scss'
// import { useCreateGradesMutation } from '../../api/ApiEndpoints';

// const EditableContext = React.createContext(null);
// const EditableRow = ({ index, ...props }) => {
//     const [form] = Form.useForm();
//     return (
//         <Form form={form} component={false}>
//             <EditableContext.Provider value={form}>
//                 <tr {...props} />
//             </EditableContext.Provider>
//         </Form>
//     );
// };

// const EditableCell = ({
//     title,
//     editable,
//     children,
//     dataIndex,
//     record,
//     handleSave,
//     ...restProps
// }) => {
//     const [editing, setEditing] = useState(false);
//     const inputRef = useRef(null);
//     const form = useContext(EditableContext);

//     useEffect(() => {
//         if (editing) {
//             inputRef.current.focus();
//         }
//     }, [editing]);

//     const toggleEdit = () => {
//         setEditing(!editing);
//         form.setFieldsValue({
//             [dataIndex]: record[dataIndex],
//         });
//     };

//     const save = async () => {
//         try {
//             const values = await form.validateFields();
//             toggleEdit();
//             handleSave({
//                 ...record,
//                 ...values,
//             });
//         } catch (errInfo) {
//             console.log('Save failed:', errInfo);
//         }
//     };
//     let childNode = children;
//     if (editable) {
//         childNode = editing ? (
//             <Form.Item
//                 style={{
//                     margin: 0,
//                 }}
//                 name={dataIndex}
//                 rules={[
//                     {
//                         required: true,
//                         message: `${title} is required.`,
//                     },
//                 ]}
//             >
//                 <Input ref={inputRef} onPressEnter={save} onBlur={save} />
//             </Form.Item>
//         ) : (
//             <div
//                 className="editable-cell-value-wrap"
//                 style={{
//                     paddingRight: 24,
//                 }}
//                 onClick={toggleEdit}
//             >
//                 {children}
//             </div>
//         );
//     }
//     return <td {...restProps}>{childNode}</td>;
// };



// const NoteCardTableCreate = (props) => {
//     const noteData = JSON.parse(localStorage.getItem('noteData'))

//     const [dataSource, setDataSource] = useState(noteData);
//     const noteCardId = JSON.parse(localStorage.getItem('noteCardID'))
//     const [createGrades] = useCreateGradesMutation()

//     const defaultColumns = [
//         {
//             title: 'Code Etudiant',
//             dataIndex: 'code'
//         },
//         {
//             title: 'Prenom',
//             dataIndex: 'prenom'
//         },
//         {
//             title: 'Nom',
//             dataIndex: 'nom'
//         },
//         {
//             title: 'Partiel',
//             dataIndex: 'intra',
//             editable: true
//         },
//         {
//             title: 'Final',
//             dataIndex: 'examen',
//             editable: false
//         },
//     ];

//     const handleSave = (row) => {
//         const newData = [...dataSource];
//         const index = newData.findIndex((item) => row.key === item.key);
//         const item = newData[index];
//         newData.splice(index, 1, {
//             ...item,
//             ...row,
//         });
//         setDataSource(newData);
//         localStorage.setItem("noteCards", JSON.stringify(newData))
//     };

//     const handleCreate = () => {
//         if (localStorage.getItem('noteCards') != null) {
//             const gradeList = JSON.parse(localStorage.getItem('noteCards'))
//             const preparedData = []
//             //enregistrer les notes d'intra
//             for (let index = 0; index < gradeList.length; index++) {
//                 const element = gradeList[index];
//                 preparedData.push({
//                     grade: {
//                         student: element.student_level_id,
//                     },
//                     first_entry: element.intra,
//                 })
//             }
//             const grades = { entries: preparedData }
//             const createRequestResults = createGrades({ gradeList: grades, transcriptID: noteCardId.intra }).unwrap()
//             createRequestResults.then((result) => {
//                 console.log(result);
//                 localStorage.setItem('tbl_first_entry_temp_id', JSON.stringify(result))
//             })

//         }
//     }

//     const components = {
//         body: {
//             row: EditableRow,
//             cell: EditableCell,
//         },
//     };

//     const columns = defaultColumns.map((col) => {
//         if (!col.editable) {
//             return col;
//         }
//         return {
//             ...col,
//             onCell: (record) => ({
//                 record,
//                 editable: col.editable,
//                 dataIndex: col.dataIndex,
//                 title: col.title,
//                 handleSave,
//             }),
//         };
//     });
//     return (
//         <div>
//             <Table
//                 components={components}
//                 rowClassName={() => 'editable-row'}
//                 bordered
//                 dataSource={dataSource}
//                 columns={columns}
//             />
//             <Button onClick={handleCreate}>Sauvegarder</Button>
//         </div>
//     );
// };
// export default NoteCardTableCreate;

















// import React, { useContext, useEffect, useRef, useState } from 'react';
// import { Button, Form, Input, Table, Menu, Dropdown } from 'antd';
// import './NoteCardTable.scss';
// import { useCreateGradesMutation } from '../../api/ApiEndpoints';
// import { SaveOutlined, EllipsisOutlined } from '@ant-design/icons';

// const EditableContext = React.createContext(null);

// const EditableRow = ({ index, ...props }) => {
//     const [form] = Form.useForm();
//     return (
//         <Form form={form} component={false}>
//             <EditableContext.Provider value={form}>
//                 <tr {...props} />
//             </EditableContext.Provider>
//         </Form>
//     );
// };

// const EditableCell = ({
//     title,
//     editable,
//     children,
//     dataIndex,
//     record,
//     handleSave,
//     ...restProps
// }) => {
//     const [editing, setEditing] = useState(false);
//     const inputRef = useRef(null);
//     const form = useContext(EditableContext);

//     useEffect(() => {
//         if (editing) {
//             inputRef.current.focus();
//         }
//     }, [editing]);

//     const toggleEdit = () => {
//         setEditing(!editing);
//         form.setFieldsValue({
//             [dataIndex]: record[dataIndex],
//         });
//     };

//     const save = async () => {
//         try {
//             const values = await form.validateFields();
//             toggleEdit();
//             handleSave({
//                 ...record,
//                 ...values,
//             });
//         } catch (errInfo) {
//             console.log('Save failed:', errInfo);
//         }
//     };

//     let childNode = children;
//     if (editable) {
//         childNode = editing ? (
//             <Form.Item
//                 style={{
//                     margin: 0,
//                 }}
//                 name={dataIndex}
//                 rules={[
//                     {
//                         required: true,
//                         message: `${title} is required.`,
//                     },
//                 ]}
//             >
//                 <Input ref={inputRef} onPressEnter={save} onBlur={save} />
//             </Form.Item>
//         ) : (
//             <div
//                 className="editable-cell-value-wrap"
//                 style={{
//                     paddingRight: 24,
//                 }}
//                 onClick={toggleEdit}
//             >
//                 {children}
//             </div>
//         );
//     }
//     return <td {...restProps}>{childNode}</td>;
// };

// const NoteCardTableEdit = (props) => {
//     const noteData = JSON.parse(localStorage.getItem('noteCards'));
//     const [dataSource, setDataSource] = useState(noteData);
//     const noteCardId = JSON.parse(localStorage.getItem('noteCardID'));
//     const [createGrades] = useCreateGradesMutation();

//     const defaultColumns = [
//         {
//             title: 'Code',
//             dataIndex: 'code',
//             className: 'code',
//         },
//         {
//             title: 'Prenom',
//             dataIndex: 'prenom',
//             className: 'prenom',
//         },
//         {
//             title: 'Nom',
//             dataIndex: 'nom',
//             className: 'nom',
//         },
//         {
//             title: 'Partiel',
//             dataIndex: 'intra',
//             editable: true,
//             className: 'partiel',
//         },
//         {
//             title: 'Final',
//             dataIndex: 'examen',
//             editable: true,
//             className: 'final',
//         },
//     ];

//     const [editableColumns, setEditableColumns] = useState([]);
//     const [editableIndex, setEditableIndex] = useState("")

//     // const toggleEditable = (dataIndex) => {

//     //     console.log('Editable Columns:', editableColumns);
//     //     console.log('Editable Index:', editableIndex);

//     //     if (editableColumns.length === 1 && editableColumns.includes(dataIndex)) {
//     //         setEditableColumns([]);
//     //         setEditableIndex("");

//     //     } else if (!editableColumns.includes(dataIndex)) {
//     //         setEditableColumns([dataIndex]);
//     //         //console.log(editableColumns);
//     //         setEditableIndex(dataIndex)
//     //     }
//     // };

//     const toggleEditable = (dataIndex) => {
//         console.log("Before toggle - editableColumns:", editableColumns);
//         console.log("Before toggle - editableIndex:", editableIndex);
    
//         // Utilisez la fonction de rappel pour vous assurer que l'état est à jour
//         setEditableColumns(prevColumns => {
//             if (prevColumns.includes(dataIndex)) {
//                 return [];
//             } else {
//                 return [dataIndex];
//             }
//         });
    
//         // Utilisez la fonction de rappel pour vous assurer que l'état est à jour
//         setEditableIndex(prevIndex => {
//             if (prevIndex === dataIndex) {
//                 return "";
//             } else {
//                 return dataIndex;
//             }
//         });
    
//         console.log("After toggle - editableColumns:", editableColumns);
//         console.log("After toggle - editableIndex:", editableIndex);
//     };
    


//     const handleSave = (row) => {
//         const newData = [...dataSource];
//         const index = newData.findIndex((item) => row.key === item.key);
//         const item = newData[index];
//         newData.splice(index, 1, {
//             ...item,
//             ...row,
//         });
//         setDataSource(newData);
//         localStorage.setItem('noteCards', JSON.stringify(newData));
//     };

//     const handleUpdate = () => {
//         if (localStorage.getItem('noteCards') != null) {
//             const gradeList = JSON.parse(localStorage.getItem('noteCards'))
//             if (localStorage.getItem("tbl_first_entry_temp_id") != null) {
//                 const tempGradesId = JSON.parse(localStorage.getItem("tbl_first_entry_temp_id"))
//                 const preparedData = []
//                 setEditableColumns([]);
//                 setEditableIndex("");

//                 if (editableIndex === 'intra') {
//                     //enregistrer les modifications des notes d'intra
//                     for (let index = 0; index < gradeList.length; index++) {
//                         const element = gradeList[index];
//                         const tempGradeIndex = tempGradesId.findIndex((item) =>
//                             item.student_level_id === element.student_level_id
//                         )

//                         if (tempGradesId[tempGradeIndex] != undefined) {
//                             preparedData.push({
//                                 id: tempGradesId[tempGradeIndex].first_entry_temp_id,
//                                 first_entry: element.intra,
//                             })
//                         }
//                     }

//                     const grades = { updates: preparedData }
//                     const createRequestResults = createGrades({
//                         gradeList: grades,
//                         transcriptID: noteCardId.intra
//                     }).unwrap()
//                     createRequestResults.then((result) => {
//                         console.log(result);
//                         localStorage.setItem('tbl_first_entry_temp_id', JSON.stringify(result))
//                     })
//                 } else if (editableIndex === 'examen') {
//                     //enregistrer les modifications des notes finales
//                     for (let index = 0; index < gradeList.length; index++) {
//                         const element = gradeList[index];
//                         const tempGradeIndex = tempGradesId.findIndex((item) =>
//                             item.student_level_id === element.student_level_id
//                         )

//                         if (tempGradesId[tempGradeIndex] != undefined) {
//                             preparedData.push({
//                                 id: tempGradesId[tempGradeIndex].first_entry_temp_id,
//                                 first_entry: element.examen,
//                             })
//                         }
//                     }

//                     const grades = { updates: preparedData }
//                     const createRequestResults = createGrades({
//                         gradeList: grades,
//                         transcriptID: noteCardId.intra
//                     }).unwrap()
//                     createRequestResults.then((result) => {
//                         console.log(result);
//                         localStorage.setItem('tbl_first_entry_temp_id', JSON.stringify(result))
//                     })
//                 }

//             }
//         }
//     };

//     const components = {
//         body: {
//             row: EditableRow,
//             cell: EditableCell,
//         },
//     };

//     const columns = defaultColumns.map((col) => {
//         if (!col.editable) {
//             return col;
//         }

//         const menu = (
//             <Menu>
//                 <Menu.Item key="edit" onClick={() => toggleEditable(col.dataIndex)}>
//                     {editableColumns.includes(col.dataIndex) ? 'Annuler' : 'Modifier'}
//                 </Menu.Item>
//                 <Menu.Item key="save" onClick={handleUpdate}>
//                     Sauvegarder
//                 </Menu.Item>
//             </Menu>
//         );

//         console.log("inside columns:", editableColumns);
//         return {
//             ...col,
//             onCell: (record) => ({
//                 record,
//                 editable: editableColumns.includes(col.dataIndex),
//                 dataIndex: col.dataIndex,
//                 title: col.title,
//                 handleSave,
//                 className: 'custom-size-cell',
//             }),
//             title: (
//                 <div className="custom-column-header">
//                     {col.title}
//                     <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
//                         <Button size="small" icon={<EllipsisOutlined />} />
//                     </Dropdown>
//                 </div>
//             ),
//         };
//     });

//     return (
//         <div>
//             <Table
//                 components={components}
//                 rowClassName={() => 'editable-row'}
//                 bordered
//                 dataSource={dataSource}
//                 columns={columns}
//             />
//         </div>
//     );
// };

// export default NoteCardTableEdit;














// import React, { useContext, useEffect, useRef, useState } from 'react';
// import { Button, Form, Input, Table } from 'antd';
// import './NoteCardTable.scss';
// import { useCreateGradesMutation } from '../../api/ApiEndpoints';

// const EditableContext = React.createContext(null);

// const EditableRow = ({ index, ...props }) => {
//     const [form] = Form.useForm();
//     return (
//         <Form form={form} component={false}>
//             <EditableContext.Provider value={form}>
//                 <tr {...props} />
//             </EditableContext.Provider>
//         </Form>
//     );
// };

// const EditableCell = ({
//     title,
//     editable,
//     children,
//     dataIndex,
//     record,
//     handleSave,
//     ...restProps
// }) => {
//     const [editing, setEditing] = useState(false);
//     const inputRef = useRef(null);
//     const form = useContext(EditableContext);

//     useEffect(() => {
//         if (editing) {
//             inputRef.current.focus();
//         }
//     }, [editing]);

//     const toggleEdit = () => {
//         setEditing(!editing);
//         form.setFieldsValue({
//             [dataIndex]: record[dataIndex],
//         });
//     };

//     const save = async () => {
//         try {
//             const values = await form.validateFields();
//             toggleEdit();
//             handleSave({
//                 ...record,
//                 ...values,
//             });
//         } catch (errInfo) {
//             console.log('Save failed:', errInfo);
//         }
//     };

//     let childNode = children;
//     if (editable) {
//         childNode = editing ? (
//             <Form.Item
//                 style={{
//                     margin: 0,
//                 }}
//                 name={dataIndex}
//                 rules={[
//                     {
//                         required: true,
//                         message: `${title} is required.`,
//                     },
//                 ]}
//             >
//                 <Input ref={inputRef} onPressEnter={save} onBlur={save} />
//             </Form.Item>
//         ) : (
//             <div
//                 className="editable-cell-value-wrap"
//                 style={{
//                     paddingRight: 24,
//                 }}
//                 onClick={toggleEdit}
//             >
//                 {children}
//             </div>
//         );
//     }
//     return <td {...restProps}>{childNode}</td>;
// };

// const NoteCardTableEdit = (props) => {
//     const noteData = JSON.parse(localStorage.getItem('noteCards'));
//     const [dataSource, setDataSource] = useState(noteData);
//     const noteCardId = JSON.parse(localStorage.getItem('noteCardID'));
//     const [createGrades] = useCreateGradesMutation();

//     const defaultColumns = [
//         {
//             title: 'Code Etudiant',
//             dataIndex: 'code',
//         },
//         {
//             title: 'Prenom',
//             dataIndex: 'prenom',
//         },
//         {
//             title: 'Nom',
//             dataIndex: 'nom',
//         },
//         {
//             title: 'Partiel',
//             dataIndex: 'intra',
//             editable: true,
//         },
//         {
//             title: 'Final',
//             dataIndex: 'examen',
//             editable: true,
//         },
//     ];

//     const [editableColumns, setEditableColumns] = useState([]);
//     const [editableIndex, setEditableIndex] = useState("")

//     const toggleEditable = (dataIndex) => {

//         if (editableColumns.includes(dataIndex)) {
//             setEditableColumns(editableColumns.filter((col) => col !== dataIndex));

//         } else {
//             setEditableColumns([...editableColumns, dataIndex]);
//             setEditableIndex(dataIndex)
//         }
//     };

//     const handleSave = (row) => {
//         const newData = [...dataSource];
//         const index = newData.findIndex((item) => row.key === item.key);
//         const item = newData[index];
//         newData.splice(index, 1, {
//             ...item,
//             ...row,
//         });
//         setDataSource(newData);
//         localStorage.setItem('noteCards', JSON.stringify(newData));
//     };

//     const handleUpdate = () => {
//         if (localStorage.getItem('noteCards') != null) {
//             const gradeList = JSON.parse(localStorage.getItem('noteCards'))
//             if (localStorage.getItem("tbl_first_entry_temp_id") != null) {
//                 const tempGradesId = JSON.parse(localStorage.getItem("tbl_first_entry_temp_id"))
//                 const preparedData = []
//                 console.log("tempgrades");
//                 console.log(editableIndex);

//                 if (editableIndex === 'intra') {
//                     //enregistrer les modifications des notes d'intra
//                     for (let index = 0; index < gradeList.length; index++) {
//                         const element = gradeList[index];
//                         const tempGradeIndex = tempGradesId.findIndex((item) =>
//                             item.student_level_id === element.student_level_id
//                         )

//                         if (tempGradesId[tempGradeIndex] != undefined) {
//                             preparedData.push({
//                                 id: tempGradesId[tempGradeIndex].first_entry_temp_id,
//                                 first_entry: element.intra,
//                             })
//                         }
//                     }

//                     const grades = { updates: preparedData }
//                     const createRequestResults = createGrades({
//                         gradeList: grades,
//                         transcriptID: noteCardId.intra
//                     }).unwrap()
//                     createRequestResults.then((result) => {
//                         console.log(result);
//                         localStorage.setItem('tbl_first_entry_temp_id', JSON.stringify(result))
//                     })
//                 } else if (editableIndex === 'examen') {
//                     //enregistrer les modifications des notes finales
//                     for (let index = 0; index < gradeList.length; index++) {
//                         const element = gradeList[index];
//                         const tempGradeIndex = tempGradesId.findIndex((item) =>
//                             item.student_level_id === element.student_level_id
//                         )

//                         if (tempGradesId[tempGradeIndex] != undefined) {
//                             preparedData.push({
//                                 id: tempGradesId[tempGradeIndex].first_entry_temp_id,
//                                 first_entry: element.examen,
//                             })
//                         }
//                     }

//                     const grades = { updates: preparedData }
//                     const createRequestResults = createGrades({
//                         gradeList: grades,
//                         transcriptID: noteCardId.intra
//                     }).unwrap()
//                     createRequestResults.then((result) => {
//                         console.log(result);
//                         localStorage.setItem('tbl_first_entry_temp_id', JSON.stringify(result))
//                     })
//                 }

//             }
//         }
//     };

//     const components = {
//         body: {
//             row: EditableRow,
//             cell: EditableCell,
//         },
//     };

//     const columns = defaultColumns.map((col) => {
//         if (!col.editable) {
//             return col;
//         }
//         return {
//             ...col,
//             onCell: (record) => ({
//                 record,
//                 editable: editableColumns.includes(col.dataIndex),
//                 dataIndex: col.dataIndex,
//                 title: col.title,
//                 handleSave,
//             }),
//             title: (
//                 <div>
//                     {col.title}
//                     <Button size="small" onClick={() => toggleEditable(col.dataIndex)}>
//                         {editableColumns.includes(col.dataIndex) ? 'Disable Edit' : 'Enable Edit'}
//                     </Button>
//                 </div>
//             ),
//         };
//     });

//     return (
//         <div>
//             <Table
//                 components={components}
//                 rowClassName={() => 'editable-row'}
//                 bordered
//                 dataSource={dataSource}
//                 columns={columns}
//             />
//             <Button onClick={handleUpdate}>Sauvegarder</Button>
//         </div>
//     );
// };

// export default NoteCardTableEdit;















