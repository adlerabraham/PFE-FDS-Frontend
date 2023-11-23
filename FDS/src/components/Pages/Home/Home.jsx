import React, { useEffect } from 'react';
import './Home.jsx';
import 'antd/dist/antd.css'
import { Link, Outlet, useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/login')
    }, [])

    return (
        <div>
            <Outlet />
        </div>
    );
}

export default Home