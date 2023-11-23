// import react from 'react';
// import '../Dashboard.scss';
// import '../../../Navigation/Navigation.scss'
// import 'antd/dist/antd.css'
// import { Button } from 'antd';
// import { CalendarOutlined, HomeOutlined } from '@ant-design/icons';
// import { useDispatch } from 'react-redux';
// import { logOut } from '../../../../features/auth/authSlice';
// import { NavLink, Outlet, useNavigate } from "react-router-dom"
// import Footer from '../../../Footer/Footer.jsx';
// import NavBotton from '../../../Navigation/NavBotton';
// import SidebarClass from '../../../Class/SidebarClass';
// import { apiSlice } from '../../../../api/apiSlice';
// import { store } from "../../../../stores/store";
// import Header from '../../../Header/Header';
// import TeacherDashboardBar from './TeacherDashboardBar';



// function TeacherDashboard() {

//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const logoutHandler = () => {
//         dispatch(logOut())
//         store.dispatch(apiSlice.util.resetApiState())
//         navigate('/login')
//     }

//     return (
//         <div>
//             <div><Header/></div>
//             <div>
//                 <TeacherDashboardBar/>
//             </div>
//             <div className='background'>
//                 <div className='sidebar-container'>
//                     <div className="nav-top">
//                         <div className='nav-box'>
//                             <div className='nav-option'>
//                                 <HomeOutlined className='nav-icon' />
//                                 <NavLink to="/teacherDashboard"
//                                     className='nav-link'>Accueil</NavLink>
//                             </div>
//                             <div className='nav-option'>
//                                 <CalendarOutlined className='nav-icon' />
//                                 <NavLink to="/teacherDashboard/calendar"
//                                     className='nav-link'>Calendrier</NavLink>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="nav-middle">
//                         <div className='nav-box'>
//                             <div className="nav-option">
//                                 <div className="nav-title">Cours enseignes</div>
//                             </div>
//                             <div className="nav-option">
//                                 <NavLink to='' className='nav-link'>A faire</NavLink>
//                             </div>
//                             <div className="nav-option">
//                                 <SidebarClass />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="nav-botton">
//                         <NavBotton />
//                     </div>
//                 </div>
//                 <div className='view-container'>
//                     <Outlet />
//                 </div>

//             </div>
//             <div>
//                 <Footer />
//             </div>
//         </div>
//     );
// }

// export default TeacherDashboard



import React, { useState } from 'react';
import '../Dashboard.scss';
import '../../../Navigation/Navigation.scss';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import { BookOutlined, CalendarOutlined, HomeOutlined, MenuOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../../features/auth/authSlice';
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Footer from '../../../Footer/Footer.jsx';
import NavBotton from '../../../Navigation/NavBotton';
import SidebarClass from '../../../Class/SidebarClass';
import { apiSlice } from '../../../../api/apiSlice';
import { store } from "../../../../stores/store";
import Header from '../../../Header/Header';
import TeacherDashboardBar from './TeacherDashboardBar';




function TeacherDashboard() {
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
                                {isSidebarOpen && <NavLink to="/teacherDashboard" className='nav-link'>Accueil</NavLink>}
                            </div>
                            <div className='nav-option'>
                                <CalendarOutlined className='nav-icon' />
                                {isSidebarOpen && <NavLink to="/teacherDashboard/calendar" className='nav-link'>Calendrier</NavLink>}
                            </div>
                        </div>
                    </div>
                    <div className="nav-middle">
                        <div className='nav-box'>
                            <div className="nav-option">
                                <BookOutlined className='nav-icon' />
                                {isSidebarOpen && <NavLink to="/teacherDashboard" className='nav-link'>Cours enseignés</NavLink>}
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

export default TeacherDashboard;
