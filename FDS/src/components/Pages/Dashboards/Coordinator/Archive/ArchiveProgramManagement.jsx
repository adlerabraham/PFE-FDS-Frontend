import React, { useState } from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import './ArchiveProgramManagement.scss'
import { Spin } from 'antd'
import { useGetLevelsQuery } from '../../../../../api/ApiEndpoints'

function ArchiveProgramManagement(props) {
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
            <div className='archive' style={{ display: 'block', width: 'fit-content' }}>
                <div className="a-class-filters">
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
                <div className='program-course'>
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

export default ArchiveProgramManagement

