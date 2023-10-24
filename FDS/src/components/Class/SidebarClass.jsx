import 'antd/dist/antd.css';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom"
import './Class.scss';
import { useGetClassQuery } from '../../api/ApiEndpoints';

function SidebarClass() {
    const { data: courses, isError, isLoading, error } = useGetClassQuery()

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
                            <div key={course.id} className="s-class-box">
                                <div id='s-class-icon' className='nav-icon' ></div>
                                <div className="s-class-title">
                                    <NavLink to='/teacherDashboard/teacherClass'>
                                        {course.name}
                                    </NavLink>
                                </div>
                            </div>
                        ))}
                    </div>

                );
            }

        } else {
            console.log(error);
            return (
                <div>Non autorise</div>
            )
        }
    } else {
        return (
            <div>
                Chargement...
            </div>
        )
    }
}

export default SidebarClass