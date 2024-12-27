import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  selectFilteredArtworks,
} from "../../reducers/products/products-slice";
import fetchData from "../../utils/fetch-data";
import { ProductsState, RawApiResponse } from "../../type/type";
import { adaptArtwork } from "../../utils/artworkAdapter";
import { RootState } from "../../store";

import { Link } from "react-router-dom";
import { isFavoritesEmpty } from "../../utils/common";
import { useProductHandlers } from "../../utils/productHandlers";
import usePaginationHandlers from "../../utils/paginationHandler";
import ArtworkItem from "../../components/artwork-item/product-item";
import style from "./products.module.css";

const Products = () => {
  const dispatch = useDispatch();
  const { isLoading, error, favoriteArtworks } = useSelector(
    (state: RootState): ProductsState => state.products
  );
  const { handleFavorites, handleDelete, handleFiltered, handleNavigate } =
    useProductHandlers();

  const filteredContent = useSelector(selectFilteredArtworks);

  const {
    setCurrentPage,
    currentPage,
    totalPages,
    paginatedItems,
    handlePrevPage,
    handleNextPage,
  } = usePaginationHandlers(filteredContent, 10);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(fetchProductsStart());
      try {
        const data = await fetchData<RawApiResponse>(
          "https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,date_display,main_reference_number,image_id,category_titles,classification_titles,thumbnail,description&limit=100"
        );

        const transformedData = data.data.map(adaptArtwork);
        dispatch(fetchProductsSuccess(transformedData));
      } catch (error) {
        dispatch(fetchProductsFailure(`Failed fetching products: ${error}`));
      }
    };
    fetchProducts();
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [setCurrentPage, filteredContent]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={style.products_container}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        <li>
          <Link to={"/create-product"}>Add new one</Link>
        </li>
      </ul>
      <ul>
        <li>
          <button onClick={() => handleFiltered("All")}>All</button>
        </li>
        <li>
          <button
            disabled={isFavoritesEmpty(favoriteArtworks)}
            onClick={() => handleFiltered("Favorites")}
          >
            Favorites
          </button>
        </li>
      </ul>

      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Назад
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Вперед
        </button>
      </div>

      <ul className={style.products_list}>
        {paginatedItems.map((item) => (
          <ArtworkItem
            artwork={item}
            handleDelete={handleDelete}
            handleNavigate={handleNavigate}
            handleFavorites={handleFavorites}
            favoriteArtworks={favoriteArtworks}
          />
        ))}
      </ul>
    </div>
  );
};

export default Products;
