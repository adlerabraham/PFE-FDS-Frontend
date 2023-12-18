import React from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function StudentCalendar(props) {
    const events = [
        {
            title: 'Event 1',
            start: '2023-12-01',
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
                eventClick={handleEventClick}
            />
        </div>
    )
}

export default StudentCalendar

