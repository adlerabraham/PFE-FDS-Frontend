import React, { useState } from 'react';
import { NavLink, Outlet, useOutletContext } from 'react-router-dom'
import './NoteCards.scss'
import { useGetNoteCardListQuery } from '../../../../api/ApiEndpoints'

function NoteCards() {
    const [classID] = useOutletContext()
    const [selectedLevel, setSelectedLevel] = useState(null);

    //retrouver les informations sur les classes
    let classInfoTable = localStorage.getItem('classTable') != null ?
        JSON.parse(localStorage.getItem('classTable')) : []

    for (let index = 0; index < classInfoTable.length; index++) {
        const course = classInfoTable[index];
        if (course.id == classID) {
            var levels = course.levels; //retouver les niveaux pour le cours demanader
            var periodID = course.period.id //retrouver la periode correspondante
        }
    }
    const handleLevelChange = (event) => {
        const selectedLevelId = event.target.value;
        setSelectedLevel(selectedLevelId);
    };
    return (
        <div>
            <div className='noteCard-filters'>
                <select id="levelDropdown" onChange={handleLevelChange} value={selectedLevel || ''}>
                    <option value="" disabled>Selectionner un niveau</option>
                    {
                    levels.map((level) => (
                        <option key={level.id} value={level.id}>
                            {level.name}
                        </option>
                    ))}
                </select>
                {selectedLevel && (
                    <NavLink to={`/teacherDashboard/${classID}/teacherclass/noteCards/${selectedLevel}`}>
                        <button className="custom-list-button">
                            Afficher le relevé
                        </button>
                    </NavLink>
                )}
            </div>
            <div>
                <Outlet context={[classID, periodID, selectedLevel]} />
            </div>
        </div>
    )
}

export default NoteCards






// import React, { useState } from 'react';
// import { NavLink, Outlet, useOutletContext } from 'react-router-dom';
// import './NoteCards.scss';
// import { useGetNoteCardListQuery } from '../../../../api/ApiEndpoints';

// function NoteCards() {
//     const [classID] = useOutletContext();
//     const [selectedLevel, setSelectedLevel] = useState(null);

//     // Retrouver les informations sur les classes
//     let classInfoTable = localStorage.getItem('classTable') != null ?
//         JSON.parse(localStorage.getItem('classTable')) : [];

//     for (let index = 0; index < classInfoTable.length; index++) {
//         const course = classInfoTable[index];
//         if (course.id == classID) {
//             var levels = course.levels; // Retrouver les niveaux pour le cours demandé
//             var periodID = course.period.id; // Retrouver la période correspondante
//         }
//     }

//     const handleLevelChange = (event) => {
//         const selectedLevelId = event.target.value;
//         setSelectedLevel(selectedLevelId);
//     };

//     return (
//         <div>
//             <div className='noteCard-filters'>
//                 <select id="levelDropdown" onChange={handleLevelChange} value={selectedLevel || ''}>
//                     <option value="" disabled>Selectionner un niveau</option>
//                     {
//                         levels.map((level) => (
//                             <option key={level.id} value={level.id}>
//                                 {level.name}
//                             </option>
//                         ))
//                     }
//                 </select>

//                 {selectedLevel && (
//                     <>
//                         <NavLink to={`/teacherDashboard/${classID}/teacherclass/noteCards/${selectedLevel}`}>
//                             <button className="custom-list-button">
//                                 Afficher le relevé
//                             </button>
//                         </NavLink>

//                         <NavLink to={`/teacherDashboard/${classID}/teacherclass/noteCard/${selectedLevel}/noteCardTable/create`}>
//                             <button className="custom-list-button">
//                                 Créer le relevé
//                             </button>
//                         </NavLink>

//                         <NavLink to={`/teacherDashboard/${classID}/teacherclass/noteCard/${selectedLevel}/noteCardTable/update`}>
//                             <button className="custom-list-button">
//                                 Modifier le relevé
//                             </button>
//                         </NavLink>
//                     </>
//                 )}
//             </div>
//             <div>
//                 <Outlet context={[classID, periodID, selectedLevel]} />
//             </div>
//         </div>
//     );
// }

// export default NoteCards;
