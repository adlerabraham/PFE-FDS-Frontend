// import React from 'react'
// import { NavLink, Outlet, useOutletContext } from 'react-router-dom'
// import './TeacherClass.scss'
// import { CalendarOutlined, SettingOutlined } from '@ant-design/icons'

// function TeacherClass() {
//     let [classID] = useOutletContext()
//     return (
//         <div>
//             <div className="class-header">
//                 <div className="class-header-text">
//                     <div className="text-option">
//                         <NavLink to={"/teacherDashboard/" + classID + "/teacherclass/classParticipants"}>
//                             Personnes
//                         </NavLink>
//                     </div>
//                     <div className="text-option">
//                         <NavLink to={"/teacherDashboard/" + classID + "/teacherclass/NoteCards"}>
//                             Releve de notes
//                         </NavLink>
//                     </div>
//                 </div>
//                 <div className="class-header-icon">
//                     {/* <div className="icon-option">
//                         <NavLink to="/teacherDashboard/calendar" className="center-icon-option">
//                             <CalendarOutlined />
//                         </NavLink>
//                     </div> */}
//                     {/* <div className="icon-option">
//                         <NavLink to="" className="center-icon-option">
//                             <SettingOutlined />
//                         </NavLink>
//                     </div> */}
//                 </div>
//             </div>
//             <div className="class-body">
//                 <Outlet context={[classID]} />
//             </div>
//         </div >
//     )
// }

// export default TeacherClass



// import React from 'react';
// import { NavLink, Outlet, useOutletContext } from 'react-router-dom';
// import './TeacherClass.scss';
// import {UserOutlined, FileTextOutlined } from '@ant-design/icons';

// function TeacherClass() {
//     let [classID] = useOutletContext();

//     return (
//         <div>
//             <div className="class-header">
//                 <div className="class-header-text">
//                     <div className="text-option">
//                         <NavLink to={"/teacherDashboard/" + classID + "/teacherclass/classParticipants"}>
//                             <UserOutlined /> Personnes
//                         </NavLink>
//                     </div>
//                     <div className="text-option">
//                         <NavLink to={"/teacherDashboard/" + classID + "/teacherclass/NoteCards"}>
//                             <FileTextOutlined /> Relevé
//                         </NavLink>
//                     </div>
//                 </div>
//                 <div className="class-header-icon">
//                 </div>
//             </div>
//             <div className="class-body">
//                 <Outlet context={[classID]} />
//             </div>
//         </div>
//     );
// }

// export default TeacherClass;




// import React, { useState } from 'react';
// import { NavLink, Outlet, useOutletContext } from 'react-router-dom';
// import './TeacherClass.scss';
// import { UserOutlined, FileTextOutlined, BellOutlined } from '@ant-design/icons';

// function TeacherClass() {
//     let [classID, courseName] = useOutletContext();

//     const [activeTab, setActiveTab] = useState('participants'); // État local pour suivre l'onglet actif

//     return (
//         <div>
//             <div className="class-header">
//                 <div className="class-header-text">
//                     <div className={`text-option ${activeTab === 'flux' ? 'active' : ''}`}>
//                         <NavLink
//                             to={"/teacherDashboard/" + classID + "/teacherclass"}
//                             onClick={() => setActiveTab('flux')}
//                         >
//                             <BellOutlined /> Flux
//                         </NavLink>
//                     </div>
//                     <div className={`text-option ${activeTab === 'participants' ? 'active' : ''}`}>
//                         <NavLink
//                             to={"/teacherDashboard/" + classID + "/teacherclass/classParticipants"}
//                             onClick={() => setActiveTab('participants')}
//                         >
//                             <UserOutlined /> Personnes
//                         </NavLink>
//                     </div>
//                     <div className={`text-option ${activeTab === 'noteCards' ? 'active' : ''}`}>
//                         <NavLink
//                             to={"/teacherDashboard/" + classID + "/teacherclass/NoteCards"}
//                             onClick={() => setActiveTab('noteCards')}
//                         >
//                             <FileTextOutlined /> Relevé
//                         </NavLink>
//                     </div>
//                 </div>
//                 <div className="class-header-icon"></div>
//             </div>
//             <div className="class-body">
//                 <Outlet context={[classID, courseName]} />
//             </div>
//         </div>
//     );
// }

// export default TeacherClass;






// import React, { useState, useEffect } from 'react';
// import { NavLink, Outlet, useOutletContext, useLocation, Link } from 'react-router-dom';
// import './TeacherClass.scss';
// import { UserOutlined, FileTextOutlined, BellOutlined } from '@ant-design/icons';

// function TeacherClass() {
//     let [classID, courseName] = useOutletContext();
//     const location = useLocation();

//     //État local pour suivre l'onglet actif
//     const [activeTab, setActiveTab] = useState('participants');

//     //Mettre à jour l'onglet actif lorsque l'emplacement change
//     useEffect(() => {
//         const path = location.pathname;
//         let newActiveTab = '';

//         // Si l'URL se termine par "/teacherclass", alors c'est "flux"
//         if (path === "/teacherDashboard/" + classID + "/teacherclass") {
//             newActiveTab = 'flux';
//         } else {
//             // Sinon, extraire l'onglet de l'URL et le mettre à jour
//             newActiveTab = path.split('/').pop();
//         }

//         // Mettre à jour l'état avec la dernière valeur
//         setActiveTab(newActiveTab);

//         // Ajouter cette ligne pour déboguer avec la dernière valeur de l'état
//         console.log('Active Tab:', newActiveTab);
//     }, [location]);

//     return (
//         <div>
//             <div className="class-header">
//                 <div className="class-header-text">
//                     <div className="text-option" style={{ color: activeTab === 'flux' ? 'red' : 'black', backgroundColor: activeTab === 'flux' ? 'orange' : 'white' }}>
//                         <NavLink
//                             to={"/teacherDashboard/" + classID + "/teacherclass"}
//                             onClick={() => setActiveTab('flux')}
//                             //style={{ backgroundColor: 'red', color: 'blue' }} // Ajoutez cette lign
//                         >
//                             <BellOutlined /> Flux
//                         </NavLink>
//                     </div>
//                     <div className="text-option" style={{ color: activeTab === 'participants' ? 'red' : 'black', backgroundColor: activeTab === 'participants' ? 'orange' : 'white' }}>
//                         <NavLink
//                             to={"/teacherDashboard/" + classID + "/teacherclass/classParticipants"}
//                             onClick={() => setActiveTab('participants')}
//                         >
//                             <UserOutlined /> Personnes
//                         </NavLink>
//                     </div>
//                     <div className="text-option" style={{ color: activeTab === 'noteCards' ? 'red' : 'black', backgroundColor: activeTab === 'noteCards' ? 'orange' : 'white' }}>
//                         <NavLink
//                             to={"/teacherDashboard/" + classID + "/teacherclass/NoteCards"}
//                             onClick={() => setActiveTab('noteCards')}
//                         >
//                             <FileTextOutlined /> Relevé
//                         </NavLink>
//                     </div>
//                 </div>
//                 <div className="class-header-icon"></div>
//             </div>
//             <div className="class-body">
//                 <Outlet context={[classID, courseName]} />
//             </div>
//         </div>
//     );
// }

// export default TeacherClass;




import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useOutletContext, useParams } from 'react-router-dom';
import './TeacherClass.scss';
import { UserOutlined, FileTextOutlined, BellOutlined } from '@ant-design/icons';

function TeacherClass() {
    const params = useParams()
    let classID = params.classID

    const [clickedTab, setClickedTab] = useState(null);

    const handleTabClick = (tab) => {
        setClickedTab(tab === clickedTab ? null : tab);
    };


    // Effet de montage pour définir l'onglet actif lors de la première visite
    useEffect(() => {
        if (window.location.pathname === "/teacherDashboard/" + classID + "/teacherclass") {
            // Si l'URL se termine par "/teacherclass", alors c'est "flux"
            setClickedTab('flux');
        }
    }, [classID]);

    return (
        <div>
            <div className="class-header">
                <div className="class-header-text">
                    <NavLink
                        to={"/teacherDashboard/" + classID + "/teacherclass"}
                        className={`text-option ${clickedTab === 'flux' ? 'clicked' : ''}`}
                        onClick={() => handleTabClick('flux')}
                    >
                        <BellOutlined /> Flux
                    </NavLink>
                    <NavLink
                        to={"/teacherDashboard/" + classID + "/teacherclass/classParticipants"}
                        className={`text-option ${clickedTab === 'participants' ? 'clicked' : ''}`}
                        onClick={() => handleTabClick('participants')}
                    >
                        <UserOutlined /> Personnes
                    </NavLink>
                    <NavLink
                        to={"/teacherDashboard/" + classID + "/teacherclass/NoteCards"}
                        className={`text-option ${clickedTab === 'noteCards' ? 'clicked' : ''}`}
                        onClick={() => handleTabClick('noteCards')}
                    >
                        <FileTextOutlined /> Relevé
                    </NavLink>
                </div>
                <div className="class-header-icon"></div>
            </div>
            <div className="class-body">
                <Outlet context={[classID]} />
            </div>
        </div>
    );
}

export default TeacherClass;

