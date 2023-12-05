import React from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useParams } from 'react-router-dom';

function TranscriptViewer(props) {
    const params = useParams()
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    return (
        <div>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker">
                <Viewer
                    fileUrl="/pdf_output/certificate_21.pdf"
                    // fileUrl="C:\Users\Adler Abraham\Desktop\Robot restaurateur_devoir#1.pdf"
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

