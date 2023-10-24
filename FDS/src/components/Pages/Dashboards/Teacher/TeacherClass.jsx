import { NavLink, Outlet } from 'react-router-dom'
import './TeacherClass.scss'
import { CalendarOutlined } from '@ant-design/icons'

function TeacherClass() {
    return (
        <div>
            <div className="class-header">
                <div className="class-header-text">
                    <div className="text-option">
                        <NavLink to="">Niveaux</NavLink>
                    </div>
                    <div className="text-option">
                        <NavLink to="/teacherDashboard/teacherclass/classParticipants">
                            Personnes
                        </NavLink>
                    </div>
                    <div className="text-option">
                        <NavLink to="/teacherDashboard/teacherclass/NoteCards">Releve de notes</NavLink>
                    </div>
                </div>
                <div className="class-header-icon">
                    <div className="icon-option">
                        <NavLink to="/teacherDashboard/calendar" className="center-icon-option">
                            <CalendarOutlined />
                        </NavLink>
                    </div>
                    <div className="icon-option">
                        <NavLink to="" className="center-icon-option">IC2</NavLink>
                    </div>
                </div>
            </div>
            <div className="class-body">
                <Outlet />
            </div>
        </div>
    )
}

export default TeacherClass