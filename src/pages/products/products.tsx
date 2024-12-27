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
import { useProductHandlers } from "../../utils/productHandlers";
import usePaginationHandlers from "../../utils/paginationHandler";
import ArtworkItem from "../../components/product-item/product-item";
import style from "./products.module.css";
import ProductsMenu from "../../components/products-menu/products-menu";
import ProductPagination from "../../components/product-pagination/product-pagination";

const Products = () => {
  const dispatch = useDispatch();
  const { isLoading, error, favoriteArtworks, artworks, filter } = useSelector(
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
      if (artworks && artworks.length > 0) return;
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
  }, [artworks, dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [setCurrentPage, filteredContent]);

  if (isLoading) return <p>Loading...</p>;

  console.log(favoriteArtworks);

  return (
    <div className={style.products_container}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ProductsMenu
        handleFiltered={handleFiltered}
        favoriteArtworks={favoriteArtworks}
        filter={filter}
      />
      <ProductPagination
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        totalPages={totalPages}
        currentPage={currentPage}
      />
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
