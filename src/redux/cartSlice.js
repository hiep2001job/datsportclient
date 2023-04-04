import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProductsApi,
  addToCartApi,
  updateCartItemQuantityApi,
  deleteCartItemApi,
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
  async (itemId) => {
    const response = await deleteCartItemApi(itemId);
    return response;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    cartItems: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.status = "loading";
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload;
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
      const itemExists = state.cartItems.some(
        (item) => item.product.productId === action.payload.product.productId && item.billdetailSize === action.payload.billdetailSize
      );
      if (!itemExists) {
        state.cartItems.push(action.payload);
      }else{
        console.log("Item existed");
      }
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
      const itemIndex = state.cartItems.findIndex((item) => item.id === itemId);
      state.cartItems[itemIndex].quantity = quantity;
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
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    [deleteCartItem.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default cartSlice.reducer;
