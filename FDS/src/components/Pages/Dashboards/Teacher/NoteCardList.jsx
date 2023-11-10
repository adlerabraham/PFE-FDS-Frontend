import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useGetNoteCardListQuery, useGetSudentsQuery } from '../../../../api/ApiEndpoints'
import NoteCardTable from '../../../NoteCardTable/NoteCardTable'

function NoteCardList(props) {
    const [classID] = useOutletContext()
    let classId = Number(classID)
    let periodID = 1
    let levelID = 1

    const { data: noteCardList,
        isLoading: isLoading1,
        isError: isError1,
        error: error1 } = useGetNoteCardListQuery({ classId, periodID, levelID })
    const { data: studentList,
        isLoading: isLoading2,
        isError: isError2,
        error: error2 } = useGetSudentsQuery({ classId, periodID, levelID })
    if (!(isLoading1 || isLoading2)) {
        if (!(isError1 || isError2)) {

            const noteData = []

            studentList.map((student) => (
                noteData.push(
                    {
                        key: student.id,
                        code: student.id,
                        prenom: student.first_name,
                        nom: student.last_name,
                        '0': ''

                    }
                )
            ))
            const columns = [
                {
                    title: 'Code Etudiant',
                    dataIndex: 'code'
                },
                {
                    title: 'Prenom',
                    dataIndex: 'prenom'
                },
                {
                    title: 'Nom',
                    dataIndex: 'nom'
                },
            ];
            noteCardList.map((noteCard) => (
                columns.push({
                    title: noteCard.name,
                    dataIndex: noteCard.name.toLowerCase(),
                })
            ))

            // for (let index = 0; index < noteCardList.length; index++) {
            //     const noteCard = noteCardList[index];
            //     columns.push({
            //         title: noteCard.name,
            //         dataIndex: noteCard.name.toLowerCase(),
            //     })
            // }

            return (
                <div>
                    Liste des releves de notes<br />
                    <NoteCardTable />
                </div>
            )
        } else {
            if (isError1)
                console.log(error1);
            if (isError2)
                console.log(error2);
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

export default NoteCardList

