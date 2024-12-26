import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductsState, Artwork } from "../../type/type";

const initialState: ProductsState = {
  artworks: [],
  favoriteArtworks: [],
  isLoading: false,
  error: null,
  filter: "All",
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
      state.artworks = action.payload;
    },
    fetchProductsFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    toggleFavorites(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (!state.favoriteArtworks.includes(id)) {
        state.favoriteArtworks.push(id);
      } else {
        state.favoriteArtworks = [
          ...state.favoriteArtworks.filter((item) => item !== id),
        ];
      }
    },
    deletePost(state, action: PayloadAction<number>) {
      const id = action.payload;

      state.artworks = [...state.artworks.filter((item) => item.id !== id)];
    },
    addPost(state, action: PayloadAction<Artwork>) {
      const newArtWork = action.payload;
      state.artworks = [...state.artworks, newArtWork];
    },
    setFilter(state, action: PayloadAction<"All" | "Favorites">) {
      const filter = action.payload;
      if (state.filter !== filter) {
        state.filter = filter;
      }
    },
  },
});

export const {
  toggleFavorites,
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  deletePost,
  setFilter,
  addPost,
} = productsSlice.actions;

export default productsSlice.reducer;
