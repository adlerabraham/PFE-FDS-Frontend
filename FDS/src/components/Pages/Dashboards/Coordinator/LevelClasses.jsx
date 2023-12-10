import React from 'react'
import { Outlet } from 'react-router-dom'


function LevelClasses(props) {
    return (
        <div className='archive-classes'>
            <Outlet />
        </div>
    )

}
export default LevelClasses

