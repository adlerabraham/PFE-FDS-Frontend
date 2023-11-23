// import React from 'react'
// import { NavLink, useOutletContext, Outlet } from 'react-router-dom'
// import './ClassParticipants.scss'

// function ClassParticipants() {
//     const [classID] = useOutletContext()


//     let classInfoTable = JSON.parse(localStorage.getItem('classTable'))

//     for (let index = 0; index < classInfoTable.length; index++) {
//         const course = classInfoTable[index];
//         if (course.id == classID) {
//             var levels = course.levels;
//             var periodID = course.period.id
//         }
//     }

//     return (
//         <div>
//             <div className="class-filters">
//                 {
//                     levels.map((level) => (
//                         <div className="level">
//                             <NavLink
//                                 key={level.id}
//                                 to={"/teacherDashboard/" + classID + "/teacherclass/classParticipants/" + level.id}>
//                                 {level.name}
//                             </NavLink>
//                         </div>
//                     ))
//                 }
//             </div>
//             <div>
//                 <Outlet context={[classID, periodID]} />
//             </div>

//         </div>
//     )
// }

// export default ClassParticipants







// import React, { useState } from 'react';
// import { NavLink, useOutletContext, Outlet } from 'react-router-dom';
// import './ClassParticipants.scss';


// function ClassParticipants() {
//     const [classID] = useOutletContext();
//     const [selectedLevel, setSelectedLevel] = useState(null);

//     let classInfoTable = JSON.parse(localStorage.getItem('classTable'));

//     for (let index = 0; index < classInfoTable.length; index++) {
//         const course = classInfoTable[index];
//         if (course.id == classID) {
//             var levels = course.levels;
//             var periodID = course.period.id;
//         }
//     }

//     const handleLevelChange = (event) => {
//         const selectedLevelId = event.target.value;
//         setSelectedLevel(selectedLevelId);
//     };

//     return (
//         <div>
//             <div className="class-filters">
//                 <label htmlFor="levelDropdown">Niveau: </label>
//                 <select id="levelDropdown" onChange={handleLevelChange} value={selectedLevel || ''}>
//                     <option value="" disabled>Selectionner un niveau</option>
//                     {levels.map((level) => (
//                         <option key={level.id} value={level.id}>
//                             {level.name}
//                         </option>
//                     ))}
//                 </select>

//                 {selectedLevel && (
//                     <NavLink to={`/teacherDashboard/${classID}/teacherclass/classParticipants/${selectedLevel}`}>
//                         Afficher la liste 
//                     </NavLink>
//                 )}
//             </div>
//             <div>
//                 <Outlet context={[classID, periodID, selectedLevel]} />
//             </div>
//         </div>
//     );
// }

// export default ClassParticipants;





// import React, { useState } from 'react';
// import { NavLink, useOutletContext, Outlet } from 'react-router-dom';
// import { UnorderedListOutlined, BookOutlined } from '@ant-design/icons';
// import './ClassParticipants.scss';

// function ClassParticipants() {
//     const [classID] = useOutletContext();
//     const [selectedLevel, setSelectedLevel] = useState(null);

//     let classInfoTable = JSON.parse(localStorage.getItem('classTable'));

//     for (let index = 0; index < classInfoTable.length; index++) {
//         const course = classInfoTable[index];
//         if (course.id == classID) {
//             var levels = course.levels;
//             var periodID = course.period.id;
//         }
//     }

//     const handleLevelChange = (event) => {
//         const selectedLevelId = event.target.value;
//         setSelectedLevel(selectedLevelId);
//     };

//     return (
//         <div>
//             <div className="class-filters">
//                 {/* <label htmlFor="levelDropdown">
//                     <BookOutlined /> Niveau:
//                 </label> */}
//                 <select id="levelDropdown" onChange={handleLevelChange} value={selectedLevel || ''}>
//                     <option value="" disabled>Selectionner un niveau</option>
//                     {levels.map((level) => (
//                         <option key={level.id} value={level.id}>
//                             {level.name}
//                         </option>
//                     ))}
//                 </select>

//                 {selectedLevel && (
//                     <NavLink to={`/teacherDashboard/${classID}/teacherclass/classParticipants/${selectedLevel}`}>
//                         <span className="custom-list-option">
//                            Afficher la liste
//                         </span>
//                     </NavLink>
//                 )}
//             </div>
//             <div>
//                 <Outlet context={[classID, periodID, selectedLevel]} />
//             </div>
//         </div>
//     );
// }

// export default ClassParticipants;



import React, { useState } from 'react';
import { NavLink, useOutletContext, Outlet } from 'react-router-dom';
import { UnorderedListOutlined, BookOutlined } from '@ant-design/icons';
import './ClassParticipants.scss';

function ClassParticipants() {
    const [classID] = useOutletContext();
    const [selectedLevel, setSelectedLevel] = useState(null);

    let classInfoTable = JSON.parse(localStorage.getItem('classTable'));

    for (let index = 0; index < classInfoTable.length; index++) {
        const course = classInfoTable[index];
        if (course.id == classID) {
            var levels = course.levels;
            var periodID = course.period.id;
        }
    }

    const handleLevelChange = (event) => {
        const selectedLevelId = event.target.value;
        setSelectedLevel(selectedLevelId);
    };

    return (
        <div>
            <div className="class-filters">
                <select id="levelDropdown" onChange={handleLevelChange} value={selectedLevel || ''} className="level-dropdown-class">
                    <option value="" disabled>Selectionner un niveau</option>
                    {levels.map((level) => (
                        <option key={level.id} value={level.id}>
                            {level.name}
                        </option>
                    ))}
                </select>

                {selectedLevel && (
                    <NavLink to={`/teacherDashboard/${classID}/teacherclass/classParticipants/${selectedLevel}`}>
                        <button className="custom-list-button">
                            Afficher la liste
                        </button>
                    </NavLink>
                )}
            </div>
            <div>
                <Outlet context={[classID, periodID, selectedLevel]} />
            </div>
        </div>
    );
}

export default ClassParticipants;


