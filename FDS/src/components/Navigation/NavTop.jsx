import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeOutlined, CalendarOutlined } from '@ant-design/icons';
import './Navigation.scss';

const NavTop = () => {
    return (
        <div className='nav-box'>
            <div className='nav-option'>
                <HomeOutlined className='nav-icon' />
                <NavLink to="/teacherHome"
                    className='nav-link'>Accueil</NavLink>
            </div>
            <div className='nav-option'>
                <CalendarOutlined className='nav-icon' />
                <NavLink to="/"
                    className='nav-link'>Calendrier</NavLink>
            </div>
        </div>
    );
};

export default NavTop;