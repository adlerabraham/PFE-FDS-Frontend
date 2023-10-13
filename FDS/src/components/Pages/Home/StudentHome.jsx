import react from 'react';
import './Home.scss';
import '../../Navigation/Navigation.scss'
import 'antd/dist/antd.css'
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../features/authSlice';
import { useNavigate } from "react-router-dom"
import Class from '../../Class/Class.jsx';
import Footer from '../../Footer/Footer.jsx';
import NavTop from '../../Navigation/NavTop';
import NavBotton from '../../Navigation/NavBotton';
import SidebarClass from '../../Class/SidebarClass.jsx';

function StudentHome() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler = () => {
        dispatch(logOut())
        navigate('/login')
    }

    return (
        <div>
            <div>
                <h1>Student dashboard</h1>
                <Button type="primary" htmlType="submit" onClick={logoutHandler} >
                    LOGOUT
                </Button>
            </div>
            <div className='background'>
                <div className='sidebar-container'>
                    <div className="nav-top">
                        <NavTop />
                    </div>
                    <div className="nav-middle">
                        <div className='nav-box'>
                            <div className="nav-option">
                                <div className="nav-title">Cours enregistres</div>
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
                    <Class />
                </div>

            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default StudentHome