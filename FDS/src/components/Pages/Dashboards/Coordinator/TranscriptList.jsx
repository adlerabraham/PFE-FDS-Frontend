import React, { useEffect } from 'react'
import { Outlet, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { useGetNoteCardListQuery, useGetSudentsQuery } from '../../../../api/ApiEndpoints'
import { Spin } from 'antd'
import './CoordinatorDashboard.scss'

function TranscriptList(props) {
    let params = useParams()
    let classID = params.classID
    let levelID = params.levelID
    const link = `/coordinatorDashboard/${params.programId}/${params.levelID}/${params.classID}/transcriptList/noteCardTable`
    const navigate = useNavigate()
    const classes = JSON.parse(localStorage.getItem("classInfoTable"))

    const classIndex = classes.findIndex((item) =>
        item.id == params.classID
    )
    let periodID = classes[classIndex].period.id


    const { data: noteCardList,
        isLoading: isLoading1,
        isError: isError1 } = useGetNoteCardListQuery({ classId: classID, periodID, levelID })
    const { data: studentList,
        isLoading: isLoading2,
        isError: isError2 } = useGetSudentsQuery({ classId: classID, periodID, levelID })
    useEffect(() => {
        if (!(isLoading1 || isLoading2) && !(isError1 || isError2)) {
            navigate(link)
        }
    }, [isError1, isError2, isLoading1, isLoading2, noteCardList, studentList])


    if (!(isLoading1 || isLoading2) && !(isError1 || isError2)) {
        var noteData = []
        studentList.map((student) => (
            noteData.push(
                {
                    key: student.id,
                    code: student.id,
                    prenom: student.first_name,
                    nom: student.last_name,
                    intra: null,
                    examen: null,
                    student_level_id: student.student_level_id
                }
            )
        ))

        return (
            <div>
                <Outlet context={[classID, levelID, noteData, noteCardList]} />
            </div>
        )
    }


    if (isLoading1 || isLoading2) {
        return (
            <div className='spin'>
                <Spin tip='Chargement ...' size='large' />
            </div>
        )
    } else if (isError1 || isError2) {
        return (
            <div>
                Erreur de chargement.
            </div>
        )
    }
}


export default TranscriptList

