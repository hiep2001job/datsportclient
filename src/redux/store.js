import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import categoryReducer from "./categorySlice";
import brandReducer from "./brandSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
const store = configureStore({
  reducer: {
    auth: authReducer,
    // product: productReducer,
    // category: categoryReducer,
    // brand: brandReducer,
  },
});

setupListeners(store.dispatch);

export default store;
