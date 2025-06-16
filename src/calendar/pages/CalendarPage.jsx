import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import { NavbarPage } from "../components/Navbar";

export const CalendarPage = () => {
    return(
        <>
            <NavbarPage />
            <main className='container-fluid mb-4'>
                 <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin ]}
                initialView="dayGridMonth"
                headerToolbar={
                    {
                        left: 'prev,next',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay' // user can switch between the two
                    }
                }
                events={[
                    { title: 'Reunión', start: '2025-06-16T10:28:00', end: '2025-06-16T12:28:00' },
                    { title: 'Cumpleaños del jefe', date: '2025-06-17' }
                ]}
                />
            </main>
        </>
    )
}