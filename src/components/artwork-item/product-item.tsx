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
      <div className={style.product_actions}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleFavorites(artwork.id);
          }}
          className={`${style.product_favorite_btn} ${
            isFavorite(favoriteArtworks, artwork.id) ? `${style.favorite}` : ""
          }`}
        >
          {isFavorite(favoriteArtworks, artwork.id)
            ? "Убрать из избранного"
            : "В избранное"}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(artwork.id);
          }}
          className={style.product_delete_btn}
        >
          Удалить
        </button>
      </div>
    </li>
  );
};

export default ArtworkItem;
