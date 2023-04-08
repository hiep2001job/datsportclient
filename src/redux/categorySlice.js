import { createSlice } from "@reduxjs/toolkit";
import { categoryActions } from "./categoryActions";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    loading: false,
    success: false,
    error: null,
    dataAllCategory: [],
    dataCategory: [],
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
      })

      .addCase(categoryActions.create.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(categoryActions.create.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        const prevDataAllCategory = state.dataAllCategory;
        state.dataAllCategory = [...prevDataAllCategory, payload];
      })
      .addCase(categoryActions.create.rejected, (state, { payload }) => {
        state.loading = true;
        state.error = payload;
      })

      .addCase(categoryActions.getSingle.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(categoryActions.getSingle.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        // const prevDataAllCategory = state.dataAllCategory;
        state.dataCategory = payload;
      })
      .addCase(categoryActions.getSingle.rejected, (state, { payload }) => {
        state.loading = true;
        state.error = payload;
      })

      .addCase(categoryActions.update.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(categoryActions.update.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;

        const prevDataAllCategory = state.dataAllCategory;
        const updatedUserList = prevDataAllCategory.map((category) => {
          if (category.categoryId === payload.categoryId) {
            return payload;
          } else {
            return category;
          }
        });

        // console.log("updatedUserList", updatedUserList);
        state.dataAllCategory = updatedUserList;
      })
      .addCase(categoryActions.update.rejected, (state, { payload }) => {
        state.loading = true;
        state.error = payload;
      });
  },
});

export const selectLoading = (state) => state.category.loading;
export const selectSuccess = (state) => state.category.success;
export const selectError = (state) => state.category.error;
export const selectDataCategory = (state) => state.category.dataCategory;

export default categorySlice.reducer;
