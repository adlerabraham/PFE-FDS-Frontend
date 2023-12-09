import React from 'react'
import './TrancriptHeader.scss'

function TranscriptHeader(props) {
    return (
        <div className="transcript-header">
            <div className="first-row">
                <h6>{props.courseName.toUpperCase()}</h6>
            </div>
            <div className="second-row">
                <div className="left">
                    <p>{props.level}</p>
                </div>
                <div className="right">
                    <p>{props.period}</p>
                </div>
            </div>
        </div>
    )
}

export default TranscriptHeader

