import React from 'react'
import { useParams } from 'react-router-dom'
import './StudentFlux.scss'
import Event from '../../../Event/Event'
import { useGetExamQuery } from '../../../../api/ApiEndpoints'

function StudentFlux(props) {
    const params = useParams()
    if (localStorage.getItem('classTable') != null) {
        const classes = JSON.parse(localStorage.getItem('classTable'))
        var classIndex = classes.findIndex((item) =>
            item.id == params.classID
        )
        if (classIndex != -1) {
            var courseName = classes[classIndex].course_name
            var period = classes[classIndex].period_name
            var level = classes[classIndex].level
        }

    }

    const { data: events, isLoading, isError } = useGetExamQuery({ classID: params.classID, periodID: period.id, levelID: level })

    if (!(isLoading || isError)) {
        return (
            <div className="flux-container">
                <div className="flux-header">
                    {classIndex != -1 ?
                        <h1>{courseName.toUpperCase()}</h1>
                        :
                        <h1>Nom du cours</h1>
                    }
                    {classIndex != -1 ?
                        <p>{period.name}</p>
                        :
                        <p>periode</p>
                    }
                </div>
                <div className="flux-content">
                    {
                        events.map((event) =>
                            <Event
                                name={event.type_id}
                                date={event.exam_date}
                                time={event.start_time}
                                duration={event.duration}
                                room={event.exam_classroom}
                                publication={event.created_at}
                            />
                        )
                    }

                </div>
            </div>
        );
    }

}

export default StudentFlux

