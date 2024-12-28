import { Link } from "react-router-dom";
import { FilterCategory } from "../../type/type";
import { isFavoritesEmpty } from "../../utils/common";
import styles from "./products-menu.module.css";

const ProductsMenu = ({
  favoriteArtworks,
  handleFiltered,
  filter,
}: {
  favoriteArtworks: number[];
  handleFiltered: (filterCategory: FilterCategory) => void;
  filter: FilterCategory;
}) => {
  return (
    <div className={styles.products_menu_container}>
      <ul className={styles.products_menu_list}>
        <li className={styles.products_menu_item}>
          <button
            style={filter === "All" ? { textDecoration: "underline" } : {}}
            className={styles.products_menu_button}
            onClick={() => handleFiltered("All")}
          >
            All
          </button>
        </li>
        <li className={styles.products_menu_item}>
          <button
            style={
              filter === "Favorites" ? { textDecoration: "underline" } : {}
            }
            className={styles.products_menu_button}
            disabled={isFavoritesEmpty(favoriteArtworks)}
            onClick={() => handleFiltered("Favorites")}
          >
            Favorites
          </button>
        </li>
      </ul>
      <ul className={styles.products_menu_list}>
        <li className={styles.products_menu_item}>
          <Link to={"/create-product"} className={styles.products_menu_button}>
            +Add new one
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProductsMenu;
