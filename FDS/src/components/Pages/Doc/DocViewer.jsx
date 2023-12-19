import React from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import Header from '../../Header/Header'
import { useGetOrderedDocumentQuery } from '../../../api/ApiEndpoints'


function DocViewer(props) {
    const params = useParams()
    const navigate = useNavigate()

    const { data: document, isLoading, isError } = useGetOrderedDocumentQuery({ orderID: params.orderId })

    if (!(isLoading || isError)) {

        if (document.document_type_id == 1) {
            navigate('./certificate')
        } else if (document.document_type_id == 4) {
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

