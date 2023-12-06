import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useOutletContext, useParams } from 'react-router-dom';
import '../Teacher/TeacherClass.scss';
import { UserOutlined, FileTextOutlined, BellOutlined } from '@ant-design/icons';

function StudentClass(props) {
    const params = useParams()
    let classID = params.classID

    const [clickedTab, setClickedTab] = useState(null);

    const handleTabClick = (tab) => {
        setClickedTab(tab === clickedTab ? null : tab);
    };


    // Effet de montage pour définir l'onglet actif lors de la première visite
    useEffect(() => {
        if (window.location.pathname === "/studentDashboard/" + params.classID + "/studentClass") {
            // Si l'URL se termine par "/teacherclass", alors c'est "flux"
            setClickedTab('flux');
        }
    }, [classID]);

    return (
        <div>
            <div className="class-header">
                <div className="class-header-text">
                    <NavLink
                        to={"/studentdashboard/" + params.classID + "/studentClass"}
                        className={`text-option ${clickedTab === 'flux' ? 'clicked' : ''}`}
                        onClick={() => handleTabClick('flux')}
                    >
                        <BellOutlined /> Flux
                    </NavLink>
                    {/* <NavLink
                        to={"/teacherDashboard/" + classID + "/teacherclass/classParticipants"}
                        className={`text-option ${clickedTab === 'participants' ? 'clicked' : ''}`}
                        onClick={() => handleTabClick('participants')}
                    >
                        <UserOutlined /> Personnes
                    </NavLink> */}
                    <NavLink
                        to={"/studentdashboard/" + classID + "/studentClass/studentGrades"}
                        className={`text-option ${clickedTab === 'noteCards' ? 'clicked' : ''}`}
                        onClick={() => handleTabClick('noteCards')}
                    >
                        <FileTextOutlined /> Notes
                    </NavLink>
                </div>
                <div className="class-header-icon"></div>
            </div>
            <div className="class-body">
                <Outlet />
            </div>
        </div>
    );
}

export default StudentClass

