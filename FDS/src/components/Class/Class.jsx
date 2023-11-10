import React from 'react'
import 'antd/dist/antd.css';
import { NavLink } from "react-router-dom"
import './Class.scss';

function Class(props) {

    //Verify levels array length and extract the data 
    if (props.levels.length == 0) {
        var level = "N/A"
    } else if (props.levels.length == 1) {
        var level = props.levels[0].name
    } else {
        var level = props.levels[0].name
        for (let index = 1; index < props.levels.length; index++) {
            level = level + " / " + props.levels[index].name
        }
    }


    return (
        <div className='class-box'>
            <div className="class-head">
                <NavLink to={'/teacherDashboard/' + props.courseID}>
                    {props.courseName}
                </NavLink>
                <h2>{level}</h2>
                <h2>{props.period.name}</h2>
                {props.group === '1' ? <h2>{props.teacher.first_name} {props.teacher.last_name}</h2> : <h2></h2>}

            </div>
            <div className='class-body'>

            </div>
            <div className="class-footer"></div>
        </div>
    );


}

export default Class