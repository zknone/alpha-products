import { useEffect, useState } from "react";
import fetchData from "../../utils/fetchData";
import { Artwork, RawApiResponse } from "../../type/type";
import { adaptArtwork } from "../../utils/artworkAdapter";

const Products = () => {
  const [photos, setPhotos] = useState<Artwork[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchData<RawApiResponse>(
          "https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,date_display,main_reference_number,image_id,category_titles,classification_titles,thumbnail,description&limit=100"
        );

        const transformedData = data.data.map(adaptArtwork);
        setPhotos(transformedData);
      } catch (error) {
        setError(`Failed fetching products: ${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  console.log(photos);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ol></ol>
    </>
  );
};

export default Products;
