import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetCoursesQuery } from '../../../../api/ApiEndpoints'
import Class from '../../../Class/Class'

function LevelClassesHome(props) {
    const params = useParams()
    var key = 0

    const { data: courseList,
        isLoading,
        isError } = useGetCoursesQuery({ programID: params.programId, levelID: params.levelID })

    if (!(isLoading || isError)) {
        localStorage.setItem("classInfoTable", JSON.stringify(courseList))
        const createKey = () => {
            return key++
        }
        return (
            <div>
                {courseList.map((course) => (
                    <Class key={createKey()}
                        courseID={course.id}
                        courseName={course.name}
                        teacher={course.teacher_info.user_info}
                        period={course.period}
                        group={'1'}
                        coordinator={'1'}
                        programID={params.programId}
                        level={params.levelID} />
                ))}
                <div></div>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div>
                Chargement ...
            </div>
        )
    }
    if (isError) {
        return (
            <div>
                Erreur de chargement!
            </div>
        )
    }
}

export default LevelClassesHome

