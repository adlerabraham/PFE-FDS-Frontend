// import React from 'react'
// import 'antd/dist/antd.css';
// import { NavLink } from "react-router-dom"
// import './Class.scss';

// function Class(props) {

//     //Verify levels array length and extract the data 
//     if (props.levels.length == 0) {
//         var level = "N/A"
//     } else if (props.levels.length == 1) {
//         var level = props.levels[0].name
//     } else {
//         var level = props.levels[0].name
//         for (let index = 1; index < props.levels.length; index++) {
//             level = level + " / " + props.levels[index].name
//         }
//     }


//     return (
//         <div className='class-box'>
//             <div className="class-head">
//                 <NavLink to={'/teacherDashboard/' + props.courseID}>
//                    <h1>{props.courseName}</h1> 
//                 </NavLink>
//                 <h2>{level}</h2>
//                 <h2>{props.period.name}</h2>
//                 {props.group === '1' ? <h2>{props.teacher.first_name} {props.teacher.last_name}</h2> : <h2></h2>}

//             </div>
//             <div className='class-body'>

//             </div>
//             <div className="class-footer"></div>
//         </div>
//     );


// }

// export default Class




import React from 'react'
import 'antd/dist/antd.css';
import { NavLink } from "react-router-dom"
import './Class.scss';


function Class(props) {
    var link = "";

    if (props.coordinator != '1') {
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

        if (props.group === '1') {
            //set Link for student
        } else {
            link = '/teacherDashboard/' + props.courseID
        }
    } else {
        link = `/coordinatorDashboard/${props.programID}/${props.level}/${props.courseID}`
    }

    const getRandomClassID = () => {
        // Générer un identifiant de classe aléatoire (par exemple, entre 1 et 10)
        const randomClassID = Math.floor(Math.random() * 10) + 1;
        return 'class' + randomClassID;
    };

    return (
        <div className='class-box'>
            <div className={`class-head ${getRandomClassID()}`}>
                <NavLink to={link}>
                    <h1>{props.courseName}</h1>
                </NavLink>
                {props.coordinator === '1' ? <h2></h2> : <h2>{level}</h2>}
                {/* <h2>{props.period.name}</h2> */}
                {props.group === '1' ? <h2>{props.teacher.first_name} {props.teacher.last_name}</h2> : <h2></h2>}
            </div>
            <div className='class-body'>
                {/* ... */}
            </div>
            <div className="class-footer"><h6>{props.period.name}</h6></div>
        </div>
    );
}

export default Class;


