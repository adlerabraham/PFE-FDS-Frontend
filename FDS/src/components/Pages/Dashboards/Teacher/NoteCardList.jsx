// import React, { useEffect } from 'react'
// import { Outlet, useNavigate, useOutletContext, useParams } from 'react-router-dom'
// import { useGetNoteCardListQuery, useGetSudentsQuery } from '../../../../api/ApiEndpoints'

// function NoteCardList() {
//     const [classID, periodID] = useOutletContext()
//     let params = useParams()
//     let classId = Number(classID)
//     let levelID = params.levelID
//     const link = "/teacherDashboard/" + classID + "/teacherclass/noteCards/" + levelID + "/noteCardListView"
//     const navigate = useNavigate()

//     const { data: noteCardList,
//         isLoading: isLoading1,
//         isError: isError1 } = useGetNoteCardListQuery({ classId, periodID, levelID })
//     const { data: studentList,
//         isLoading: isLoading2,
//         isError: isError2 } = useGetSudentsQuery({ classId, periodID, levelID })

//     useEffect(() => {
//         if (!(isLoading1 || isLoading2) && !(isError1 || isError2)) {
//             var noteData = []
//             studentList.map((student) => (
//                 noteData.push(
//                     {
//                         key: student.id,
//                         code: student.id,
//                         prenom: student.first_name,
//                         nom: student.last_name,
//                         pres: null,
//                         intra: null,
//                         devoir1: null,
//                         devoir2: null,
//                         examen: null,
//                     }
//                 )
//             ))
//         }

//         if (!(isLoading1 || isLoading2) && !(isError1 || isError2)) {
//             navigate(link)
//         }
//     }, [isError1, isError2, isLoading1, isLoading2, noteCardList, studentList])

//     if (isLoading1 || isLoading2) {
//         return (
//             <div>
//                 Chargement ....
//             </div>
//         )
//     } else if (isError1 || isError2) {
//         return (
//             <div>
//                 Erreur de chargement.
//             </div>
//         )
//     }
//     if (!(isLoading1 || isLoading2) && !(isError1 || isError2)) {
//         return (
//             <div>
//                 {/* <NoteCardListView noteData={noteData}
//                     noteCardList={noteCardList} /> */}
//                 <Outlet context={[classID, periodID, levelID, noteData, noteCardList]} />
//             </div>
//         )
//     }
// }

// export default NoteCardList

import React, { useEffect } from 'react'
import { Outlet, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { useGetNoteCardListQuery, useGetSudentsQuery } from '../../../../api/ApiEndpoints'
import './NoteCardList.scss'

function NoteCardList() {
    const [classID, periodID] = useOutletContext()
    let params = useParams()
    let classId = Number(classID)
    let levelID = params.levelID
    const link = "/teacherDashboard/" + classID + "/teacherclass/noteCards/" + levelID + "/noteCardTable"
    const navigate = useNavigate()

    const { data: noteCardList,
        isLoading: isLoading1,
        isError: isError1 } = useGetNoteCardListQuery({ classId, periodID, levelID })
    const { data: studentList,
        isLoading: isLoading2,
        isError: isError2 } = useGetSudentsQuery({ classId, periodID, levelID })
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
                {/* <NoteCardListView noteData={noteData}
                        noteCardList={noteCardList} /> */}
                <Outlet context={[classID, levelID, noteData, noteCardList]} />
            </div>
        )
    }


    if (isLoading1 || isLoading2) {
        return (
            <div>
                Chargement ....
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

export default NoteCardList


