import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { NavbarPage } from "../components/Navbar";
import { CalendarEvent } from "../components/CalendarEvent";
import { useState } from "react";
import { CalendarModal } from "../components/CalendarModal";


import { useCalendarStore, useUiStore } from "../../hooks";
const headerToolbar = {
  left: "prev,next",
  center: "title",
  right: "dayGridMonth,timeGridWeek,timeGridDay", // user can switch between the two
};
const lastViewStorage = localStorage.getItem("lastView") || "dayGridMonth";
export const CalendarPage = () => {
  const {events, onActiveEvent} = useCalendarStore();
  const { openDateModal } = useUiStore();

  const [lastView, setLastView] = useState(lastViewStorage);
  const handleDateClick = (arg) => {
    console.log(arg)
    const active =  {
      title: '',
      //date: "2025-06-17",
      start:arg.dateStr.includes("T") ? arg.dateStr : `${arg.dateStr}T00:00:00`,
      end: '',
      extendedProps: {}
    };
    console.log(active);
    onActiveEvent(active);
    openDateModal(
      //arg.dateStr.includes("T") ? arg.dateStr : `${arg.dateStr}T00:00:00`
    );
  }
    
    
  const renderEventContent = (eventInfo) => {
    return <CalendarEvent eventInfo={eventInfo} />;
  };

  const eventDidMount = (info) => {
    console.log(info.event.extendedProps);
    // {description: "Lecture", department: "BioChemistry"}
  };

  const viewDidMount = (info) => {
    console.log(info);
    const {
      el,
      view: { type },
    } = info;
    localStorage.setItem("lastView", type);
    // {description: "Lecture", department: "BioChemistry"}
  };

  const handleEventClick = (info) => {
    console.log(info)
    const {event: {title, extendedProps, startStr, endStr}} = info;
    const active =  {
      title,
      //date: "2025-06-17",
      start: startStr,
      end: endStr,
      extendedProps
    };
    console.log(active);
    onActiveEvent(active);
    openDateModal();

  };
  return (
    <>
      <NavbarPage />
      <main className="container-fluid mb-4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={lastView}
          headerToolbar={headerToolbar}
          locale={esLocale}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
          viewDidMount={viewDidMount}
          events={events}
        />
        <CalendarModal />
      </main>
    </>
  );
};
