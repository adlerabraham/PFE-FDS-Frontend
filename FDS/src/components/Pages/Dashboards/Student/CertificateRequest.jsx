import React from 'react'
import { Divider, Spin } from 'antd'
import { useGetStudentLevelQuery } from '../../../../api/ApiEndpoints'
import CertificateCheckbox from '../../../Checkbox/CertificateCheckbox'

function CertificateRequest(props) {
    const { data: levels, isLoading, isError } = useGetStudentLevelQuery()
    if (!(isLoading || isError)) {
        return (
            <div className='request-form-container'>
                <h4>DEMANDER UNE ATTESTATION</h4>
                <Divider />
                <p>Choix du niveau</p>
                <CertificateCheckbox levels={levels} />
            </div>
        )
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
export default CertificateRequest

