import 'antd/dist/antd.css';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom"
import './Class.scss';

function SidebarClass(params) {
    return (
        <div className='s-class-box'>
            <div id='s-class-icon' className='nav-icon' ></div>
            <div className="s-class-title">
                <NavLink to=''>Nom du cours</NavLink> </div>
        </div>
    );
}

export default SidebarClass