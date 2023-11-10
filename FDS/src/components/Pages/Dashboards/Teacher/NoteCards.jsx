import React from 'react'
import { NavLink, Outlet, useOutletContext } from 'react-router-dom'
import './NoteCards.scss'

function NoteCards() {
    const [classID] = useOutletContext()
    return (
        <div>
            <div className='noteCard-filters'>
                <div className="level">
                    <NavLink to={"/teacherDashboard/" + classID + "/teacherclass/noteCards/1"}>
                        Niveau 1
                    </NavLink>
                </div>
                <div className="level">
                    <NavLink to={"/teacherDashboard/" + classID + "/teacherclass/noteCards/2"}>
                        Niveau 2
                    </NavLink>
                </div>
                <div className="level">
                    <NavLink to={"/teacherDashboard/" + classID + "/teacherclass/noteCards/3"}>
                        Niveau 3
                    </NavLink>
                </div>
            </div>
            <div>
                <Outlet context={[classID]} />
            </div>
        </div>

    )
}

export default NoteCards