import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Table, Menu, Dropdown, notification } from 'antd';
import './NoteCardTable.scss';
import { useUpdateGradesMutation } from '../../api/ApiEndpoints';
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
            console.log('Save failed:', errInfo);
        }
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
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
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
    return <td {...restProps}>{childNode}</td>;
};

const NoteCardTableEdit = (props) => {
    const noteData = JSON.parse(localStorage.getItem('noteCards'));
    const [dataSource, setDataSource] = useState(noteData);
    const noteCardId = JSON.parse(localStorage.getItem('noteCardID'));
    const [updateGrades] = useUpdateGradesMutation();

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
        localStorage.setItem('noteCards', JSON.stringify(newData));
    };

    const handleUpdate = () => {
        if (localStorage.getItem('noteCards') != null) {
            setEditableColumns([]);
            // setEditableIndex("");
            const gradeList = JSON.parse(localStorage.getItem('noteCards'))
            const preparedData = []
            console.log("tempgrades");
            console.log(editableIndex);

            if (editableIndex === 'intra') {
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
                    // Mettre à jour l'état de l'édition pour désactiver l'édition
                }
            } else if (editableIndex === 'examen') {
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
                    // Mettre à jour l'état de l'édition pour désactiver l'édition
                }
            }


        }
        openNotification();
        navigate('../view');
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

        const menu = (
            <Menu>
                <Menu.Item key="edit" onClick={() => toggleEditable(col.dataIndex)}>
                    {editableIndex === col.dataIndex ? 'Annuler' : 'Modifier'}
                </Menu.Item>
                <Menu.Item key="save" onClick={handleUpdate}>
                    Sauvegarder
                </Menu.Item>
            </Menu>
        );

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
                    <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
                        <Button size="small" icon={<EllipsisOutlined />} />
                    </Dropdown>
                </div>
            ),
        };
    });

    return (
        <div>
            {/* <div onClick={handleUpdate} className="save-container">
            <SaveOutlined className="save-icon" />
            <span>Sauvegarder</span>
            </div> */}
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
            />
        </div>
    );
};

export default NoteCardTableEdit;






