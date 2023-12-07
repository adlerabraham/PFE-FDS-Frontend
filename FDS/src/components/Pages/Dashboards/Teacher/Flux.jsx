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
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import './Flux.scss'; // Assurez-vous de créer le fichier CSS correspondant

function FluxComponent() {
    const [classID] = useOutletContext();
    if (localStorage.getItem('classTable') != null) {
        const classes = JSON.parse(localStorage.getItem('classTable'))
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

export default FluxComponent;




