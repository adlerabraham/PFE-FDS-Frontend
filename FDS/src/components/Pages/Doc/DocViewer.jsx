import React, { useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import Header from '../../Header/Header'
import { useGetOrderedDocumentQuery } from '../../../api/ApiEndpoints'
// import { Viewer, Worker } from '@react-pdf-viewer/core';
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';


function DocViewer(props) {
    const params = useParams()
    const navigate = useNavigate()
    // const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const { data: document, isLoading, isError } = useGetOrderedDocumentQuery({ orderID: params.orderId })

    if (!(isLoading || isError)) {

        if (document.document_type_id == 1) {
            navigate('./certificate')
        } else if (document.document_type_id == 1) {
            navigate('./transcript')
        }
        return (
            <div>
                <Header />
                <Outlet />
            </div>
        )

    }
}

export default DocViewer

