import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import './Requestform.scss'
import { useGetDocumentTypeQuery } from '../../../../api/ApiEndpoints';
import { Spin } from 'antd';

function RequestForm(props) {
    const [selectedDoc, setSelectedDoc] = useState(null);

    const handleLevelChange = (event) => {
        const selectedDocId = event.target.value;
        setSelectedDoc(selectedDocId);
    };

    const { data: documents, isLoading, isError } = useGetDocumentTypeQuery()
    if (!(isLoading || isError)) {

        localStorage.setItem('documents', JSON.stringify(documents))
        return (
            <div>
                <div className="doc-filter">
                    <select id="levelDropdown" onChange={handleLevelChange} value={selectedDoc || ''} className="level-dropdown-class">
                        <option value="" disabled>Selectionner un Document</option>
                        {documents.map((document) => (
                            <option key={document.id} value={document.id}>
                                {document.name}
                            </option>
                        ))}
                    </select>

                    {selectedDoc && (
                        <NavLink to={`/studentdashboard/requestForm/${selectedDoc}`}>
                            <button className="custom-list-button">
                                Formuler une demande
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
                Erreur de chargement.
            </div>
        )
    }

}

export default RequestForm

