import React from 'react'
import './StudentList.scss'
import { useOutletContext, useParams } from 'react-router-dom'
import { useGetSudentsQuery } from '../../../../api/ApiEndpoints'
import UserListTable from '../../../UserListeTable/UserListTable'
import { Spin } from 'antd'

function StudentList() {
    let [classID, periodID] = useOutletContext()
    const params = useParams()
    const classId = Number(classID)
    let levelID = params.levelID
    const studentList = []

    const { data: list, isError, isLoading, error } = useGetSudentsQuery({ classId, periodID, levelID })

    if (!isLoading) {
        if (!isError) {
            list.map((student) => (
                studentList.push({
                    key: student.id,
                    code: student.student_code,
                    prenom: student.first_name,
                    nom: student.last_name,
                })
            ))
            return (
                <div className='student-list-container'>
                    <UserListTable data={studentList} />
                </div>
            )
        } else {
            console.log(error);
            return (
                <div>
                    Erreur de chargement.
                </div>
            )
        }

    } else {
        return (
            <div className='spin'>
                <Spin tip='Chargement ...' size='large' />
            </div>
        )
    }
}



export default StudentList

