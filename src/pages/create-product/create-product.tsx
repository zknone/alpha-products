import { useDispatch } from "react-redux";
import { Product } from "../../type/type";
import { addPost } from "../../reducers/products/products-slice";
import ArtworkForm from "../../components/product-form/product-form";
import styles from "./create-products.module.css";

const Form = () => {
  const dispatch = useDispatch();

  const handleAddArtwork = (newArtwork: Product) => {
    dispatch(addPost(newArtwork));
  };

  return (
    <div className={styles.create_product_container}>
      <h1>Add new artwork</h1>
      <ArtworkForm onSubmit={handleAddArtwork} />
    </div>
  );
};

export default Form;
