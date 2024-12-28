import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deletePost,
  setFilter,
  toggleFavorites,
} from "../reducers/products/products-slice";
import { FilterCategory } from "../type/type";

export const useProductHandlers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFavorites = (id: number) => {
    dispatch(toggleFavorites(id));
  };

  const handleDelete = (id: number) => {
    dispatch(deletePost(id));
  };

  const handleFiltered = (value: FilterCategory) => {
    dispatch(setFilter(value));
  };

  const handleNavigate = (id: number) => {
    navigate(`/products/${id}`);
  };

  return { handleFavorites, handleDelete, handleFiltered, handleNavigate };
};
