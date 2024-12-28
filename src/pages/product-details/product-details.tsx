import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
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

  if (!artwork) {
    return <h2>Такая страница отсутствует</h2>;
  }

  return (
    <>
      <div className={styles.product_details_container}>
        <img
          className={styles.product_details_image}
          src={getImage(artwork.imageId, 700)}
          alt={artwork.thumbnail.altText}
        />
        <h2 className={styles.product_details_title}>
          {artwork.title}, {artwork.dateDisplay || ""}
        </h2>
        <h3 className={styles.product_details_subtitle}>
          {artwork.artistDisplay}
        </h3>
        <div
          className={styles.product_details_description}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              artwork.description || "The description will be added soon."
            ),
          }}
        />
        <ul className={styles.product_categories}>
          {artwork.categoryTitles.map((item) => (
            <li className={styles.products_category}>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <ul className={styles.product_categories}>
          {artwork.classificationTitles.map((item) => (
            <li className={styles.products_classification}>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <Link className={styles.products_link} to="/products">
          Go back
        </Link>
      </div>
    </>
  );
};

export default ProductDetails;
