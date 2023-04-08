import { createSlice } from "@reduxjs/toolkit";
import { brandActions } from "./brandActions";

const brandSlice = createSlice({
  name: "brand",
  initialState: {
    loading: false,
    success: false,
    error: null,
    dataAllBrand: [],
    dataBrand: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(brandActions.getAll.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(brandActions.getAll.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        console.log("dataAllBrand: ", payload)
        state.dataAllBrand = payload;
      })
      .addCase(brandActions.getAll.rejected, (state, { payload }) => {
        state.loading = true;
        state.error = payload;
      })

      .addCase(brandActions.create.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(brandActions.create.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        const prevDataAllBrand = state.dataAllBrand;
        state.dataAllBrand = [...prevDataAllBrand, payload];
      })
      .addCase(brandActions.create.rejected, (state, { payload }) => {
        state.loading = true;
        state.error = payload;
      })

      .addCase(brandActions.getSingle.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(brandActions.getSingle.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        // const prevDataAllBrand = state.dataAllBrand;
        state.dataBrand = payload;
      })
      .addCase(brandActions.getSingle.rejected, (state, { payload }) => {
        state.loading = true;
        state.error = payload;
      })

      .addCase(brandActions.update.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(brandActions.update.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;

        const prevDataAllBrand = state.dataAllBrand;
        const updatedUserList = prevDataAllBrand.map((brand) => {
          if (brand.brand_id === payload.brand_id) {
            return payload;
          } else {
            return brand;
          }
        });

        state.dataAllBrand = updatedUserList;
      })
      .addCase(brandActions.update.rejected, (state, { payload }) => {
        state.loading = true;
        state.error = payload;
      });
  },
});

export const selectLoading = (state) => state.brand.loading;
export const selectSuccess = (state) => state.brand.success;
export const selectError = (state) => state.brand.error;
export const selectDataBrand = (state) => state.brand.dataBrand;

export default brandSlice.reducer;
