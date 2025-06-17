import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns';
const tempEvents = [
  {
    title: "Reunión",
    //date: "2025-06-17",
    start: "2025-06-17T00:00:00",
    end: "2025-06-19T00:00:00",
    extendedProps: {
      user: "BioChemistry",
    },
  },
  {
    title: "Cumpleaños del jefe",
    start: "2025-06-17T00:00:00",
    extendedProps: {
      user: "BioChemistry",
    },
  },
];
export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: tempEvents,
    activeEvent: null
  },
  reducers: {
    startNewEvent: (state, {payload}) => {
      state.events = [payload, ...state.events];
    },
    setActiveEvent: (state, {payload}) => {
      state.activeEvent = payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { startNewEvent, setActiveEvent } = calendarSlice.actions

export default calendarSlice;