import React, { useState } from 'react';
import '../Dashboard.scss';
import '../../../Navigation/Navigation.scss';
import 'antd/dist/antd.css';
import { BookOutlined, CalendarOutlined, HomeOutlined, CheckSquareOutlined, FileDoneOutlined, SettingOutlined } from '@ant-design/icons';
import { NavLink, Outlet } from "react-router-dom";
import Footer from '../../../Footer/Footer.jsx';
import Header from '../../../Header/Header.jsx';
import CoordinatorDashboardBar from './CoordinatorDashboardBar.jsx';

function CoordinatorDashboard(props) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>
            <Header />
            <CoordinatorDashboardBar onToggleSidebar={toggleSidebar} />
            <div className={`background ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
                <div className={`sidebar-container ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
                    {/* Sidebar Content */}
                    <div className="nav-top">
                        <div className='nav-box'>
                            <div className='nav-option'>
                                <HomeOutlined className='nav-icon' />
                                {isSidebarOpen && <NavLink to="/coordinatorDashboard" className='nav-link'>Accueil</NavLink>}
                            </div>
                            <div className='nav-option'>
                                <CalendarOutlined className='nav-icon' />
                                {isSidebarOpen && <NavLink to="/coordinatorDashboard/calendar" className='nav-link'>Calendrier</NavLink>}
                            </div>
                        </div>
                    </div>
                    <div className="nav-middle">
                        <div className='nav-box'>
                            <div className="nav-option">
                                <BookOutlined className='nav-icon' />
                                {isSidebarOpen && <NavLink to="/coordinatorDashboard" className='nav-link'>Rapports de cours</NavLink>}
                            </div>
                            {/* <div className="nav-option">
                                <BookOutlined className='nav-icon' />
                                {isSidebarOpen && <NavLink to="/coordinatorDashboard/examManagement" className='nav-link'>Gestion des examens</NavLink>}
                            </div> */}
                            <div className="nav-option">
                                <BookOutlined className='nav-icon' />
                                {isSidebarOpen && <NavLink to="/coordinatorDashboard" className='nav-link'>Gestion des calendriers</NavLink>}
                            </div>

                        </div>
                        <div className="nav-option">
                            <CheckSquareOutlined className='nav-icon' />
                            {isSidebarOpen && <NavLink to='' className='nav-link'>À faire</NavLink>}
                        </div>
                    </div>

                    <div className="nav-botton">
                        <div className="nav-option">
                            <FileDoneOutlined className="nav-icon" />
                            {isSidebarOpen && <NavLink to="/coordinatorDashboard/academicYears" className='nav-link'>Cours archivés</NavLink>}
                        </div>
                        <div className="nav-option">
                            <SettingOutlined className="nav-icon" />
                            {isSidebarOpen && <NavLink to="" className='nav-link'>Paramètres</NavLink>}
                        </div>
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

export default CoordinatorDashboard

