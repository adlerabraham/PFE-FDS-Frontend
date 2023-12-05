import React from 'react';
import { Space, Spin, Table, Tag } from 'antd';
import { useParams } from 'react-router-dom';
import { useGetGradesQuery } from '../../../../api/ApiEndpoints';
import './StudentsGrades.scss'

function StudentsGrades() {
    const params = useParams()
    const { data: grades, isError, isLoading } = useGetGradesQuery({ classId: params.classID })
    const gradeData = [
        {
            key: '0',
            intra: null,
            examen: null,
        }
    ]

    if (!(isError || isLoading)) {
        const columns = [
            {
                title: 'Partiel',
                dataIndex: 'intra',
            },
            {
                title: 'Finale',
                dataIndex: 'examen',
            }
        ];

        for (let index = 0; index < grades.length; index++) {
            const element = grades[index];
            if (element.transcript_name.toLowerCase() === 'intra') {
                gradeData[0].intra = element.first_entry
            } else if (element.transcript_name.toLowerCase() === 'finale') {
                gradeData[0].examen = element.first_entry
            }
        }

        const pagination = {
            hideOnSinglePage: true
        }
        return (
            <div>
                <Table
                    bordered
                    columns={columns}
                    dataSource={gradeData}
                    pagination={pagination} />
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

export default StudentsGrades

