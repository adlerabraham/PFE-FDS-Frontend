import { useEffect } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";

function ClassBoard() {

    let params = useParams()
    const navigate = useNavigate()

    const userGroup = localStorage.getItem('group');
    if (userGroup != null) {
        if (userGroup.toLowerCase() === 'teacher') {
            var classLink = "/teacherDashboard/" + params.classID + "/teacherclass"
        } else if (userGroup.toLowerCase() === 'student') {
            var classLink = "/studentDashboard/" + params.classID + "/studentClass"
        } else if (userGroup.toLowerCase() === 'coordinator') {
            if (params.acaYearId != undefined) {
                var classLink = './transcriptList'
            } else {
                var classLink = './classOptions'
            }
        }

        useEffect(() => {
            navigate(classLink)
        }, [params.classID])


        if (params.acaYearId != undefined) {
            return (
                <div style={{ paddingTop: 10 }}>
                    <Outlet />
                </div>
            )
        } else {
            return (
                <div>
                    <Outlet />
                </div>
            )
        }


    } else {
        return <div>Non autorise</div>
    }

}

export default ClassBoard