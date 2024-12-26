import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductsState, Artwork } from "../../type/type";

const initialState: ProductsState = {
  artworks: JSON.parse(localStorage.getItem("artworks") || "[]"),
  isLoading: false,
  error: null,
  favoriteArtworks: JSON.parse(
    localStorage.getItem("favoriteArtworks") || "[]"
  ),
  filter: (localStorage.getItem("filter") as "All" | "Favorites") || "All",
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
      localStorage.setItem("artworks", JSON.stringify(state.artworks));
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
      localStorage.setItem(
        "favoriteArtworks",
        JSON.stringify(state.favoriteArtworks)
      );
    },
    deletePost(state, action: PayloadAction<number>) {
      const id = action.payload;

      state.artworks = [...state.artworks.filter((item) => item.id !== id)];
    },
    addPost(state, action: PayloadAction<Artwork>) {
      const newArtWork = action.payload;
      state.artworks = [...state.artworks, newArtWork];
      localStorage.setItem("artworks", JSON.stringify(state.artworks));
    },
    setFilter(state, action: PayloadAction<"All" | "Favorites">) {
      const filter = action.payload;
      if (state.filter !== filter) {
        state.filter = filter;
      }
      localStorage.setItem("artworks", JSON.stringify(state.artworks));
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
