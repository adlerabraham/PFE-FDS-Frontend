import React from 'react';
import { useOutletContext } from 'react-router-dom';
import './Flux.scss'; // Assurez-vous de créer le fichier CSS correspondant
import Event from '../../../Event/Event';
import { useGetFluxExamQuery } from '../../../../api/ApiEndpoints';

function FluxComponent() {
    const [classID] = useOutletContext();
    if (localStorage.getItem('classTable') != null) {
        var classes = JSON.parse(localStorage.getItem('classTable'))
        var classIndex = classes.findIndex((item) =>
            item.id == classID
        )
        if (classIndex != -1) {
            var courseName = classes[classIndex].name
            var period = classes[classIndex].period.name
        }

    }

    const { data: events, isLoading, isError } = useGetFluxExamQuery({ classID, periodID: classes[classIndex].period.id })

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
                    {events.map((event) => (
                        <Event
                            name={event.type_id}
                            date={event.exam_date}
                            time={event.start_time}
                            duration={event.duration}
                            room={event.exam_classroom}
                            publication={event.created_at}
                        />
                    ))}

                </div>
            </div>
        );
    }
}

export default FluxComponent;

// // FluxComponent.jsx
// import React from 'react';
// import { useOutletContext } from 'react-router-dom';

// function FluxComponent() {
//     const [classID] = useOutletContext();
//   // Ajoutez le code pour gérer le contenu de l'onglet "flux"
//   return (
//     <div>
//       {/* Contenu de l'onglet "flux" */}
//       <h2>Flux pour la classe {classID}</h2>
//     </div>
//   );
// }

// export default FluxComponent;



// Flux.js





