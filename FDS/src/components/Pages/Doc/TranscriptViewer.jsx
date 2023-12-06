import React from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useParams } from 'react-router-dom';

function TranscriptViewer(props) {
    const params = useParams()
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const pdfUrl = `/pdf_output/transcript_${params.orderId}.pdf`
    return (
        <div>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker">
                <Viewer
                    fileUrl={pdfUrl}
                    plugins={[
                        // Register plugins
                        defaultLayoutPluginInstance,
                    ]}
                />
            </Worker>
        </div>
    )
}

export default TranscriptViewer

