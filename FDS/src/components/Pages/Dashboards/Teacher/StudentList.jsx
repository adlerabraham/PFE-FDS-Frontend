import React from 'react'
import './StudentList.scss'
import { useOutletContext } from 'react-router-dom'
import { useGetSudentsQuery } from '../../../../api/ApiEndpoints'
import UserListTable from '../../../UserListeTable/UserListTable'

function StudentList() {
    let [classID] = useOutletContext()
    const classId = Number(classID)
    let periodID = 1
    let levelID = 1
    const studentList = []

    const { data: list, isError, isLoading, error } = useGetSudentsQuery({ classId, periodID, levelID })

    if (!isLoading) {
        if (!isError) {
            list.map((student) => (
                studentList.push({
                    key: student.id,
                    code: student.id,
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
            <div>
                Chargement ....
            </div>
        )
    }
}



export default StudentList

