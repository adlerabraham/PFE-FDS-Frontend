// import React from 'react';
// import { Button, Space } from 'antd';
// import { CalendarOutlined, HomeOutlined, LogoutOutlined, BellOutlined } from '@ant-design/icons';
// import { useDispatch } from 'react-redux';
// import { logOut } from '../../../../features/auth/authSlice';
// import { useNavigate } from 'react-router-dom';
// import SidebarClass from '../../../Class/SidebarClass';
// import { apiSlice } from '../../../../api/apiSlice';
// import { store } from '../../../../stores/store';

// function TeacherDashboardBar() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const logoutHandler = () => {
//     dispatch(logOut());
//     store.dispatch(apiSlice.util.resetApiState());
//     navigate('/login');
//   };

//   return (
//     <div className="teacher-dashboard-bar">
//       <Space>
//         <Button icon={<HomeOutlined />} onClick={() => console.log('Accueil')} />
//         <Button icon={<CalendarOutlined />} onClick={() => console.log('Calendrier')} />
//         <Button icon={<BellOutlined />} onClick={() => console.log('Notifications')} />
//         {/* <SidebarClass /> */}
//         <Button icon={<LogoutOutlined />} type="primary" onClick={logoutHandler}>
//           SE DECONNECTER
//         </Button>
//       </Space>
//     </div>
//   );
// }

// export default TeacherDashboardBar;



// Fichier : TeacherDashboardBar.jsx

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
import './TeacherDashboardBar.scss';
import { Tooltip } from 'antd';
import { apiSlice } from '../../../../api/apiSlice';



function TeacherDashboardBar({ onToggleSidebar }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logOut());
    store.dispatch(apiSlice.util.resetApiState());
    navigate('/login');
  };

  const username = localStorage.getItem('username')
  const accountMenu = (
    <Menu>
      {username != null ?
        <Menu.Item key="1" icon={<UserOutlined />}>
          {username}
        </Menu.Item>
        :
        <Menu.Item key="1" icon={<UserOutlined />}>
          user_name
        </Menu.Item>
      }
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
    <div className="teacher-dashboard-bar">
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
  );
}

export default TeacherDashboardBar;
