import react from 'react';
import '../Dashboard.scss';
import '../../../Navigation/Navigation.scss'
import 'antd/dist/antd.css'
import { Button } from 'antd';
import { CalendarOutlined, HomeOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../../features/auth/authSlice';
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import Footer from '../../../Footer/Footer.jsx';
import NavBotton from '../../../Navigation/NavBotton';
import SidebarClass from '../../../Class/SidebarClass';
import { apiSlice } from '../../../../api/apiSlice';
import { store } from "../../../../stores/store";

function TeacherDashboard() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler = () => {
        dispatch(logOut())
        store.dispatch(apiSlice.util.resetApiState())
        navigate('/login')
    }

    return (
        <div>
            <div>
                <h1>Teacher dashboard</h1>
                <Button type="primary" htmlType="submit" onClick={logoutHandler} >
                    LOGOUT
                </Button>
            </div>
            <div className='background'>
                <div className='sidebar-container'>
                    <div className="nav-top">
                        <div className='nav-box'>
                            <div className='nav-option'>
                                <HomeOutlined className='nav-icon' />
                                <NavLink to="/teacherDashboard"
                                    className='nav-link'>Accueil</NavLink>
                            </div>
                            <div className='nav-option'>
                                <CalendarOutlined className='nav-icon' />
                                <NavLink to="/teacherDashboard/calendar"
                                    className='nav-link'>Calendrier</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="nav-middle">
                        <div className='nav-box'>
                            <div className="nav-option">
                                <div className="nav-title">Cours enseignes</div>
                            </div>
                            <div className="nav-option">
                                <NavLink to='' className='nav-link'>A faire</NavLink>
                            </div>
                            <div className="nav-option">
                                <SidebarClass />
                            </div>
                        </div>
                    </div>
                    <div className="nav-botton">
                        <NavBotton />
                    </div>
                </div>
                <div className='view-container'>
                    <Outlet />
                </div>

            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default TeacherDashboard