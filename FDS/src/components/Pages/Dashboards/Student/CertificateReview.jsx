import React, { useEffect, useState } from 'react'
import { Button, Spin, notification } from 'antd'
import './TranscriptReview.scss'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';




function CertificateReview(props) {
    var order
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    const handleRetry = () => {
        navigate(-1)
    }

    const openSuccessfullCompletionNotification = () => {
        notification.success({
            message: 'Envoi de document réussie',
            description: "Consulter l'email que vous avez fourni pour retrouver votre attestation",
        });
    };

    const openUnSuccessfullCompletionNotification = () => {
        notification.error({
            message: 'Envoi de document échouée',
            description: "L'envoi du document a échoué. Veuillez réesseyer.",
        });
    };

    if (localStorage.getItem('order')) {
        order = JSON.parse(localStorage.getItem('order'))
    }

    const token = localStorage.getItem('accessToken')

    const downloadPdf = async () => {
        if (token) {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/document/certificate/generate/?academic_year_id=" + order.document_aca_year +
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
                link.download = `certificate_${order.id}.pdf`;

                // Append the link to the document body
                document.body.appendChild(link);

                // Trigger a click on the link to start the download
                link.click();

                // Remove the link from the document
                document.body.removeChild(link);

                openSuccessfullCompletionNotification()
                navigate('/studentdashboard')
            } catch (error) {
                console.error('Error downloading PDF:', error);
                openUnSuccessfullCompletionNotification()
                setIsError(true)
            }
        } else {
            openUnSuccessfullCompletionNotification()
            setIsError(true)
        }
    };

    useEffect(() => {
        // Call the downloadPdf function
        downloadPdf();
    }, [])



    if (!(isLoading || isError)) {
        localStorage.setItem('certificatePayment', 0)

        return (
            <div>

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

    if (isError && token) {
        return (
            <div className='error'>
                <p>Une erreur s'est produite lors de l'envoi du document.</p>
                <Button type='primary' onClick={handleRetry}>
                    Reessayer
                </Button>
            </div>
        )
    } else {
        return (
            <div className='error'>
                <p>Vous n'avez l'authorisation d'effectuer cette action.</p>
            </div>
        )
    }

}

export default CertificateReview

