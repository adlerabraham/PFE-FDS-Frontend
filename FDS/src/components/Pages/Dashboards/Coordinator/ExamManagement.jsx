import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

function ExamManagement(props) {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default ExamManagement

