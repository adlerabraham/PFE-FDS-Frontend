import React, { useState } from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import { Spin } from 'antd'
import { useGetPeriodsQuery } from '../../../../../api/ApiEndpoints';
import './CoordinatorArchiveFilters.scss'
import '../../Teacher/Archive/ArchiveFilters.scss'

function CoordinatorPeriods(props) {
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
                <div className='archive' style={{ display: 'block' }}>
                    <div className="period-filters" style={{ marginBottom: 0 }}>
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
                                <div className="filter-link">
                                    <NavLink to={link}>
                                        <button className="custom-list-button">
                                            Afficher les programmes
                                        </button>
                                    </NavLink>
                                </div>
                            ))
                            :
                            (selectedPeriod && (
                                <div className="filter-link">
                                    <NavLink to={link}>
                                        <button className="custom-list-button">
                                            Afficher les cours archivés
                                        </button>
                                    </NavLink>
                                </div>
                            ))
                        }

                    </div>
                    <div className='next c-finale-box'>
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

export default CoordinatorPeriods

