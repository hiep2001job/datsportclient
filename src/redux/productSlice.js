import { createSlice } from "@reduxjs/toolkit";
import { productActions } from "./productActions";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    success: false,
    error: null,
    dataProductByCategoryId: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productActions.getAll.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productActions.getAll.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(productActions.getAll.rejected, (state, { payload }) => {
        state.loading = true;
        state.error = payload;
      })
      // by category id
      .addCase(
        productActions.getProductByCategoryId.pending,
        (state, { payload }) => {
          state.loading = true;
          state.error = payload;
        }
      )
      .addCase(
        productActions.getProductByCategoryId.fulfilled,
        (state, { payload }) => {
          state.loading = true;
          state.error = payload;
          state.dataProductByCategoryId = payload;
        }
      )
      .addCase(
        productActions.getProductByCategoryId.rejected,
        (state, { payload }) => {
          state.loading = true;
          state.error = payload;
        }
      );
  },
});
export default productSlice.reducer;
