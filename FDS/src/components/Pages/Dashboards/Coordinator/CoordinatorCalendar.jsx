import React from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
//import '@fullcalendar/react/main.css';
//import '@fullcalendar/daygrid/main.css';

function CoordinatorCalendar(props) {
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

    const handleEventClick = (eventInfo) => {
        console.log('Event clicked:', eventInfo.event);
    };
    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                events={events}
                height={450}
                eventClick={handleEventClick}
            />
        </div>
    )
}

export default CoordinatorCalendar

