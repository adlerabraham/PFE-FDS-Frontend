import Class from '../../Class/Class'
import { useGetClassQuery } from "../../../api/ApiEndpoints";
import './DashboardHome.scss'
//import { useGetClassQuery } from "../../../api/ClassApi";

function DashbordHome() {


    console.log(useGetClassQuery());
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

                    <div className='dashb-home-container'>
                        {courses.map((course) => (
                            <Class key={course.id}
                                courseName={course.name}
                                levels={course.levels}
                                teacher={course.user_info}
                                period={course.period.name} />
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

export default DashbordHome