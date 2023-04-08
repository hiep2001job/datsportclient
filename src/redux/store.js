import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import toastReducer from "./toastSlice";
import productReducer from "./productSlice";
import modalReducer from "./modalSlice";
import categoryReducer from "./categorySlice";
import brandReducer from "./brandSlice";
import sliderReducer from "./sliderSlice";


import { setupListeners } from "@reduxjs/toolkit/dist/query";
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
    modal: modalReducer,
    category: categoryReducer,
    brand: brandReducer,
    slider: sliderReducer,
    toast: toastReducer,
  },
});

setupListeners(store.dispatch);

export default store;
