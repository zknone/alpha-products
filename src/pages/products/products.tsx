import { useEffect, useState } from "react";
import fetchData from "../../utils/fetchData";
import { FetchedIdsType } from "../../type/type";

const Products = () => {
  const [ids, setIds] = useState<string[]>([]);

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchData<FetchedIdsType>(
          "https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=19?hasImages=true"
        );

        const objectIDs = data?.objectIDs.slice(0, 100) || [];

        setIds(objectIDs);

        const productPromises = objectIDs.map((id) =>
          fetchData<FetchedIdsType>(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
          )
        );

        const resolvedPhotos = await Promise.all(productPromises);
        setPhotos(resolvedPhotos);
      } catch (error) {
        throw new Error(`Failed fetching products: ${error}`);
      } finally {
        console.log("done");
      }
    };
    fetchProducts();
  }, []);

  console.log(photos);

  return (
    <ul>
      {ids.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

export default Products;
