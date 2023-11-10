import React from 'react'
import { NavLink, useOutletContext, Outlet } from 'react-router-dom'
import './ClassParticipants.scss'

function ClassParticipants() {
    const [classID] = useOutletContext()
    // const classInfoTable = JSON.parse(localStorage.getItem('classTable'))
    // console.log("ClassInfos " + classInfoTable);
    let classInfoTable;

    try {
        const rawData = localStorage.getItem('classTable');
        console.log("rwaData: " + rawData);
        // Remove additional characters if needed
        const cleanedData = rawData.replace(/\\/g, '');
        classInfoTable = JSON.parse(cleanedData);
    } catch (error) {
        console.error('Error parsing JSON data from localStorage:', error);
    }

    console.log("After parsing : " + classInfoTable);


    // for (let index = 0; index < classInfoTable.length; index++) {
    //     const course = classInfoTable[index];
    //     console.log(course);
    //     if (course.id == classID) {
    //         var levels = course.levels;
    //     }
    // }

    return (
        <div>
            <div className="class-filters">
                {/* {
                    levels.map((level) => (
                        <div className="level">
                            <NavLink
                                key={level.id}
                                to={"/teacherDashboard/" + classID + "/teacherclass/classParticipants/" + level.id}>
                                {level.name}
                            </NavLink>
                        </div>
                    ))
                } */}
            </div>
            <div>
                <Outlet context={[classID]} />
            </div>

        </div>
    )
}

export default ClassParticipants