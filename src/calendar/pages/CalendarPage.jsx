import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from '@fullcalendar/core/locales/es';
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { addHours } from "date-fns";
import { NavbarPage } from "../components/Navbar";
const headerToolbar = {
  left: "prev,next",
  center: "title",
  right: "dayGridMonth,timeGridWeek,timeGridDay", // user can switch between the two
};
export const CalendarPage = () => {

const handleDateClick = (arg) => {
     alert(arg.dateStr);
}
  return (
    <>
      <NavbarPage />
      <main className="container-fluid mb-4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={headerToolbar}
          locale={esLocale}
          dateClick={handleDateClick}
          events={[
            {
              title: "Reunión",
              start: new Date(),
              end: addHours(new Date(), 2),
            },
            { title: "Cumpleaños del jefe", date: "2025-06-17" },
          ]}
        />
      </main>
    </>
  );
};
