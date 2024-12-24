import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "../../reducers/products/productsSlice";
import fetchData from "../../utils/fetchData";
import { ProductsState, RawApiResponse } from "../../type/type";
import { adaptArtwork } from "../../utils/artworkAdapter";
import { RootState } from "../../store";
import DOMPurify from "dompurify";

const Products = () => {
  const dispatch = useDispatch();
  const { photos, isLoading, error } = useSelector(
    (state: RootState): ProductsState => state.products
  );

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

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ol>
        {photos.map((item) => (
          <li key={item.id}>
            <button>В избранное</button>
            <button>Удалить</button>
            <span> {item.title}</span>
            <span> {item.artistDisplay}</span>
            <img
              src={`https://www.artic.edu/iiif/2/${item.imageId}/full/400,/0/default.jpg`}
            ></img>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(item.description),
              }}
            />
          </li>
        ))}
      </ol>
    </>
  );
};

export default Products;
