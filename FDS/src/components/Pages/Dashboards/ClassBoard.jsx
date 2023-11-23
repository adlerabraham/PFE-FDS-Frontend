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
            //set classLink to studentclass("/teacherDashboard/" + parmas.classID + "/studentClass")
        } else if (userGroup.toLowerCase() === 'coordinator') {
            classLink = `/coordinatorDashboard/${params.programId}/${params.levelID}/${params.classID}/transcriptList`
        }

        useEffect(() => {
            navigate(classLink)
        }, [])


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