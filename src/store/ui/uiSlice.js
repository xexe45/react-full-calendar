import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isDateModalOpen: false,
    startAt: null
  },
  reducers: {
    onOpenDateModal: (state, {payload}) => {
        state.isDateModalOpen = true;
    },
    onCloseDateModal: (state) => {
        state.isDateModalOpen = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions

export default uiSlice;