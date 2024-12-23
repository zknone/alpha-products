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
          "https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=11&q=france"
        );

        const objectIDs = data?.objectIDs.slice(0, 100) || [];

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
      <ol>
        {photos.map(
          (item) =>
            item.primaryImageSmall && (
              <li key={item?.objectID}>
                <img
                  width={300}
                  height={300}
                  src={item.primaryImageSmall}
                ></img>
                <span>{item?.artistDisplayName}</span>
                <span>{item?.objectName}</span>
                <span>{item?.objectDate}</span>
                <span>{item?.culture}</span>
              </li>
            )
        )}
      </ol>
    </>
  );
};

export default Products;
