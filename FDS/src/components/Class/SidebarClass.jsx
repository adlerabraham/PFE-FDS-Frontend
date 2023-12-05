import 'antd/dist/antd.css';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom"
import './Class.scss';
import { useGetClassQuery, useGetStudentCourseQuery } from '../../api/ApiEndpoints';

function SidebarClass() {
    const userGroup = localStorage.getItem('group');
    if (userGroup != null) {
        if (userGroup.toLowerCase() === 'teacher') {
            var value = '0';
        } else if (userGroup.toLowerCase() === 'student') {
            var value = '1';
        }


        //Retrouver les cours en fonction du type d'utilisateur
        if (value === '0') {
            //teacher
            var { data: courses, isError, isLoading, error } = useGetClassQuery()
        } else {
            //student
            var { data: courses, isError, isLoading, error } = useGetStudentCourseQuery()
        }

        if (!isLoading) {
            if (!isError) {
                if (courses.length == 0) {
                    return (
                        <div>
                            Pas de cours disponnible!
                        </div>
                    )
                } else {
                    return (
                        <div>
                            {courses.map((course) => (
                                <div key={course.id} className="s-class-box nav-option">
                                    <div id='s-class-icon' className='nav-icon' ></div>
                                    <div className="s-class-title">
                                        {value === '0' ?
                                            <NavLink to={'/teacherDashboard/' + course.id}>
                                                {course.name}
                                            </NavLink>
                                            :
                                            <NavLink to={'/studentDashboard/' + course.id}>
                                                {course.course_name}
                                            </NavLink>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>

                    );
                }

            } else {
                console.log(error);
                return (
                    <div>Erreur de Chargement.</div>
                )
            }
        } else {
            return (
                <div>
                    Chargement...
                </div>
            )
        }

    } else {
        return (
            <div>Non autorise</div>
        );
    }
}

export default SidebarClass

