import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProductsApi,
  addToCartApi,
  updateCartItemQuantityApi,
  deleteCartItemApi,
  checkoutApi,
} from "../api/bill";

export const fetchProducts = createAsyncThunk(
  "cart/fetchProducts",
  async () => {
    const response = await fetchProductsApi();
    return response;
  }
);

export const addToCart = createAsyncThunk("cart/addToCart", async (payload) => {
  const response = await addToCartApi(payload);
  return response;
});

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ itemId, quantity }) => {
    const response = await updateCartItemQuantityApi({ itemId, quantity });
    return response;
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (payload) => {
    const response = await deleteCartItemApi(payload);
    return response;
  }
);

// Checkout model
// {bill_id,
//   user_id,
//   bill_total,
//   bill_payment,
//   bill_address_ship,
//   bill_date,
//   bill_status}
export const checkout = createAsyncThunk("cart/checkout", async (payload) => {
  const response = await checkoutApi(payload);
  return response;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    cartItems: [],
    status: "idle",
    error: null,
    billTotal: 0,
  },
  reducers: {},
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.status = "loading";
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.cartItems = [...action.payload];
      state.status = "succeeded";
      state.products = action.payload;
      if (state.cartItems.length)
        state.billTotal = state.cartItems.reduce(
          (acc, product) =>
            acc + product.billdetailPrice * product.billdetailQuantity,
          0
        );
    },
    [fetchProducts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addToCart.pending]: (state) => {
      state.status = "loading";
    },
    [addToCart.fulfilled]: (state, action) => {
      state.status = "succeeded";
      if (
        !state.cartItems.some(
          (item) =>
            item.billdetailSize == action.payload.billdetailSize &&
            item.billdetailId == action.payload.billdetailId
        )
      ){
        state.cartItems.push(action.payload);
      }       

      if (state.cartItems.length)
        state.billTotal = state.cartItems.reduce(
          (acc, product) =>
            acc + product.billdetailPrice * product.billdetailQuantity,
          0
        );
    },
    [addToCart.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [updateCartItemQuantity.pending]: (state) => {
      state.status = "loading";
    },
    [updateCartItemQuantity.fulfilled]: (state, action) => {
      state.status = "succeeded";
      const { itemId, quantity } = action.payload;
      if (state.cartItems.length)
        state.billTotal = state.cartItems.reduce(
          (acc, product) =>
            acc + product.billdetailPrice * product.billdetailQuantity,
          0
        );
    },
    [updateCartItemQuantity.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [deleteCartItem.pending]: (state) => {
      state.status = "loading";
    },
    [deleteCartItem.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.cartItems = [...action.payload];
      state.billTotal = state.cartItems.reduce(
        (acc, product) =>
          acc + product.billdetailPrice * product.billdetailQuantity,
        0
      );
    },
    [deleteCartItem.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [checkout.pending]: (state) => {
      state.status = "loading";
    },
    [checkout.fulfilled]: (state, action) => {
      state.status = "succeeded";
      console.log(action.payload);
    },
    [checkout.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default cartSlice.reducer;
