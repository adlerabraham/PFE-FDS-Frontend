import React, { useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

function Transition(props) {
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (params.documentId == 1) { //Attestation
            navigate(`/studentdashboard/requestForm/${params.documentId}/certificate`)
        } else if (params.documentId == 4) {//releve de notes
            navigate(`/studentdashboard/requestForm/${params.documentId}/transcript`)
        }
    }, [params.documentId])
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default Transition

