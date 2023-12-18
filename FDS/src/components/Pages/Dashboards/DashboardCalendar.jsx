import React, { useEffect, useRef } from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
//import momentTimezonePlugin from '@fullcalendar/moment-timezone';
//import frLocale from '@fullcalendar/core/locales/fr';
import axios from 'axios';
import { useParams } from 'react-router-dom';
//import { DateTime } from 'luxon';

function DashboardCalendar(props) {
    const calendarRef = useRef(null);
    const token = localStorage.getItem('accessToken')

    const handleMonthChange = () => {
        // Accéder à la propriété view pour obtenir des informations sur la vue actuelle
        const currentView = calendarRef.current.getApi().view;
        console.log('Mois actuel :', currentView.title); // Affiche le titre du mois actuel
    };
    const events = [
        {
            title: 'Event 1',
            start: '2023-12-01',
            backgroundColor: 'red',
        },
        {
            title: 'Event 2',
            start: '2023-12-05',
            end: '2023-12-07',
        },
        // Add more events as needed
    ];

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
            } catch (error) {
                console.log(error);
            }
        }
    }


    useEffect(() => {
        getEvents('2023-06-01', '2023-06-30')
        const calendarApi = calendarRef.current.getApi();

        const onViewRender = (info) => {
            const startDate = info.view.activeStart;
            const endDate = info.view.activeEnd;
            console.log('Date de début du mois :', startDate);
            console.log('Date de fin du mois :', endDate);
            // Vous pouvez maintenant utiliser startDate et endDate comme bon vous semble
        };

        calendarApi.on('datesSet', onViewRender);

        return () => {
            calendarApi.off('datesSet', onViewRender);
        };
    }, []);

    const handleEventClick = (eventInfo) => {
        console.log('Event clicked:', eventInfo.event);
    };

    // useEffect(() => {
    //     const calendarApi = calendarRef.current.getApi();

    //     // Ajouter un écouteur pour l'événement datesSet
    //     const handleDatesSet = () => {
    //         handleMonthChange();
    //     };

    //     calendarApi.on('datesSet', handleDatesSet);

    //     // Retirer l'écouteur lors du démontage du composant
    //     return () => {
    //         calendarApi.off('datesSet', handleDatesSet);
    //     };
    // }, []); // L'effet s'exécute une seule fois après le montage

    return (
        <div>
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                // locale={frLocale}
                weekends={true}
                events={events}
                height={450}
                eventClick={handleEventClick}
            />
        </div>
    )
}

export default DashboardCalendar