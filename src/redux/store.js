import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
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
