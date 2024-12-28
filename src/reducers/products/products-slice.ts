import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductsState, Product, FilterCategory } from "../../type/type";
import { RootState } from "../../store";

const initialState: ProductsState = {
  artworks: JSON.parse(localStorage.getItem("artworks") || "[]"),
  isLoading: false,
  error: null,
  favoriteArtworks: JSON.parse(
    localStorage.getItem("favoriteArtworks") || "[]"
  ),
  filter: (localStorage.getItem("filter") as FilterCategory) || "All",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProductsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchProductsSuccess(state, action: PayloadAction<Product[]>) {
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
    addPost(state, action: PayloadAction<Product>) {
      const newArtWork = action.payload;
      state.artworks = [...state.artworks, newArtWork];
      localStorage.setItem("artworks", JSON.stringify(state.artworks));
    },
    setFilter(state, action: PayloadAction<FilterCategory>) {
      const filter = action.payload;
      if (state.filter !== filter) {
        state.filter = filter;
      }
      localStorage.setItem("filter", filter);
    },
  },
});

export const selectFilteredArtworks = (state: RootState) => {
  const { artworks, favoriteArtworks, filter } = state.products;
  switch (filter) {
    case "All":
      return artworks;
    case "Favorites":
      return artworks.filter((item) => favoriteArtworks.includes(item.id));
    default:
      return [];
  }
};

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
