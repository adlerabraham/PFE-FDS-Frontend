import Class from '../../Class/Class'
import { useGetClassQuery } from "../../../api/ApiEndpoints"
import './DashboardHome.scss'

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
            var { data: courses, isError, isLoading, error } = useGetClassQuery()
        } else {
            //const { data: courses, isError, isLoading, error } = useGetClassQuery()
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

                    // //Enregistrer les cours dans le state
                    localStorage.setItem('classTable', JSON.stringify(courses))


                    return (

                        <div className='dashb-home-container'>
                            {courses.map((course) => (
                                <Class key={course.id}
                                    courseID={course.id}
                                    courseName={course.name}
                                    levels={course.levels}
                                    teacher={course.user_info}
                                    period={course.period}
                                    group={value} />
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

    } else {
        return (
            <div>Non autorise</div>
            // Add a button to go back
        );
    }

}

export default DashbordHome