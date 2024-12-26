import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";

const ProductDetails = () => {
  const { productId } = useParams();

  const artwork = useSelector((state: RootState) => {
    const { artworks } = state.products;
    if (productId) {
      return artworks.filter((item) => item.id === parseInt(productId))[0];
    } else return null;
  });

  return (
    <div>
      <h1>Product Details</h1>
      <p>Product ID: {productId}</p>
      {artwork && <p>{artwork.title}</p>}
    </div>
  );
};

export default ProductDetails;
