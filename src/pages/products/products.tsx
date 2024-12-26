import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  toggleFavorites,
  deletePost,
  setFilter,
} from "../../reducers/products/productsSlice";
import fetchData from "../../utils/fetchData";
import { ProductsState, RawApiResponse } from "../../type/type";
import { adaptArtwork } from "../../utils/artworkAdapter";
import { RootState } from "../../store";
import DOMPurify from "dompurify";
import { Link, useNavigate } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const { isLoading, error, favoriteArtworks } = useSelector(
    (state: RootState): ProductsState => state.products
  );

  const filteredContent = useSelector((state: RootState) => {
    const { artworks, favoriteArtworks, filter } = state.products;
    switch (filter) {
      case "All":
        return artworks;
      case "Favorites":
        return artworks.filter((item) => favoriteArtworks.includes(item.id));
      default:
        return [];
    }
  });

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

  const isFavorited = (id: number) => {
    return favoriteArtworks.includes(id);
  };

  const handleFavorites = (id: number) => {
    dispatch(toggleFavorites(id));
  };

  const handleDelete = (id: number) => {
    dispatch(deletePost(id));
  };

  const handleFiltered = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const isFavoritesEmpty = (favorites: number[]) => {
    return favorites.length === 0;
  };

  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    navigate(`/products/${id}`);
  };

  console.log(filteredContent);
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        <li>
          <Link to={"/create-product"}>Add new one</Link>
        </li>
      </ul>
      <ul>
        <li>
          <button onClick={handleFiltered} value={"All"}>
            All
          </button>
        </li>
        <li>
          <button
            disabled={isFavoritesEmpty(favoriteArtworks)}
            onClick={handleFiltered}
            value={"Favorites"}
          >
            Favorites
          </button>
        </li>
      </ul>

      <ul>
        {filteredContent.map((item) => (
          <li key={item.id} onClick={() => handleNavigate(item.id)}>
            <span>{item.id}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFavorites(item.id);
              }}
            >
              {isFavorited(item.id) ? "Убрать из избранного" : "В избранное"}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(item.id);
              }}
            >
              Удалить
            </button>
            <span> {item.title}</span>
            <span> {item.artistDisplay}</span>
            <img
              src={`https://www.artic.edu/iiif/2/${item.imageId}/full/400,/0/default.jpg`}
            />
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(item.description),
              }}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Products;
