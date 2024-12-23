import { useEffect, useState } from "react";
import fetchData from "../../utils/fetchData";
import { FetchedIdsType, Photograph } from "../../type/type";

const Products = () => {
  const [photos, setPhotos] = useState<Photograph[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchData<FetchedIdsType>(
          "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&artistOrCulture=true&q=french"
        );

        const objectIDs = data?.objectIDs.slice(0, 50) || [];

        const productPromises = objectIDs.map((id) =>
          fetchData<Photograph>(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
          )
        );

        const resolvedPhotos: Photograph[] = await Promise.all(productPromises);
        setPhotos(resolvedPhotos);
      } catch (error) {
        setError(`Failed fetching products: ${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {photos.map(
          (item) =>
            item.primaryImageSmall && (
              <li key={item?.objectID}>
                <img
                  width={300}
                  height={300}
                  src={item.primaryImageSmall}
                ></img>
                <span>{item?.artistDisplayName || "Untitled author"}</span>
              </li>
            )
        )}
      </ul>
    </>
  );
};

export default Products;
