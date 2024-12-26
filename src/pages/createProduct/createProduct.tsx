import { useDispatch } from "react-redux";
import { Artwork } from "../../type/type";
import { addPost } from "../../reducers/products/productsSlice";
import ArtworkForm from "../../components/artworkForm/artworkForm";

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
