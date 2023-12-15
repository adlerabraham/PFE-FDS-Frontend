import { Button, Dropdown, Menu, Spin, Table } from 'antd'
import { EllipsisOutlined, DownOutlined, PlusOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './Exam.scss'
import { useGetExamQuery } from '../../../../../api/ApiEndpoints';

function ExamView(props) {
    const params = useParams()
    const navigate = useNavigate()
    var dataSource = []
    const columns = [
        {
            title: 'Nom',
            dataIndex: 'name'
        },
        {
            title: 'Date',
            dataIndex: 'date'
        },
        {
            title: 'Heure de début',
            dataIndex: 'time'
        },
        {
            title: 'Durée(min)',
            dataIndex: 'duration'
        },
        {
            title: 'Salle',
            dataIndex: 'room'
        },
    ]

    const navigateToCreate = () => {
        navigate('./create')
    }

    const navigateToUpdate = () => {
        navigate('./update')
    }
    var options = (
        <Menu>
            <Menu.Item key="create" onClick={navigateToCreate}>
                <PlusOutlined /> Créer
            </Menu.Item>
            <Menu.Item key="edit" onClick={navigateToUpdate}>
                <EditOutlined /> Modifier
            </Menu.Item>
        </Menu>
    )

    if (localStorage.getItem('classInfoTable')) {
        const courses = JSON.parse(localStorage.getItem('classInfoTable'))
        const index = courses.findIndex((course) =>
            course.id = params.classID
        )
        if (index != -1) {
            var periodID = courses[index].period.id
        }
    }
    const { data: exams, isError, isLoading } = useGetExamQuery({
        classID: params.classID,
        levelID: params.levelID, periodID
    })

    if (!(isLoading || isError)) {
        exams.map((exam) => (
            dataSource.push({
                name: exam.name,
                date: exam.exam_date,
                time: exam.start_time,
                duration: exam.duration,
                room: exam.exam_classroom
            })
        ))

        return (
            <div className='exam-container'>
                <Dropdown overlay={options}>
                    <Button className="custom-button">
                        <span className="custom-button-text">Options</span>
                        <EllipsisOutlined />
                    </Button>
                </Dropdown>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    bordered
                />
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className='spin'>
                <Spin tip='Chargement ...' size='large' />
            </div>
        )
    }

    if (isError) {
        return (
            <div>
                Erreur de chargement.
            </div>
        )
    }
}

export default ExamView

