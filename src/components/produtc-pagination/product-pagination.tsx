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
    <div>
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Назад
      </button>
      <span>
        {currentPage} / {totalPages}
      </span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Вперед
      </button>
    </div>
  );
};

export default ProductPagination;
