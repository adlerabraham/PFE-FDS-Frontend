import React from 'react'
import { useGenerateTranscriptQuery } from '../../../../api/ApiEndpoints'
import { Button, Spin } from 'antd'
import './TranscriptReview.scss'
import { useNavigate } from 'react-router-dom'

function TranscriptReview(props) {
    var order
    const navigate = useNavigate()

    const handleRetry = () => {
        navigate(-1)
    }
    if (localStorage.getItem('order')) {
        order = JSON.parse(localStorage.getItem('order'))
    }
    const { isLoading, error } = useGenerateTranscriptQuery({
        academic_year: order.document_aca_year,
        levelID: order.level,
        orderID: order.id
    })

    if (!(isLoading || error.originalStatus != 200)) {
        localStorage.setItem('payment', 0)
        return (
            <div>
                Consulter l'email que vous avez fourni pour retrouver votre relever de note
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className='spin'>
                <Spin size='large' />
            </div>
        )
    }

    if (error.originalStatus != 200) {
        return (
            <div className='error'>
                <p>Une erreur s'est produite lors de l'envoi du document.</p>
                <Button type='primary' onClick={handleRetry}>
                    Reessayer
                </Button>
            </div>
        )
    }

}

export default TranscriptReview

