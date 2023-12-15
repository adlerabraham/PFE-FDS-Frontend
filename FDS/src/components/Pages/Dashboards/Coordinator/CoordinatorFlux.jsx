import React from 'react'
import { useParams } from 'react-router-dom';

function CoordinatorFlux(props) {
    const params = useParams()
    const [classID] = params.classID
    if (localStorage.getItem('classInfoTable') != null) {
        const classes = JSON.parse(localStorage.getItem('classInfoTable'))
        var classIndex = classes.findIndex((item) =>
            item.id == classID
        )
        if (classIndex != -1) {
            var courseName = classes[classIndex].name
            var period = classes[classIndex].period.name
        }

    }

    return (
        <div className="flux-container">
            <div className="flux-header">
                {classIndex != -1 ?
                    <h1>{courseName}</h1>
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
                {/* Ajoutez ici le contenu spécifique à la page Flux */}
            </div>
        </div>
    );
}

export default CoordinatorFlux

