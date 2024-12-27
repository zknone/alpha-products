import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { getImage } from "../../utils/common";
import DOMPurify from "dompurify";
import styles from "./product-details.module.css";

const ProductDetails = () => {
  const { productId } = useParams();

  const artwork = useSelector((state: RootState) => {
    const { artworks } = state.products;
    if (productId) {
      return artworks.filter((item) => item.id === parseInt(productId))[0];
    } else return null;
  });

  return (
    <>
      {artwork ? (
        <div className={styles.container}>
          <img
            width={400}
            src={getImage(artwork.imageId)}
            alt={artwork.thumbnail.altText}
          />
          <h2>{artwork.title}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(artwork.description),
            }}
          />
          <p>Дата создания: {artwork.dateDisplay || "Неизвестно"}</p>
          <p>Категории: {artwork.categoryTitles.join(", ") || "Не указаны"}</p>
          <p>
            Классификация:{" "}
            {artwork.classificationTitles.join(", ") || "Не указана"}
          </p>
        </div>
      ) : (
        <>
          <h2>Такая страница отсутствует</h2>
        </>
      )}
    </>
  );
};

export default ProductDetails;
