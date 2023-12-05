import Class from '../../Class/Class'
import { useGetClassQuery, useGetStudentCourseQuery } from "../../../api/ApiEndpoints"
import './DashboardHome.scss'
import { Spin } from 'antd';

function DashbordHome() {

    //verification du type d'utilisateur
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

                    //Enregistrer les cours 
                    localStorage.setItem('classTable', JSON.stringify(courses))

                    if (value === '0') {
                        //teacher
                        return (
                            <div className='dashb-home-container'>
                                {courses.map((course) => (
                                    <Class key={course.id}
                                        courseID={course.id}
                                        courseName={course.name}
                                        levels={course.levels}
                                        teacher={course.user_info}
                                        period={course.period}
                                        group={value}
                                        coordinator={'0'} />
                                ))}
                            </div>
                        );
                    } else {
                        //student
                        return (
                            <div className='dashb-home-container'>
                                {courses.map((course) => (
                                    <Class key={course.id}
                                        courseID={course.id}
                                        courseName={course.course_name}
                                        level={course.level_name}
                                        teacher={course.teacher_name}
                                        period={course.period_name}
                                        group={value}
                                        coordinator={'0'} />
                                ))}
                            </div>
                        );
                    }

                }

            } else {
                console.log(error);
                return (
                    <div>Erreur de chargment</div>
                )
            }
        } else {
            return (
                <div className='spin'>
                    <Spin tip='Chargement ...' size='large' />
                </div>
            )
        }

    } else {
        return (
            <div>Non autorise</div>
            // Add a button to go back
        );
    }

}

export default DashbordHome