import react from 'react';
import './Home.jsx';
import 'antd/dist/antd.css'
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Home page</h1>
            <ul>
                <li>
                    <Link to="/teacherDashboard">Teacher dashboard</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>

                </li>
            </ul>
        </div>
    );
}

export default Home