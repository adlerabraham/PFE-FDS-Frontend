import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Form, Input, InputNumber, Menu, Popconfirm, Table, Typography, notification } from 'antd';
import { useNavigate, useParams } from 'react-router-dom'
import { useCancelSubmissionMutation, useUpdateSecondEntryMutation, useValidateTranscriptMutation } from '../../../../api/ApiEndpoints';
import './ValidateTranscript.scss'
import { EllipsisOutlined } from '@ant-design/icons';

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const ValidateTranscript = () => {
    const params = useParams()
    const [form] = Form.useForm();
    const [updateSecondEntry] = useUpdateSecondEntryMutation()
    const [cancelSubmission] = useCancelSubmissionMutation()
    const [validateTranscript] = useValidateTranscriptMutation()
    const navigate = useNavigate()
    const originData = []
    const noteData = JSON.parse(localStorage.getItem('noteCards'))
    const mismatchedID = JSON.parse(localStorage.getItem('mismatchedID'))

    for (let index = 0; index < noteData.length; index++) {
        const element = noteData[index];
        const mismatchedIndex = mismatchedID.findIndex((item) =>
            item.student_level_id == element.student_level_id
        )

        if (params.transcript === 'intra') {
            originData.push({
                key: index,
                code: element.code,
                prenom: element.prenom,
                nom: element.nom,
                saisie2: element.intra,
                student_level_id: element.student_level_id,
                isOdd: mismatchedIndex >= 0 ? true : false
            })
        } else if (params.transcript === 'finale') {
            originData.push({
                key: index,
                code: element.code,
                prenom: element.prenom,
                nom: element.nom,
                saisie2: element.examen,
                student_level_id: element.student_level_id,
                isOdd: mismatchedIndex >= 0 ? true : false
            })
        }
    }
    const [data, setData] = useState(originData);

    useEffect(() => {
        setData(originData)
    }, [originData])

    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            saisie2: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };


    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
                //localStorage.setItem('noteCards', JSON.stringify(newData))
                const noteDataIndex = noteData.findIndex((item) =>
                    item.student_level_id == newData[index].student_level_id
                )

                if (noteDataIndex > -1) {
                    const preparedData = []
                    if (localStorage.getItem('noteCardID')) {
                        const noteCardID = JSON.parse(localStorage.getItem('noteCardID'))
                        if (params.transcript == 'intra') {
                            noteData[noteDataIndex].intra = newData[index].saisie2
                            if (localStorage.getItem('intra_second_entry_temp_id')) {
                                const idTable = JSON.parse(localStorage.getItem('intra_second_entry_temp_id'))
                                for (let index = 0; index < noteData.length; index++) {
                                    const element = noteData[index];
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
                                updateSecondEntry({ gradeList: grades, transcriptID: noteCardID.intra })
                            }
                        } else if (params.transcript == 'finale') {
                            noteData[noteDataIndex].examen = newData[index].saisie2
                            if (localStorage.getItem('examen_second_entry_temp_id')) {
                                const idTable = JSON.parse(localStorage.getItem('examen_second_entry_temp_id'))
                                for (let index = 0; index < noteData.length; index++) {
                                    const element = noteData[index];
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
                                updateSecondEntry({ gradeList: grades, transcriptID: noteCardID.intra })
                            }
                        }
                        localStorage.setItem('noteCards', JSON.stringify(noteData))
                    }

                }
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Code',
            dataIndex: 'code',
            width: '15%',
            editable: false,
        },
        {
            title: 'Prénom',
            dataIndex: 'prenom',
            width: '25%',
            editable: false,
        },
        {
            title: 'Nom',
            dataIndex: 'nom',
            width: '25%',
            editable: false,
        },
        {
            title: 'Note',
            dataIndex: 'saisie2',
            width: '40%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                if (record.isOdd) {
                    const editable = isEditing(record);
                    return editable ? (
                        <span>
                            <Typography.Link
                                onClick={() => save(record.key)}
                                style={{
                                    marginRight: 2,
                                }}
                            >
                                Sauvegarder
                            </Typography.Link>
                            <Popconfirm title="Voulez vous annuler?" onConfirm={cancel}>
                                <a>Annuler</a>
                            </Popconfirm>
                        </span>
                    ) : (
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Editer
                        </Typography.Link>
                    );
                }
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: 'number',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const submissionSuccessfulyCanceldNotification = () => {
        notification.success({
            message: 'Soumission annulée',
            description: 'La soumission des notes a été annulée avec succès.',
        });
    }

    const openNotification = () => {
        notification.success({
            message: 'Validation réussie',
            description: 'Les notes ont été validées avec succès.',
        });
    };

    const openUnsuccessfulValidationNotification = () => {
        notification.error({
            message: 'Validation échoué',
            description: "La validation des notes a échoué.",
        });
    };

    const handleCancelSubmission = () => {
        if (localStorage.getItem('noteCardID')) {
            const noteCardID = JSON.parse(localStorage.getItem('noteCardID'))
            if (params.transcript === 'intra') {
                const cancelResult = cancelSubmission({ transcriptID: noteCardID.intra }).unwrap()
                cancelResult.then((result) => {
                    if (result.message) {
                        submissionSuccessfulyCanceldNotification()
                        navigate('../view')
                    }
                })
            } else if (params.transcript === 'finale') {
                const cancelResult = cancelSubmission({ transcriptID: noteCardID.examen }).unwrap()
                cancelResult.then((result) => {
                    if (result.message) {
                        submissionSuccessfulyCanceldNotification()
                        navigate('../view')
                    }
                })
            }
        }
    }

    const handleValidation = () => {
        if (localStorage.getItem('noteCardID')) {
            const noteCardID = JSON.parse(localStorage.getItem('noteCardID'))
            if (params.transcript === 'intra') {
                const validationResult = validateTranscript({ transcriptID: noteCardID.intra }).unwrap()
                validationResult.then((result) => {
                    if (result.message) {
                        openNotification()
                        navigate('../view')
                    } else {
                        openUnsuccessfulValidationNotification()
                        localStorage.setItem('mismatchedID', JSON.stringify(result))
                        navigate(`/coordinatorDashboard/${params.programId}/${params.levelID}/${params.classID}/transcriptList/noteCardTable/intra`)
                    }
                })
            } else if (params.transcript === 'finale') {
                const validationResult = validateTranscript({ transcriptID: noteCardID.intra }).unwrap()
                validationResult.then((result) => {
                    if (result.message) {
                        openNotification()
                        navigate('../view')
                    } else {
                        openUnsuccessfulValidationNotification()
                        localStorage.setItem('mismatchedID', JSON.stringify(result))
                        navigate(`/coordinatorDashboard/${params.programId}/${params.levelID}/${params.classID}/transcriptList/noteCardTable/finale`)
                    }
                })
            }
        }
    }
    var menu = (
        <Menu>
            <Menu.Item key="cancel" onClick={handleCancelSubmission}>
                Annuler la soummission
            </Menu.Item>
            <Menu.Item key="valider" onClick={handleValidation}>
                Valider le relevé
            </Menu.Item>
        </Menu>
    )
    return (
        <div>
            <Dropdown overlay={menu}>
                <Button className="custom-button">
                    <span className="custom-button-text">Options</span>
                    <EllipsisOutlined />
                </Button>
            </Dropdown>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                        pageSize: 40,
                    }}
                />
            </Form>
        </div>
    );
};

export default ValidateTranscript

