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
            //var classLink = `/coordinatorDashboard/${params.programId}/${params.levelID}/${params.classID}/transcriptList`
            var classLink = './transcriptList'
        }

        useEffect(() => {
            navigate(classLink)
        }, [params.classID])


        return (
            <div>
                <Outlet />
            </div>
        )

    } else {
        return <div>Non autorise</div>
    }

}

export default ClassBoard