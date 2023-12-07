import React, { useState } from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import { Spin } from 'antd'
import { useGetPeriodsQuery } from '../../../../../api/ApiEndpoints';

function Periods(props) {
    const params = useParams()
    var link
    var isCoordinator = false
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const userGroup = localStorage.getItem('group');
    if (userGroup != null) {
        if (userGroup.toLowerCase() === 'teacher') {
            link = `/TeacherDashboard/academicYears/${params.acaYearId}/${selectedPeriod}`;
        } else if (userGroup.toLowerCase() === 'student') {
            link = `/StudentDashboard/academicYears/${params.acaYearId}/${selectedPeriod}`;
        } else if (userGroup.toLowerCase() === 'coordinator') {
            isCoordinator = true
            link = `/coordinatorDashboard/academicYears/${params.acaYearId}/${selectedPeriod}`;
        }

        const { data: periods, isLoading, isError } = useGetPeriodsQuery({ acaYearId: params.acaYearId })

        if (!(isError || isLoading)) {

            const handleLevelChange = (event) => {
                const selectedPeriodId = event.target.value;
                setSelectedPeriod(selectedPeriodId);
            };

            return (
                <div>
                    <div className="class-filters" style={{ marginBottom: 0 }}>
                        <select id="levelDropdown" onChange={handleLevelChange} value={selectedPeriod || ''} className="level-dropdown-class">
                            <option value="" disabled>Sélectionner une période</option>
                            {periods.map((period) => (
                                <option key={period.id} value={period.id}>
                                    {period.description}
                                </option>
                            ))}
                        </select>
                        {isCoordinator ?
                            (selectedPeriod && (
                                <NavLink to={link}>
                                    <button className="custom-list-button">
                                        Afficher les programmes
                                    </button>
                                </NavLink>
                            ))
                            :
                            (selectedPeriod && (
                                <NavLink to={link}>
                                    <button className="custom-list-button">
                                        Afficher les cours archivés
                                    </button>
                                </NavLink>
                            ))
                        }

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

export default Periods

