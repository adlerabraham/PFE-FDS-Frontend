import React from 'react';
import Logo from '../Logo/Logo'
import { NavLink } from 'react-router-dom';
import { Space } from 'antd';
import 'antd/dist/antd.css'
import './footer.scss'

function Footer() {
    return (
        <div className='footer'>
            <div className="footer-logo">
                <Logo LogoWidth="50" />
            </div>
            <Space>
                <NavLink>Espace virtuel</NavLink>|
                <NavLink>Mentions legales</NavLink>|
                <NavLink>A propos</NavLink>|
                <NavLink>Aide</NavLink>|
            </Space>
        </div>
    );
}

export default Footer