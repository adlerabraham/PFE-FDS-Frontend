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
    const [classID, courseName] = useOutletContext();
  

    return (
        <div className="flux-container">
            <div className="flux-header">
                <h1>Nom de la classe {courseName}</h1>
                <p>ID de la classe: {classID}</p>
            </div>
            <div className="flux-content">
                {/* Ajoutez ici le contenu spécifique à la page Flux */}
            </div>
        </div>
    );
}

export default FluxComponent;




