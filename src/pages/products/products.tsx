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

        setIds(data?.objectIDs.slice(0, 100));
        console.log(ids);
      } catch (error) {
        throw new Error(`Failed fetching products: ${error}`);
      } finally {
        console.log("done");
      }
    };
    fetchProducts();
  }, []);

  console.log(ids);

  return (
    <ul>
      {ids.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

export default Products;
