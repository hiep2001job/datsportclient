import { createSlice } from "@reduxjs/toolkit";
import { productActions } from "./productActions";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    success: false,
    error: null,
    dataAllProducts: [],
    dataProduct: [],
    totalPages: 0,
    lastPage: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productActions.getAll.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productActions.getAll.fulfilled, (state, { payload }) => {
        state.dataAllProducts = payload.content;
        state.totalPages = payload.totalPages;
        state.lastPage = payload.last;
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(productActions.getAll.rejected, (state, { payload }) => {
        state.loading = true;
        state.error = payload;
      })

      .addCase(productActions.create.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productActions.create.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.dataAllProducts.push(payload);
      })
      .addCase(productActions.create.rejected, (state, { payload }) => {
        state.loading = true;
        state.error = payload;
      })

      .addCase(productActions.getSingle.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productActions.getSingle.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.dataProduct = payload;
      })
      .addCase(productActions.getSingle.rejected, (state, { payload }) => {
        state.loading = true;
        state.error = payload;
      })

      .addCase(productActions.update.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productActions.update.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;

        const prevDataAllProduct = state.dataAllProducts;

        const updatedProductList = prevDataAllProduct.map((product) => {
          if (product.productId === payload.productId) {
            return payload;
          } else {
            return product;
          }
        });

        state.dataAllProducts = updatedProductList;
      })
      .addCase(productActions.update.rejected, (state, { payload }) => {
        state.loading = true;
        state.error = payload;
      });
  },
});

export const selectLoading = (state) => state.product.loading;
export const selectSuccess = (state) => state.product.success;
export const selectError = (state) => state.product.error;
export const selectDataAllProduct = (state) => state.product.dataAllProducts;
export const selectDataProduct = (state) => state.product.dataProduct;

export const selectTotalPages = (state) => state.product.totalPages;
export const selectLastPage = (state) => state.product.lastPage;

export default productSlice.reducer;
