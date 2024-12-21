import { useEffect } from "react";
import fetchData from "../../utils/fetchData";

const Products = () => {
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchData(
          "https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=1"
        );
        console.log(data);
      } catch (error) {
        throw new Error(`Failed fetching products: ${error}`);
      } finally {
        console.log("done");
      }
    };
    fetchProducts();
  }, []);
  return <>124</>;
};

export default Products;
