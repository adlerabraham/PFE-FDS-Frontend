import React, { useState } from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import { useGetLevelsQuery } from '../../../../api/ApiEndpoints'
import './ProgramManagement.scss'
import { Spin } from 'antd'

function ProgramManagement(props) {
    const params = useParams()
    const programID = params.programId
    const [selectedLevel, setSelectedLevel] = useState(null);

    const { data: levels, isLoading, isError } = useGetLevelsQuery({ programID })

    if (!(isError || isLoading)) {

        const handleLevelChange = (event) => {
            const selectedLevelId = event.target.value;
            setSelectedLevel(selectedLevelId);
        };

        return (
            <div>
                <div className="class-filters">
                    <select id="levelDropdown" onChange={handleLevelChange} value={selectedLevel || ''} className="level-dropdown-class">
                        <option value="" disabled>Sélectionner un niveau</option>
                        {levels.map((level) => (
                            <option key={level.id} value={level.id}>
                                {level.name}
                            </option>
                        ))}
                    </select>

                    {selectedLevel && (
                        <NavLink to={`./${selectedLevel}`}>
                            <button className="custom-list-button">
                                Afficher les cours
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

export default ProgramManagement

