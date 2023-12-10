import React, { useEffect } from 'react'
import { useGetStudentGradesQuery } from '../../../../api/ApiEndpoints'
import { Outlet, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { Spin } from 'antd'
import './NoteCardTable.scss'

function NoteCardTable(props) {
    const [classID, levelID, noteData, noteCardList] = useOutletContext()
    const params = useParams()
    const group = localStorage.getItem("group")
    if (group.toLowerCase() === 'teacher') {
        var link = "/teacherDashboard/" + classID + "/teacherclass/noteCards/" + levelID +
            "/noteCardTable/view"
    } else if (group.toLowerCase() === 'coordinator') {
        //var link = `/coordinatorDashboard/${params.programId}/${params.levelID}/${params.classID}/transcriptList/noteCardTable/view`
        var link = './view'
    }

    const navigate = useNavigate()
    var isRenderable = false
    var noteCardInfo = {
        intra: null,
        examen: null,
    }
    var intra_grade_id = []
    var examen_grade_id = []

    for (let index = 0; index < noteCardList.length; index++) {
        const noteCard = noteCardList[index];
        const examenID = noteCard.id
        switch (noteCard.name.toLowerCase()) {
            case 'intra':
                const { data: gradesI, isLoading: isLoadingI, isError: isErrorI } = useGetStudentGradesQuery({ examenID })
                if (!(isLoadingI || isErrorI)) {
                    noteCardInfo.intra = noteCard.id
                    for (let index = 0; index < noteData.length; index++) {
                        if (gradesI[index] != undefined) {
                            const grade = gradesI[index];
                            if (group.toLowerCase() === 'teacher') {
                                noteData[index].intra = grade.first_entry
                                intra_grade_id.push({
                                    student_level_id: grade.student_level_id,
                                    first_entry_temp_id: grade.id
                                })
                            } else if (group.toLowerCase() === 'coordinator') {
                                noteData[index].intra = grade.second_entry
                                intra_grade_id.push({
                                    student_level_id: grade.student_level_id,
                                    second_entry_temp_id: grade.id,
                                    grade_id: grade.grade_id
                                })
                            }

                        }
                    }
                    if (group.toLowerCase() === 'teacher') {
                        localStorage.setItem("intra_first_entry_temp_id", JSON.stringify(intra_grade_id))
                    } else if (group.toLowerCase() === 'coordinator') {
                        localStorage.setItem("intra_second_entry_temp_id", JSON.stringify(intra_grade_id))
                    }

                    var isIReady = true
                }
                if (!isErrorI) {
                    isRenderable = true
                } else {
                    isRenderable = false
                }
                break;
            case 'finale':
                const { data: gradesf, isLoading: isLoadingf, isError: isErrorf } = useGetStudentGradesQuery({ examenID })
                if (!(isLoadingf || isErrorf)) {
                    noteCardInfo.examen = noteCard.id
                    for (let index = 0; index < noteData.length; index++) {
                        if (gradesf[index] != undefined) {
                            const grade = gradesf[index];

                            if (group.toLowerCase() === 'teacher') {
                                noteData[index].examen = grade.first_entry
                                examen_grade_id.push({
                                    student_level_id: grade.student_level_id,
                                    first_entry_temp_id: grade.id
                                })
                            } else if (group.toLowerCase() === 'coordinator') {
                                noteData[index].examen = grade.second_entry
                                examen_grade_id.push({
                                    student_level_id: grade.student_level_id,
                                    second_entry_temp_id: grade.id,
                                    grade_id: grade.grade_id
                                })
                            }


                        }
                    }
                    if (group.toLowerCase() === 'teacher') {
                        localStorage.setItem("examen_first_entry_temp_id", JSON.stringify(examen_grade_id))
                    } else if (group.toLowerCase() === 'coordinator') {
                        localStorage.setItem("examen_second_entry_temp_id", JSON.stringify(examen_grade_id))
                    }
                    var isFReady = true
                }
                if (!isErrorf) {
                    isRenderable = true
                } else {
                    isRenderable = false
                }
                break;
            default:
                break;
        }

    }

    useEffect(() => {
        if (isIReady && isFReady && isRenderable) {
            localStorage.setItem('noteCardID', JSON.stringify(noteCardInfo))
            localStorage.setItem('noteCards', JSON.stringify(noteData))
            navigate(link)
        }
    }, [isIReady, isFReady, isRenderable])

    if (isIReady && isFReady && isRenderable) {
        return (
            <div>
                <Outlet context={[classID, levelID, group]} />
            </div>
        )
    }

    if (!(isIReady || isFReady) && !isRenderable) {
        return (
            <div className='spin'>
                <Spin tip='Chargement ...' size='large' />
            </div>
        )
    } else if (!isRenderable) {
        return (
            <div>
                Erreur de chargement.
            </div>
        )
    }

}

export default NoteCardTable