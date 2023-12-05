import react, { useState } from 'react';
import '../Dashboard.scss';
import '../../../Navigation/Navigation.scss'
import 'antd/dist/antd.css'
import { Button } from 'antd';
import { BookOutlined, CalendarOutlined, HomeOutlined, FileTextOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../../features/auth/authSlice';
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import Footer from '../../../Footer/Footer.jsx';
import NavBotton from '../../../Navigation/NavBotton';
import SidebarClass from '../../../Class/SidebarClass.jsx';
import TeacherDashboardBar from '../Teacher/TeacherDashboardBar.jsx';
import Header from '../../../Header/Header.jsx';

function StudentDashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>
            <Header />
            <TeacherDashboardBar onToggleSidebar={toggleSidebar} />
            <div className={`background ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
                <div className={`sidebar-container ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
                    {/* Sidebar Content */}
                    <div className="nav-top">
                        <div className='nav-box'>
                            <div className='nav-option'>
                                <HomeOutlined className='nav-icon' />
                                {isSidebarOpen && <NavLink to="/studentDashboard" className='nav-link'>Accueil</NavLink>}
                            </div>
                            <div className='nav-option'>
                                <CalendarOutlined className='nav-icon' />
                                {isSidebarOpen && <NavLink to="/studentDashboard/calendar" className='nav-link'>Calendrier</NavLink>}
                            </div>
                        </div>
                    </div>
                    <div className="nav-middle">
                        <div className='nav-box'>
                            <div className="nav-option">
                                <BookOutlined className='nav-icon' />
                                {isSidebarOpen && <NavLink to="/studentDashboard" className='nav-link'>Cours suivies</NavLink>}
                            </div>
                            {isSidebarOpen && (
                                <div>
                                    <SidebarClass isSidebarOpen={isSidebarOpen} />
                                </div>
                            )}
                        </div>
                        <div className="nav-option">
                            <CheckSquareOutlined className='nav-icon' />
                            {isSidebarOpen && <NavLink to='' className='nav-link'>À faire</NavLink>}
                        </div>
                        <div className="nav-option">
                            <FileTextOutlined className='nav-icon' />
                            {isSidebarOpen && <NavLink to='/studentDashboard/requestForm' className='nav-link'>Demander un document</NavLink>}
                        </div>
                    </div>

                    <div className="nav-botton">
                        <NavBotton isSidebarOpen={isSidebarOpen} />
                    </div>
                </div>
                <div className={`view-container ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default StudentDashboard