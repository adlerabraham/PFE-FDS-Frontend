import React from 'react'
import { NavLink, Outlet, useOutletContext } from 'react-router-dom'
import './TeacherClass.scss'
import { CalendarOutlined, SettingOutlined } from '@ant-design/icons'

function TeacherClass() {
    let [classID] = useOutletContext()
    return (
        <div>
            <div className="class-header">
                <div className="class-header-text">
                    <div className="text-option">
                        <NavLink to={"/teacherDashboard/" + classID + "/teacherclass/classParticipants"}>
                            Personnes
                        </NavLink>
                    </div>
                    <div className="text-option">
                        <NavLink to={"/teacherDashboard/" + classID + "/teacherclass/NoteCards"}>
                            Releve de notes
                        </NavLink>
                    </div>
                </div>
                <div className="class-header-icon">
                    <div className="icon-option">
                        <NavLink to="/teacherDashboard/calendar" className="center-icon-option">
                            <CalendarOutlined />
                        </NavLink>
                    </div>
                    <div className="icon-option">
                        <NavLink to="" className="center-icon-option">
                            <SettingOutlined />
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="class-body">
                <Outlet context={[classID]} />
            </div>
        </div >
    )
}

export default TeacherClass