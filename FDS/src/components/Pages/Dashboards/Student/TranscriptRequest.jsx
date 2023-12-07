import React from 'react'
import { useGetStudentLevelQuery } from '../../../../api/ApiEndpoints'
import CustomCheckbox from '../../../Checkbox/CustomCheckbox'
import { Divider, Spin } from 'antd'
import './TranscriptRequest.scss'

function TranscriptRequest(props) {

    const { data: levels, isLoading, isError } = useGetStudentLevelQuery()
    if (!(isLoading || isError)) {

        return (
            <div className='request-form-container'>
                <h6>DEMANDER UN RELEVE DE NOTES</h6>
                <Divider />
                <CustomCheckbox levels={levels} />
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

export default TranscriptRequest

