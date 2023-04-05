import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import toastReducer from "./toastSlice";
import productReducer from "./productSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
    toast: toastReducer,
    // category: categoryReducer,
    // brand: brandReducer,
  },
});

setupListeners(store.dispatch);

export default store;
