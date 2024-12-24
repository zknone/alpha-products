import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../reducers/products/productsSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
