import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    message: '',
    type: null,
  },
  reducers: {
    showAlert(state, action) {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideAlert(state) {
      state.message = '';
      state.type = null;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;