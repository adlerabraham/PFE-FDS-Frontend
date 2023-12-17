import React from 'react'
import { useParams } from 'react-router-dom';
import { useGetExamQuery } from '../../../../api/ApiEndpoints';
import Event from '../../../Event/Event';

function CoordinatorFlux(props) {
    const params = useParams()
    const [classID] = params.classID
    if (localStorage.getItem('classInfoTable') != null) {
        var classes = JSON.parse(localStorage.getItem('classInfoTable'))
        var classIndex = classes.findIndex((item) =>
            item.id == classID
        )
        if (classIndex != -1) {
            var courseName = classes[classIndex].name
            var period = classes[classIndex].period.name
        }

    }

    const { data: events, isError, isLoading } = useGetExamQuery({
        classID,
        levelID: params.levelID, periodID: classes[classIndex].period.id
    })

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
                        <p>{period}</p>
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

export default CoordinatorFlux

