import React from 'react'
import './Event.scss'

function Event(props) {
    const publicationDate = props.publication.split("T")[0]
    return (
        <div className='event-container'>
            <div className="event-header">
                <h6>Examen {props.name == 1 ? "partiel" : "final"}</h6>
                <p className='released-date'> Publié le {publicationDate}</p>
            </div>
            <div className='event-body'>
                <div>
                    <p className='label'>Date de l'examen : </p>
                    <p> {props.date}</p>
                </div>
                <div>
                    <p className='label'>Heure de début : </p>
                    <p> {props.time}</p>
                </div>
                <div>
                    <p className='label'>Durée : </p>
                    <p> {props.duration}</p>
                </div>
                <div>
                    <p className='label'>Salle : </p>
                    <p> {props.room}</p>
                </div>
            </div>
        </div>
    )
}

export default Event

