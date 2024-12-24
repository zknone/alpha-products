import { Artwork } from "../../type/type";

export const FETCH_PRODUCTS_START = "FETCH_PRODUCTS_START";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";

type FetchProductsStartAction = {
  type: typeof FETCH_PRODUCTS_START;
};

type FetchProductsSuccessAction = {
  type: typeof FETCH_PRODUCTS_SUCCESS;
  payload: Artwork[];
};

interface FetchProductsFailureAction {
  type: typeof FETCH_PRODUCTS_FAILURE;
  payload: string;
}

export const fetchProductsStart = (): FetchProductsStartAction => ({
  type: FETCH_PRODUCTS_START,
});

export const fetchProductsSuccess = (
  photos: Artwork[]
): FetchProductsSuccessAction => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: photos,
});

export const fetchProductsFailure = (
  error: string
): FetchProductsFailureAction => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

export type ProductsActionTypes =
  | FetchProductsStartAction
  | FetchProductsSuccessAction
  | FetchProductsFailureAction;
