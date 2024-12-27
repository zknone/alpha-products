import styles from "./product-pagination.module.css";

const ProductPagination = ({
  handlePrevPage,
  currentPage,
  totalPages,
  handleNextPage,
}: {
  handlePrevPage: () => void;
  currentPage: number;
  totalPages: number;
  handleNextPage: () => void;
}) => {
  return (
    <div className={styles.product_pagination_container}>
      <button
        className={styles.product_pagination_button}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        Back
      </button>
      <span>
        {currentPage} / {totalPages}
      </span>
      <button
        className={styles.product_pagination_button}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Forward
      </button>
    </div>
  );
};

export default ProductPagination;
