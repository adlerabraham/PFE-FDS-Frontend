import React, { useState } from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import { Spin } from 'antd'
import { useGetAcademicYearsQuery } from '../../../../../api/ApiEndpoints';

function AcademicYears(props) {
    const [selectedAcaYear, setSelectedAcaYear] = useState(null);
    var link
    const userGroup = localStorage.getItem('group');
    if (userGroup != null) {
        if (userGroup.toLowerCase() === 'teacher') {
            link = `/TeacherDashboard/academicYears/${selectedAcaYear}`;
        } else if (userGroup.toLowerCase() === 'student') {
            link = `/StudentDashboard/academicYears/${selectedAcaYear}`;
        } else if (userGroup.toLowerCase() === 'coordinator') {
            link = `/coordinatorDashboard/academicYears/${selectedAcaYear}`;
        }

        const { data: aca_years, isLoading, isError } = useGetAcademicYearsQuery()

        if (!(isError || isLoading)) {

            const handleLevelChange = (event) => {
                const selectedYearId = event.target.value;
                setSelectedAcaYear(selectedYearId);
            };

            return (
                <div>
                    <div className="class-filters">
                        <select id="levelDropdown" onChange={handleLevelChange} value={selectedAcaYear || ''} className="level-dropdown-class">
                            <option value="" disabled>Sélectionner une année académique</option>
                            {aca_years.map((aca_year) => (
                                <option key={aca_year.id} value={aca_year.id}>
                                    {aca_year.name}
                                </option>
                            ))}
                        </select>

                        {selectedAcaYear && (
                            <NavLink to={link}>
                                <button className="custom-list-button">
                                    Afficher les périodes
                                </button>
                            </NavLink>
                        )}
                    </div>
                    <div>
                        <Outlet />
                    </div>
                </div>
            );
        }

        if (isLoading) {
            return (
                <div className='spin'>
                    <Spin tip='Chargement ...' size='large' />
                </div>
            )
        }

        if (isError) {
            return (
                <div>
                    Erreur de Chargement!
                </div>
            )
        }
    }

    return (
        <div>
            Acces non authorisé
        </div>
    )
}

export default AcademicYears

