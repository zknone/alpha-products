import StarIcon from "../../assets/starIcon";
import { Artwork } from "../../type/type";
import { getImage, isFavorite, stripHtml } from "../../utils/common";
import style from "./product-item.module.css";

const ArtworkItem = ({
  handleNavigate,
  handleFavorites,
  handleDelete,
  favoriteArtworks,
  artwork,
}: {
  handleNavigate: (id: number) => void;
  handleFavorites: (id: number) => void;
  handleDelete: (id: number) => void;
  favoriteArtworks: number[];
  artwork: Artwork;
}) => {
  const cleanDescription = stripHtml(artwork.description || "");
  return (
    <li
      key={artwork.id}
      className={style.product_item}
      onClick={() => handleNavigate(artwork.id)}
    >
      <div className={style.product_actions}>
        <button
          className={style.product_btn}
          onClick={(e) => {
            e.stopPropagation();
            handleFavorites(artwork.id);
          }}
        >
          <StarIcon
            size={30}
            isFavorite={isFavorite(favoriteArtworks, artwork.id)}
          />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(artwork.id);
          }}
          className={style.product_btn}
        >
          Удалить
        </button>
      </div>
      <h3 className={style.product_title}>{artwork.title}</h3>
      <p className={style.product_artist}>
        {artwork.artistDisplay || "Автор не указан"}
      </p>
      <img
        src={getImage(artwork.imageId)}
        alt={artwork.thumbnail.altText}
        className={style.product_image}
      />
      <div className={style.product_description}>
        {cleanDescription || "No description provided"}
      </div>
    </li>
  );
};

export default ArtworkItem;
