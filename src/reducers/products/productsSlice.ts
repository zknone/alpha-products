import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductsState, Artwork } from "../../type/type";

const initialState: ProductsState = {
  photos: [],
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProductsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchProductsSuccess(state, action: PayloadAction<Artwork[]>) {
      state.isLoading = false;
      state.photos = action.payload;
    },
    fetchProductsFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} = productsSlice.actions;

export default productsSlice.reducer;
