import React from 'react';
import { Button, Space, Dropdown, Menu, Avatar, Input } from 'antd';
import {
    CalendarOutlined,
    HomeOutlined,
    LogoutOutlined,
    BellOutlined,
    SettingOutlined,
    QuestionCircleOutlined,
    SafetyCertificateOutlined,
    SearchOutlined,
    MenuOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { store } from '../../../../stores/store';
import './CoordinatorDashboardBar.scss';
import { Tooltip } from 'antd';
import { apiSlice } from '../../../../api/apiSlice';

function CoordinatorDashboardBar({ onToggleSidebar }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logOut());
        store.dispatch(apiSlice.util.resetApiState());
        navigate('/login');
    };

    const accountMenu = (
        <Menu>
            <Menu.Item key="1" icon={<SettingOutlined />}>
                Paramètres du compte
            </Menu.Item>
            <Menu.Item key="2" icon={<QuestionCircleOutlined />}>
                Obtenir de l'aide
            </Menu.Item>
            <Menu.Item key="3" icon={<SafetyCertificateOutlined />}>
                Politique de sécurité
            </Menu.Item>
            <Menu.Item key="4" icon={<LogoutOutlined />} onClick={logoutHandler}>
                Se déconnecter
            </Menu.Item>
        </Menu>
    );
    return (
        <div className='coordinator-dashboard-bar'>
            <Tooltip title="Menu">
                <Button
                    icon={<MenuOutlined />}
                    onClick={onToggleSidebar}
                    className="menu-button"
                />
            </Tooltip>
            <Space>
                <Input
                    prefix={<SearchOutlined />}
                    placeholder="Rechercher un cours"
                    style={{ width: 200 }}
                    onChange={(e) => console.log('Recherche en cours...', e.target.value)}
                />
                <Tooltip title="Accueil">
                    <Button icon={<HomeOutlined />} onClick={() => console.log('Accueil')} />
                </Tooltip>

                <Tooltip title="Calendrier">
                    <Button icon={<CalendarOutlined />} onClick={() => console.log('Calendrier')} />
                </Tooltip>

                <Tooltip title="Notifications">
                    <Button icon={<BellOutlined />} onClick={() => console.log('Notifications')} />
                </Tooltip>

                {/* Bouton personnalisable avec photo et menu déroulant */}
                <Dropdown overlay={accountMenu} placement="bottomRight">
                    <Button icon={<Avatar icon={<UserOutlined />} />} />
                </Dropdown>
            </Space>
        </div>
    )
}

export default CoordinatorDashboardBar

