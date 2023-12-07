import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetArchivedCoursesQuery, useGetCoursesQuery } from '../../../../api/ApiEndpoints'
import Class from '../../../Class/Class'
import { Spin } from 'antd'
import './LevelClassesHome.scss'
import NoCourses from '../../../Results/NoCourses'

function LevelClassesHome(props) {
    const params = useParams()
    var key = 0

    if (params.acaYearId != undefined) {
        var { data: courseList,
            isLoading,
            isError
        } = useGetArchivedCoursesQuery({
            programID: params.programId,
            levelID: params.levelID,
            acaYearId: params.acaYearId,
            periodId: params.periodId
        })
    } else {
        var { data: courseList,
            isLoading,
            isError } = useGetCoursesQuery({ programID: params.programId, levelID: params.levelID })
    }


    if (!(isLoading || isError)) {
        if (courseList.length > 0) {
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
        } else {
            return (
                <div style={{ paddingTop: 10 }}>
                    <NoCourses />
                </div>
            )
        }

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
                Erreur de chargement!
            </div>
        )
    }
}

export default LevelClassesHome

