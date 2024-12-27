import { useDispatch } from "react-redux";
import { Artwork } from "../../type/type";
import { addPost } from "../../reducers/products/products-slice";
import ArtworkForm from "../../components/product-form/product-form";

const Form = () => {
  const dispatch = useDispatch();

  const handleAddArtwork = (newArtwork: Artwork) => {
    dispatch(addPost(newArtwork));
  };

  return (
    <div>
      <h1>Добавление нового Artwork</h1>
      <ArtworkForm onSubmit={handleAddArtwork} />
    </div>
  );
};

export default Form;
