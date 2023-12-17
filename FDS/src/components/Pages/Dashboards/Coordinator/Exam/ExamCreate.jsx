import React, { useState } from 'react'
import { Form, Select, Input, DatePicker, Button, notification, TimePicker } from 'antd';
import './Exam.scss'
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateExamMutation } from '../../../../../api/ApiEndpoints';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
//import moment from 'moment'

function ExamCreate(props) {
    const params = useParams()
    const navigate = useNavigate()
    const [createExam] = useCreateExamMutation()
    dayjs.extend(customParseFormat);
    const [time, setTime] = useState('')
    //const { Option } = Select;

    const openNotification = () => {
        notification.success({
            message: 'Création d\'examen réussie',
            description: 'L\'examen a été créé avec succès.',
        });
    };

    const openUnsuccessfulNotification = () => {
        notification.error({
            message: 'Création d\'examen échouée',
            description: 'La création de l\'examen a échoué.',
        });
    };
    const onFinish = (values) => {
        const { examDate } = values;
        const date = examDate.format('YYYY-MM-DD')
        const coeff = values.examType === '1' ? 0.4 : 0.6
        const name = values.examType === '1' ? 'Intra' : 'Finale'
        if (localStorage.getItem('classInfoTable')) {
            const courses = JSON.parse(localStorage.getItem('classInfoTable'))
            const index = courses.findIndex((course) =>
                course.id = params.classID
            )
            if (index != -1) {
                const data = {
                    exam: {
                        name: name,
                        code: '',
                        exam_coefficient: coeff,
                        exam_date: date,
                        start_time: time,
                        duration: Number(values.examDuration),
                        exam_classroom: values.examRoom,
                        description: values.description,
                        type: Number(values.examType),
                        course: params.classID,
                        level: params.levelID,
                        period: courses[index].period.id
                    }
                }

                console.log('data', data);
                const examCreationResult = createExam({ data }).unwrap()
                examCreationResult.then((result) => {
                    console.log(result);
                    openNotification()
                    navigate('../')
                }).catch((error) => {
                    console.log("there is an error", error);
                    openUnsuccessfulNotification()
                })
            }
        }


        // Ajoutez ici la logique pour soumettre les données du formulaire.
    }
    const handleChange = (time, timeString) => {
        //setTime(moment(timeString, 'HH:mm').format('HH:mm'))
        setTime(timeString)
    }
    const handleCancel = () => {
        navigate(-1)
    }
    return (
        <div className='exam-container'>
            <div className="exam-form">
                <h6>CREER UN EXAMEN</h6>
                <Form
                    name="examForm"
                    layout='vertical'
                    onFinish={onFinish}
                >
                    {/* Choix du type d'examen */}
                    <Form.Item
                        label="Type d'Examen"
                        name="examType"
                        rules={[{ required: true, message: 'Veuillez choisir le type de l\'examen!' }]}
                    >
                        <Select>
                            <Option value="1">Partiel</Option>
                            <Option value="2">Final</Option>
                            {/* <Option value="3">Rappel</Option> */}
                        </Select>
                    </Form.Item>

                    {/* Ajout de la durée en minutes */}
                    <Form.Item
                        label="Durée de l'Examen (en minutes)"
                        name="examDuration"
                        rules={[{ required: true, message: 'Veuillez entrer la durée de l\'examen!' }]}
                    >
                        <Input type="number" min="1" />
                    </Form.Item>

                    {/* Choix de la date de l'examen */}
                    <Form.Item
                        label="Date de l'Examen"
                        name="examDate"
                        rules={[{ required: true, message: 'Veuillez choisir la date de l\'examen!' }]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        label="Heure de debut"
                        name="examTime"
                        rules={[{ required: true, message: 'Veuillez choisir l\'heure de debut de l\'examen!' }]}
                    >
                        <TimePicker onChange={handleChange} initialValues={dayjs('00:00', 'HH:mm')} />
                    </Form.Item>

                    {/* Description*/}
                    <Form.Item
                        label="Description"
                        name="description"
                    >
                        <Input type='text' />
                    </Form.Item>
                    {/* Choix de la salle d'examen */}
                    <Form.Item
                        label="Salle d'Examen"
                        name="examRoom"
                        rules={[{ required: true, message: 'Veuillez choisir la salle d\'examen!' }]}
                    >
                        <Select>
                            <Option value="MPC1">Salle MPC1</Option>
                            <Option value="MPC2">Salle MPC2</Option>
                            <Option value="C25">Salle C25</Option>
                            <Option value="C26">Salle C26</Option>
                            <Option value="C27">Salle C27</Option>
                            <Option value="C31">Salle C31</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <div className='actions'>
                            <Button type="primary" style={{ margin: '0 40px 0 -5px' }} onClick={handleCancel}>
                                Annuler
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Creer
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default ExamCreate

