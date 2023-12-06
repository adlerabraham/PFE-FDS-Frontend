import React, { useEffect, useState } from 'react'
import { Button, Spin } from 'antd'
import './TranscriptReview.scss'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function TranscriptReview(props) {
    var order
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    const handleRetry = () => {
        navigate(-1)
    }
    if (localStorage.getItem('order')) {
        order = JSON.parse(localStorage.getItem('order'))
    }

    const downloadPdf = async () => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/document/transcript/generate/?academic_year_id=" + order.document_aca_year +
                    "&level_id=" + order.level + "&order_id=" + order.id, {
                    responseType: 'arraybuffer', // Specify the response type 
                    headers: {
                        //Accept: 'application/pdf',
                        Authorization: `Bearer ${token}`
                    }
                });

                setIsLoading(false)
                // Create a link element
                const link = document.createElement('a');
                console.log(link);
                // Create a Blob object from the PDF data
                const blob = new Blob([response.data], { type: 'application/pdf' });

                // Create a download URL for the Blob
                const url = window.URL.createObjectURL(blob);

                // Set the link's href to the download URL
                link.href = url;
                console.log(url);
                // Specify the file name (optional)
                link.download = `transcript_${order.id}.pdf`;

                // Append the link to the document body
                document.body.appendChild(link);

                // Trigger a click on the link to start the download
                link.click();

                // Remove the link from the document
                document.body.removeChild(link);
            } catch (error) {
                console.error('Error downloading PDF:', error);
                setIsError(true)
            }
        }
    };

    useEffect(() => {
        // Call the downloadPdf function
        downloadPdf();
    }, [])


    if (!(isLoading || isError)) {
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

    if (isError) {
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

