import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Table, Menu, Dropdown, notification, InputNumber } from 'antd';
import './NoteCardTable.scss';
import { useUpdateGradesMutation, useUpdateSecondEntryMutation } from '../../api/ApiEndpoints';
import { SaveOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';  // Import useNavigate
import TranscriptHeader from '../TranscriptHeader/TranscriptHeader';


const EditableContext = React.createContext(null);
// var inputError

// ...

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
    handleEdit,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    // const [isInputError, setIsInputError] = useState()

    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({
                ...record,
                ...values,
            });

        } catch (errInfo) {
            setIsInputError(true)
            inputError = isInputError
            console.log('Save failed:', errInfo);
        }
    };

    const handleEditClick = () => {
        handleEdit(dataIndex);
    };

    let childNode = children;
    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <InputNumber ref={inputRef} min={0} max={100} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
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

    return (
        <td {...restProps} onClick={editable ? handleEditClick : undefined}>
            {childNode}
        </td>
    );
};

// ...

const NoteCardTableEdit = (props) => {
    const noteData = JSON.parse(localStorage.getItem('noteCards'));
    const [dataSource, setDataSource] = useState(noteData);
    const group = localStorage.getItem('group')
    const noteCardId = JSON.parse(localStorage.getItem('noteCardID'));
    const [updateGrades] = useUpdateGradesMutation();
    const [updateSecondEntry] = useUpdateSecondEntryMutation()
    const noteCardStatus = JSON.parse(localStorage.getItem('noteCardStatus'))
    const params = useParams()
    const [editableIndex, setEditableIndex] = useState('');
    if (group.toLowerCase() === 'teacher') {
        if (localStorage.getItem('classTable') != null) {
            const classes = JSON.parse(localStorage.getItem('classTable'))
            var classIndex = classes.findIndex((item) =>
                item.id == params.classID
            )
            if (classIndex != -1) {
                var courseName = classes[classIndex].name
                var period = classes[classIndex].period.name
                var levels = classes[classIndex].levels
                var levelIndex = levels.findIndex((item) =>
                    item.id == params.levelID
                )
                if (levelIndex != -1) {
                    var level = levels[levelIndex].name
                } else {
                    console.log("can't find level");
                }
            }
        }
    } else if (group.toLowerCase() === 'coordinator') {
        if (localStorage.getItem('classInfoTable') != null) {
            const classes = JSON.parse(localStorage.getItem('classInfoTable'))
            var classIndex = classes.findIndex((item) =>
                item.id == params.classID
            )
            if (classIndex != -1) {
                var courseName = classes[classIndex].name
                var period = classes[classIndex].period.name
                var level = params.levelID
            }
        }
    }

    const handleEdit = (dataIndex) => {
        setEditableColumns([dataIndex]);
        setEditableIndex(dataIndex);
    };

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
    //const [editableIndex, setEditableIndex] = useState("")

    const toggleEditable = (dataIndex) => {

        if (editableColumns.length === 1 && editableColumns.includes(dataIndex)) {
            setEditableColumns([]);
            setEditableIndex("");

        } else if (!editableColumns.includes(dataIndex)) {
            setEditableColumns([dataIndex]);
            setEditableIndex(dataIndex)
        }
    };

    const navigate = useNavigate();

    const openNotification = () => {
        notification.success({
            message: 'Sauvegarde réussie',
            description: 'Les notes ont été sauvegardées avec succès.',
        });
    };

    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
        localStorage.setItem('noteCardsTemp', JSON.stringify(newData));
    };

    const handleUpdate = () => {
        if (localStorage.getItem('noteCardsTemp') != null) {
            setEditableColumns([]);
            // setEditableIndex("");
            const gradeList = JSON.parse(localStorage.getItem('noteCardsTemp'))
            const preparedData = []

            if (editableIndex === 'intra') {
                if (group.toLowerCase() === 'teacher') {
                    if (localStorage.getItem("intra_first_entry_temp_id") != null) {
                        const tempGradesId = JSON.parse(localStorage.getItem("intra_first_entry_temp_id"))
                        //enregistrer les modifications des notes d'intra
                        for (let index = 0; index < gradeList.length; index++) {
                            const element = gradeList[index];
                            const tempGradeIndex = tempGradesId.findIndex((item) =>
                                item.student_level_id === element.student_level_id
                            )

                            if (tempGradesId[tempGradeIndex] != undefined) {
                                preparedData.push({
                                    id: tempGradesId[tempGradeIndex].first_entry_temp_id,
                                    first_entry: element.intra,
                                })
                            }
                        }

                        const grades = { updates: preparedData }
                        updateGrades({ gradeList: grades, transcriptID: noteCardId.intra })
                        localStorage.setItem('noteCards', JSON.stringify(dataSource))
                        openNotification();
                        navigate('../view');
                        // Mettre à jour l'état de l'édition pour désactiver l'édition
                    }
                } else if (group.toLowerCase() === 'coordinator') {
                    if (localStorage.getItem('intra_second_entry_temp_id')) {
                        const idTable = JSON.parse(localStorage.getItem('intra_second_entry_temp_id'))
                        for (let index = 0; index < gradeList.length; index++) {
                            const element = gradeList[index];
                            const tempGradeIndex = idTable.findIndex((item) =>
                                item.student_level_id === element.student_level_id
                            )

                            if (idTable[tempGradeIndex] != undefined) {
                                preparedData.push({
                                    id: idTable[tempGradeIndex].second_entry_temp_id,
                                    second_entry: element.intra,
                                })
                            }
                        }
                        const grades = { updates: preparedData }
                        updateSecondEntry({ gradeList: grades, transcriptID: noteCardId.intra })
                        localStorage.setItem('noteCards', JSON.stringify(dataSource))
                        openNotification();
                        navigate('../view');
                    }
                }
            } else if (editableIndex === 'examen') {
                if (group.toLowerCase() === 'teacher') {
                    if (localStorage.getItem("examen_first_entry_temp_id") != null) {
                        const tempGradesId = JSON.parse(localStorage.getItem("examen_first_entry_temp_id"))
                        //enregistrer les modifications des notes finales
                        for (let index = 0; index < gradeList.length; index++) {
                            const element = gradeList[index];
                            const tempGradeIndex = tempGradesId.findIndex((item) =>
                                item.student_level_id === element.student_level_id
                            )

                            if (tempGradesId[tempGradeIndex] != undefined) {
                                preparedData.push({
                                    id: tempGradesId[tempGradeIndex].first_entry_temp_id,
                                    first_entry: element.examen,
                                })
                            }
                        }

                        const grades = { updates: preparedData }
                        updateGrades({ gradeList: grades, transcriptID: noteCardId.examen })
                        localStorage.setItem('noteCards', JSON.stringify(dataSource))
                        openNotification();
                        navigate('../view');
                        // Mettre à jour l'état de l'édition pour désactiver l'édition
                    }
                } else if (group.toLowerCase() === 'coordinator') {
                    if (localStorage.getItem('examen_second_entry_temp_id')) {
                        const idTable = JSON.parse(localStorage.getItem('examen_second_entry_temp_id'))
                        for (let index = 0; index < gradeList.length; index++) {
                            const element = gradeList[index];
                            const tempGradeIndex = idTable.findIndex((item) =>
                                item.student_level_id === element.student_level_id
                            )

                            if (idTable[tempGradeIndex] != undefined) {
                                preparedData.push({
                                    id: idTable[tempGradeIndex].second_entry_temp_id,
                                    second_entry: element.examen,
                                })
                            }
                        }
                        const grades = { updates: preparedData }
                        updateSecondEntry({ gradeList: grades, transcriptID: noteCardId.examen })
                        //faire le traitement du resultat de la requette
                        localStorage.setItem('noteCards', JSON.stringify(dataSource))
                        openNotification();
                        navigate('../view');
                    }
                }

            }
        }
    };

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

        if (group.toLowerCase() === 'teacher') {
            var intraMenu = (
                <Menu>
                    {noteCardStatus.isIntraSubmitted || !noteCardStatus.isIntraSaved ?
                        <Menu.Item key="edit" onClick={() => toggleEditable(col.dataIndex)} disabled>
                            {editableIndex === col.dataIndex ? 'Annuler' : 'Modifier'}
                        </Menu.Item>
                        :
                        <Menu.Item key="edit" onClick={() => toggleEditable(col.dataIndex)}>
                            {editableIndex === col.dataIndex ? 'Annuler' : 'Modifier'}
                        </Menu.Item>
                    }
                    {noteCardStatus.isIntraSubmitted || !noteCardStatus.isIntraSaved ?
                        <Menu.Item key="save" onClick={handleUpdate} disabled>
                            Sauvegarder
                        </Menu.Item>
                        :
                        <Menu.Item key="save" onClick={handleUpdate}>
                            Sauvegarder
                        </Menu.Item>
                    }

                </Menu>
            )

            var finaleMenu = (
                <Menu>
                    {noteCardStatus.isFinaleSubmitted || !noteCardStatus.isFinaleSaved ?
                        <Menu.Item key="edit" onClick={() => toggleEditable(col.dataIndex)} disabled>
                            {editableIndex === col.dataIndex ? 'Annuler' : 'Modifier'}
                        </Menu.Item>
                        :
                        <Menu.Item key="edit" onClick={() => toggleEditable(col.dataIndex)}>
                            {editableIndex === col.dataIndex ? 'Annuler' : 'Modifier'}
                        </Menu.Item>
                    }
                    {noteCardStatus.isFinaleSubmitted || !noteCardStatus.isFinaleSaved ?
                        <Menu.Item key="save" onClick={handleUpdate} disabled>
                            Sauvegarder
                        </Menu.Item>
                        :
                        <Menu.Item key="save" onClick={handleUpdate}>
                            Sauvegarder
                        </Menu.Item>
                    }
                </Menu>
            )
        } else if (group.toLowerCase() === 'coordinator') {
            var intraMenu = (
                <Menu>
                    <Menu.Item key="edit" onClick={() => toggleEditable(col.dataIndex)}>
                        {editableIndex === col.dataIndex ? 'Annuler' : 'Modifier'}
                    </Menu.Item>
                    <Menu.Item key="save" onClick={handleUpdate}>
                        Sauvegarder
                    </Menu.Item>
                </Menu>
            )
            var finaleMenu = (
                <Menu>
                    <Menu.Item key="edit" onClick={() => toggleEditable(col.dataIndex)}>
                        {editableIndex === col.dataIndex ? 'Annuler' : 'Modifier'}
                    </Menu.Item>
                    <Menu.Item key="save" onClick={handleUpdate}>
                        Sauvegarder
                    </Menu.Item>
                </Menu>
            )
        }

        if (col.dataIndex === 'intra') {
            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: editableColumns.includes(col.dataIndex),
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave,
                    handleEdit,
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
        } else if (col.dataIndex === 'examen') {
            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: editableColumns.includes(col.dataIndex),
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave,
                    handleEdit,
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

    // ...
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 40, // Set the desired page size here
    });

    const handleTableChange = (pagination) => {
        setPagination(pagination);
    };

    return (
        <div>
            {/* <h6>{courseName.toUpperCase()}</h6>
            <p>{period}</p> */}
            <TranscriptHeader
                courseName={courseName}
                level={level}
                period={period}
            />
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
                pagination={pagination}
                onChange={handleTableChange}
            />
        </div>
    );
};

// ...

export default NoteCardTableEdit;




// import React, { useContext, useEffect, useRef, useState } from 'react';
// import { Button, Form, Input, Table, Menu, Dropdown, notification } from 'antd';
// import './NoteCardTable.scss';
// import { useUpdateGradesMutation, useUpdateSecondEntryMutation } from '../../api/ApiEndpoints';
// import { SaveOutlined, EllipsisOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';  // Import useNavigate


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
//             console.log(inputRef.current);
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
// const noteData = JSON.parse(localStorage.getItem('noteCards'));
// const [dataSource, setDataSource] = useState(noteData);
// const group = localStorage.getItem('group')
// const noteCardId = JSON.parse(localStorage.getItem('noteCardID'));
// const [updateGrades] = useUpdateGradesMutation();
// const [updateSecondEntry] = useUpdateSecondEntryMutation()
// const noteCardStatus = JSON.parse(localStorage.getItem('noteCardStatus'))

// const defaultColumns = [
//     {
//         title: 'Code',
//         dataIndex: 'code',
//         className: 'code',
//     },
//     {
//         title: 'Prenom',
//         dataIndex: 'prenom',
//         className: 'prenom',
//     },
//     {
//         title: 'Nom',
//         dataIndex: 'nom',
//         className: 'nom',
//     },
//     {
//         title: 'Partiel',
//         dataIndex: 'intra',
//         editable: true,
//         className: 'partiel',
//     },
//     {
//         title: 'Final',
//         dataIndex: 'examen',
//         editable: true,
//         className: 'final',
//     },
// ];

// const [editableColumns, setEditableColumns] = useState([]);
// const [editableIndex, setEditableIndex] = useState("")

// const toggleEditable = (dataIndex) => {

//     if (editableColumns.length === 1 && editableColumns.includes(dataIndex)) {
//         setEditableColumns([]);
//         setEditableIndex("");

//     } else if (!editableColumns.includes(dataIndex)) {
//         setEditableColumns([dataIndex]);
//         setEditableIndex(dataIndex)
//     }
// };

// const navigate = useNavigate();

// const openNotification = () => {
//     notification.success({
//         message: 'Sauvegarde réussie',
//         description: 'Les notes ont été sauvegardées avec succès.',
//     });
// };

// const handleSave = (row) => {
//     const newData = [...dataSource];
//     const index = newData.findIndex((item) => row.key === item.key);
//     const item = newData[index];
//     newData.splice(index, 1, {
//         ...item,
//         ...row,
//     });
//     setDataSource(newData);
//     localStorage.setItem('noteCardsTemp', JSON.stringify(newData));
// };

// const handleUpdate = () => {
//     if (localStorage.getItem('noteCardsTemp') != null) {
//         setEditableColumns([]);
//         // setEditableIndex("");
//         const gradeList = JSON.parse(localStorage.getItem('noteCardsTemp'))
//         const preparedData = []

//         if (editableIndex === 'intra') {
//             if (group.toLowerCase() === 'teacher') {
//                 if (localStorage.getItem("intra_first_entry_temp_id") != null) {
//                     const tempGradesId = JSON.parse(localStorage.getItem("intra_first_entry_temp_id"))
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
//                     updateGrades({ gradeList: grades, transcriptID: noteCardId.intra })
//                     localStorage.setItem('noteCards', JSON.stringify(dataSource))
//                     openNotification();
//                     navigate('../view');
//                     // Mettre à jour l'état de l'édition pour désactiver l'édition
//                 }
//             } else if (group.toLowerCase() === 'coordinator') {
//                 if (localStorage.getItem('intra_second_entry_temp_id')) {
//                     const idTable = JSON.parse(localStorage.getItem('intra_second_entry_temp_id'))
//                     for (let index = 0; index < gradeList.length; index++) {
//                         const element = gradeList[index];
//                         const tempGradeIndex = idTable.findIndex((item) =>
//                             item.student_level_id === element.student_level_id
//                         )

//                         if (idTable[tempGradeIndex] != undefined) {
//                             preparedData.push({
//                                 id: idTable[tempGradeIndex].second_entry_temp_id,
//                                 second_entry: element.intra,
//                             })
//                         }
//                     }
//                     const grades = { updates: preparedData }
//                     updateSecondEntry({ gradeList: grades, transcriptID: noteCardId.intra })
//                     localStorage.setItem('noteCards', JSON.stringify(dataSource))
//                     openNotification();
//                     navigate('../view');
//                 }
//             }
//         } else if (editableIndex === 'examen') {
//             if (group.toLowerCase() === 'teacher') {
//                 if (localStorage.getItem("examen_first_entry_temp_id") != null) {
//                     const tempGradesId = JSON.parse(localStorage.getItem("examen_first_entry_temp_id"))
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
//                     updateGrades({ gradeList: grades, transcriptID: noteCardId.examen })
//                     localStorage.setItem('noteCards', JSON.stringify(dataSource))
//                     openNotification();
//                     navigate('../view');
//                     // Mettre à jour l'état de l'édition pour désactiver l'édition
//                 }
//             } else if (group.toLowerCase() === 'coordinator') {
//                 if (localStorage.getItem('examen_second_entry_temp_id')) {
//                     const idTable = JSON.parse(localStorage.getItem('examen_second_entry_temp_id'))
//                     for (let index = 0; index < gradeList.length; index++) {
//                         const element = gradeList[index];
//                         const tempGradeIndex = idTable.findIndex((item) =>
//                             item.student_level_id === element.student_level_id
//                         )

//                         if (idTable[tempGradeIndex] != undefined) {
//                             preparedData.push({
//                                 id: idTable[tempGradeIndex].second_entry_temp_id,
//                                 second_entry: element.examen,
//                             })
//                         }
//                     }
//                     const grades = { updates: preparedData }
//                     updateSecondEntry({ gradeList: grades, transcriptID: noteCardId.examen })
//                     //faire le traitement du resultat de la requette
//                     localStorage.setItem('noteCards', JSON.stringify(dataSource))
//                     openNotification();
//                     navigate('../view');
//                 }
//             }

//         }
//     }
// };

// const components = {
//     body: {
//         row: EditableRow,
//         cell: EditableCell,
//     },
// };

//     const columns = defaultColumns.map((col) => {
// if (!col.editable) {
//     return col;
// }

// if (group.toLowerCase() === 'teacher') {
//     var intraMenu = (
//         <Menu>
//             {noteCardStatus.isIntraSubmitted || !noteCardStatus.isIntraSaved ?
//                 <Menu.Item key="edit" onClick={() => toggleEditable(col.dataIndex)} disabled>
//                     {editableIndex === col.dataIndex ? 'Annuler' : 'Modifier'}
//                 </Menu.Item>
//                 :
//                 <Menu.Item key="edit" onClick={() => toggleEditable(col.dataIndex)}>
//                     {editableIndex === col.dataIndex ? 'Annuler' : 'Modifier'}
//                 </Menu.Item>
//             }
//             {noteCardStatus.isIntraSubmitted || !noteCardStatus.isIntraSaved ?
//                 <Menu.Item key="save" onClick={handleUpdate} disabled>
//                     Sauvegarder
//                 </Menu.Item>
//                 :
//                 <Menu.Item key="save" onClick={handleUpdate}>
//                     Sauvegarder
//                 </Menu.Item>
//             }

//         </Menu>
//     )

//     var finaleMenu = (
//         <Menu>
//             {noteCardStatus.isFinaleSubmitted || !noteCardStatus.isFinaleSaved ?
//                 <Menu.Item key="edit" onClick={() => toggleEditable(col.dataIndex)} disabled>
//                     {editableIndex === col.dataIndex ? 'Annuler' : 'Modifier'}
//                 </Menu.Item>
//                 :
//                 <Menu.Item key="edit" onClick={() => toggleEditable(col.dataIndex)}>
//                     {editableIndex === col.dataIndex ? 'Annuler' : 'Modifier'}
//                 </Menu.Item>
//             }
//             {noteCardStatus.isFinaleSubmitted || !noteCardStatus.isFinaleSaved ?
//                 <Menu.Item key="save" onClick={handleUpdate} disabled>
//                     Sauvegarder
//                 </Menu.Item>
//                 :
//                 <Menu.Item key="save" onClick={handleUpdate}>
//                     Sauvegarder
//                 </Menu.Item>
//             }
//         </Menu>
//     )
// } else if (group.toLowerCase() === 'coordinator') {
//     var intraMenu = (
//         <Menu>
//             <Menu.Item key="edit" onClick={() => toggleEditable(col.dataIndex)}>
//                 {editableIndex === col.dataIndex ? 'Annuler' : 'Modifier'}
//             </Menu.Item>
//             <Menu.Item key="save" onClick={handleUpdate}>
//                 Sauvegarder
//             </Menu.Item>
//         </Menu>
//     )
//     var finaleMenu = (
//         <Menu>
//             <Menu.Item key="edit" onClick={() => toggleEditable(col.dataIndex)}>
//                 {editableIndex === col.dataIndex ? 'Annuler' : 'Modifier'}
//             </Menu.Item>
//             <Menu.Item key="save" onClick={handleUpdate}>
//                 Sauvegarder
//             </Menu.Item>
//         </Menu>
//     )
// }
//         if (col.dataIndex === 'intra') {
//             return {
//                 ...col,
//                 onCell: (record) => ({
//                     record,
//                     editable: editableColumns.includes(col.dataIndex),
//                     dataIndex: col.dataIndex,
//                     title: col.title,
//                     handleSave,
//                     className: 'custom-size-cell',
//                 }),
//                 title: (
//                     <div className="custom-column-header">
//                         {col.title}
//                         <Dropdown overlay={intraMenu} placement="bottomRight" trigger={['click']}>
//                             <Button size="small" icon={<EllipsisOutlined />} />
//                         </Dropdown>
//                     </div>
//                 ),
//             };
//         } else if (col.dataIndex === 'examen') {
//             return {
//                 ...col,
//                 onCell: (record) => ({
//                     record,
//                     editable: editableColumns.includes(col.dataIndex),
//                     dataIndex: col.dataIndex,
//                     title: col.title,
//                     handleSave,
//                     className: 'custom-size-cell',
//                 }),
//                 title: (
//                     <div className="custom-column-header">
//                         {col.title}
//                         <Dropdown overlay={finaleMenu} placement="bottomRight" trigger={['click']}>
//                             <Button size="small" icon={<EllipsisOutlined />} />
//                         </Dropdown>
//                     </div>
//                 ),
//             };
//         }

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


