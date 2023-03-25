import { createSlice } from "@reduxjs/toolkit";
import { categoryActions } from "./categoryActions";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    loading: false,
    success: false,
    error: null,
    dataAllCategory: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(categoryActions.getAll.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(categoryActions.getAll.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.dataAllCategory = payload;
      })
      .addCase(categoryActions.getAll.rejected, (state, { payload }) => {
        state.loading = true;
        state.error = payload;
      });
  },
});
export default categorySlice.reducer;
