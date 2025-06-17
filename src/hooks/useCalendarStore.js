import { useDispatch, useSelector } from "react-redux"
import { setActiveEvent, startNewEvent } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar);
    const onStartNewEvent = (event) => {
        dispatch(startNewEvent(event));
    }
    const onActiveEvent = (event) => {
        dispatch(setActiveEvent(event));
    }
    return {
        events,
        activeEvent,
        onStartNewEvent,
        onActiveEvent
    }
}