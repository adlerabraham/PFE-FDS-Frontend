import React from 'react'
import { useParams } from 'react-router-dom'
import './StudentFlux.scss'

function StudentFlux(props) {
    const params = useParams()
    if (localStorage.getItem('classTable') != null) {
        const classes = JSON.parse(localStorage.getItem('classTable'))
        var classIndex = classes.findIndex((item) =>
            item.id == params.classID
        )
        if (classIndex != -1)
            var courseName = classes[classIndex].course_name
    }

    return (
        <div className="flux-container">
            <div className="flux-header">
                {classIndex != -1 ?
                    <h1>{courseName}</h1>
                    :
                    <h1>Nom du cours</h1>
                }
                <p>ID de la classe: {params.classID}</p>
            </div>
            <div className="flux-content">
                {/* Ajoutez ici le contenu spécifique à la page Flux */}
            </div>
        </div>
    );
}

export default StudentFlux

