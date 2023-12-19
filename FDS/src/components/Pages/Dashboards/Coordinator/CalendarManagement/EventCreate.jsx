import React, { useState } from 'react'
import { Form, Select, Input, DatePicker, Button, notification, TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useCreateEventsMutation } from '../../../../../api/ApiEndpoints';

function EventCreate(props) {
    dayjs.extend(customParseFormat);
    const [baseEvent, setBaseEvent] = useState({})
    const [rules, setRules] = useState([])
    const [createEvent] = useCreateEventsMutation()
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')

    const openNotification = () => {
        notification.success({
            message: 'Création d\'événement réussie',
            description: 'L\'événement a été créé avec succès.',
        });
    };

    const openUnsuccessfulNotification = () => {
        notification.error({
            message: 'Création d\'événement échouée',
            description: 'La création de l\'événement a échoué.',
        });
    };

    const handleEvent = (values) => {
        const event = {
            title: values.nom,
            event_type: values.eventType,
            description: values.description

        }
        setBaseEvent(event)
        console.log(baseEvent);
    }

    const onFinish = (values) => {
        const { startDate, endDate } = values;
        const startdate = startDate.format('YYYY-MM-DD')
        const enddate = endDate.format('YYYY-MM-DD')
        console.log(startdate, enddate);
        var tempRules = rules
        tempRules.push({
            start_datetime: startdate,
            end_datetime: enddate,
            day_of_week: values.weekDay,
            start_time: startTime,
            end_time: endTime,
            note: " "
        })

        setRules(tempRules)
        const data = {
            event: baseEvent,
            rules: rules
        }
        console.log(data);
        const examCreationResult = createEvent({ data }).unwrap()
        examCreationResult.then((result) => {
            console.log(result);
            openNotification()

        }).catch((error) => {
            console.log("there is an error", error);
            openUnsuccessfulNotification()
        })
    }



    const handleSartTimeChange = (time, timeString) => {
        //setTime(moment(timeString, 'HH:mm').format('HH:mm'))
        setStartTime(timeString)
    }
    const handleEndTimeChange = (time, timeString) => {
        //setTime(moment(timeString, 'HH:mm').format('HH:mm'))
        setEndTime(timeString)
    }

    const handleCancel = () => {
        navigate(-1)
    }

    const addRule = () => {

    }
    return (
        <div className='exam-container'>
            <div className="exam-form">
                <h6>CREER UN EVENEMENT</h6>
                <Form
                    name="eventForm"
                    layout='vertical'
                    onFinish={handleEvent}
                >
                    {/* Choix du type d'examen */}
                    <Form.Item
                        label="Type d'événement"
                        name="eventType"
                        rules={[{ required: true, message: 'Veuillez choisir le type de l\'événement!' }]}
                    >
                        <Select>
                            <Option value="JOURS DE COURS">Jours de cours</Option>
                            <Option value="JOURS DE CONGE">Jours de conge</Option>
                            <Option value="PREPARATION">Preparation</Option>
                            <Option value="EXAMENS">Examens</Option>
                            <Option value="EXAMENS DE RAPPEL">Examen de rappel</Option>
                            <Option value="RESULTATS">Resultats</Option>
                            <Option value="CONCOURS D'ADMISSION">Concours d'admission</Option>
                            <Option value="PROCHAINE ANNEE">Prochaine annee</Option>
                            {/* <Option value="3">Rappel</Option> */}
                        </Select>
                    </Form.Item>

                    {/* Title */}
                    <Form.Item
                        label="Nom de l'événement"
                        name="nom"
                        rules={[{ required: true, message: 'Veuillez entrer le nom de l\'événement!' }]}
                    >
                        <Input type='text' />
                    </Form.Item>
                    {/* Description*/}
                    <Form.Item
                        label="Description"
                        name="description"
                    >
                        <Input type='text' />
                    </Form.Item>

                    <Form.Item>
                        <div className='actions'>
                            <Button type="primary" style={{ margin: '0 40px 0 -5px' }} onClick={handleCancel}>
                                Annuler
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Creer événement
                            </Button>
                        </div>
                    </Form.Item>

                </Form>

                <Button type='primary' onClick={addRule}>
                    Ajouter une règle
                </Button>
                {/* Rules */}
                <Form
                    name="eventForm"
                    layout='vertical'
                    onFinish={onFinish}
                >
                    {/* Choix de les dates*/}
                    <Form.Item
                        label="Date de début"
                        name="startDate"
                        rules={[{ required: true, message: 'Veuillez choisir la date de début de l\'examen!' }]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        label="Date de fin"
                        name="endDate"
                        rules={[{ required: true, message: 'Veuillez choisir la date de fin de l\'examen!' }]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        label="Heure de début"
                        name="startTime"
                        rules={[{ required: true, message: 'Veuillez choisir l\'heure de debut de l\'événement!' }]}
                    >
                        <TimePicker onChange={handleSartTimeChange} initialValues={dayjs('00:00', 'HH:mm')} />
                    </Form.Item>
                    <Form.Item
                        label="Heure de fin"
                        name="endTime"
                        rules={[{ required: true, message: 'Veuillez choisir l\'heure de fin de l\'événement!' }]}
                    >
                        <TimePicker onChange={handleEndTimeChange} initialValues={dayjs('00:00', 'HH:mm')} />
                    </Form.Item>


                    {/* Jour dela semaine */}
                    <Form.Item
                        label="Jour de la semaine"
                        name="weekDay"
                        rules={[{ required: true, message: 'Veuillez choisir le jour!' }]}
                    >
                        <Select>
                            <Option value="MONDAY">Lundi</Option>
                            <Option value="TUESDAY">Mardi</Option>
                            <Option value="WEDNESDAY">Mercredi</Option>
                            <Option value="THURSDAY">Jeudi</Option>
                            <Option value="FRIDAY">Vendredi</Option>
                            <Option value="SATURDAY">Samedi</Option>
                            <Option value="SUNDAY">Dimanche</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <div className='actions'>
                            <Button type="primary" style={{ margin: '0 40px 0 -5px' }}
                            // onClick={handleCancel}
                            >
                                Annuler
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Creer regle
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default EventCreate

