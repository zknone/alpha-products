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
        <div className={styles.product_details_container}>
          <img
            className={styles.product_details_image}
            src={getImage(artwork.imageId, 700)}
            alt={artwork.thumbnail.altText}
          />
          <title className={styles.product_details_title}>
            {artwork.title}
          </title>
          <div
            className={styles.product_details_description}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(artwork.description),
            }}
          />
          <p className={styles.product_details_text}>
            Дата создания: {artwork.dateDisplay || "Неизвестно"}
          </p>
          <p className={styles.product_details_p}>
            Категории: {artwork.categoryTitles.join(", ") || "Не указаны"}
          </p>
          <p className={styles.product_details_p}>
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
