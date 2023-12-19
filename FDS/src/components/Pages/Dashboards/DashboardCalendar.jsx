import React, { useEffect, useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import { toMoment } from '@fullcalendar/moment';
import frLocale from '@fullcalendar/core/locales/fr';
import axios from 'axios';
import { useParams } from 'react-router-dom';
//import { DateTime } from 'luxon';

function DashboardCalendar(props) {
    const calendarRef = useRef(null);
    const token = localStorage.getItem('accessToken')
    const [occurrences, setOccurrences] = useState([])

    const handleMonthChange = () => {
        // Accéder à la propriété view pour obtenir des informations sur la vue actuelle
        const currentView = calendarRef.current.getApi().view;
        console.log('Mois actuel :', currentView.title); // Affiche le titre du mois actuel
    };
    const events = [];

    const getEvents = async (startDate, endDate) => {
        if (token) {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/fdscalendar/event/occurrence/?start_datetime=" + startDate +
                    "&end_datetime=" + endDate, {
                    headers: {
                        //Accept: 'application/pdf',
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data);
                const events = [];
                response.data.occurrences.map((occurrence) => (
                    events.push({
                        title: occurrence.event,
                        start: occurrence.occurrence,
                        backgroundColor: 'red',
                    })
                ))

                setOccurrences(events)
                console.log('occ', occurrences);
                console.log('events', events);
            } catch (error) {
                console.log(error);
            }
        }
    }


    useEffect(() => {
        // getEvents('2023-06-01', '2023-06-30')
        const calendarApi = calendarRef.current.getApi();


        const onViewRender = (info) => {
            const startDate = info.view.activeStart.toISOString().split('T')[0];
            const endDate = info.view.activeEnd.toISOString().split('T')[0];
            // console.log('Date de début du mois :', startDate);
            // console.log('Date de fin du mois :', endDate);
            getEvents(startDate, endDate)
            // setOccurrences(events)
            // console.log('occ', occurrences);
        };

        calendarApi.on('datesSet', onViewRender);

        return () => {
            calendarApi.off('datesSet', onViewRender);
        };
    }, []);

    const handleEventClick = (eventInfo) => {
        console.log('Event clicked:', eventInfo.event);
    };

    return (
        <div>
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, momentTimezonePlugin]}
                timeZone='America/New_York'
                initialView="dayGridMonth"
                locale={frLocale}
                weekends={true}
                events={occurrences}
                height={450}
                eventClick={handleEventClick}
            />
        </div>
    )
}

export default DashboardCalendar