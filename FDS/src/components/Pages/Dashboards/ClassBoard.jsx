import { useEffect } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";

function ClassBoard() {

    let params = useParams()
    let classID = params.classID
    const navigate = useNavigate()
    const userGroup = localStorage.getItem('group');
    if (userGroup != null) {
        if (userGroup.toLowerCase() === 'teacher') {
            var classLink = "/teacherDashboard/" + classID + "/teacherclass"
        } else if (userGroup.toLowerCase() === 'student') {
            //set classLink to studentclass("/teacherDashboard/" + parmas.classID + "/studentClass")
        }

        useEffect(() => {
            navigate(classLink)
        }, [])


        return (
            <div>
                Class board {classID}

                <Outlet context={[classID]} />
            </div>
        )

    } else {
        return <div>Non authorise</div>
    }

}

export default ClassBoard