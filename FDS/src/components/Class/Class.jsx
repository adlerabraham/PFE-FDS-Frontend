import react from 'react';
import 'antd/dist/antd.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom"
import './Class.scss';

function Class() {

    return (
        <div className='class-box'>
            <div className="class-head">
                <h1>Nom du cours</h1>
                <h2>Programme</h2>
                {/* <h2>Professeur</h2> */}
            </div>
            <div className='class-body'>

            </div>
            <div className="class-footer"></div>
        </div>
    );
}

export default Class