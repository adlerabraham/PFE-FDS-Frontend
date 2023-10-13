import React from 'react';
import { NavLink } from 'react-router-dom';
import { DownSquareOutlined, SettingOutlined } from '@ant-design/icons';
import './Navigation.scss';

function NavBotton() {
    return (
        <div className="nav-box">
            <div className="nav-option">
                <DownSquareOutlined className="nav-icon" />
                <NavLink to=""
                    className='nav-link'>Cours archives</NavLink>
            </div>
            <div className="nav-option">
                <SettingOutlined className="nav-icon" />
                <NavLink to=""
                    className='nav-link'>Parametres</NavLink>
            </div>
        </div>
    );
}

export default NavBotton