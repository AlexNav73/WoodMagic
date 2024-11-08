import { createAction, props } from "@ngrx/store";

import { Product } from "../../model/product.interface";

export enum ProductActionTypes {
  CREATE = "[Product] Create",
  CREATE_SUCCESS = "[Product] Create SUCCESS",
  CREATE_FAILURE = "[Product] Create FAILURE",
  UPDATE = "[Product] Update",
  UPDATE_SUCCESS = "[Product] Update SUCCESS",
  UPDATE_FAILURE = "[Product] Update FAILURE",
  DELETE = "[Product] Delete",
  DELETE_SUCCESS = "[Product] Delete SUCCESS",
  DELETE_FAILURE = "[Product] Delete FAILURE",
  ADD_TO_BASKET = "[Product] Add To Basket",
  ADD_TO_BASKET_SUCCESS = "[Product] Add To Basket SUCCESS",
  ADD_TO_BASKET_FAILURE = "[Product] Add To Basket FAILURE",
  REMOVE_FROM_BASKET = "[Product] Remove From Basket",
  REMOVE_FROM_BASKET_SUCCESS = "[Product] Remove From Basket SUCCESS",
  REMOVE_FROM_BASKET_FAILURE = "[Product] Remove From Basket FAILURE",
}

export const create = createAction(
  ProductActionTypes.CREATE,
  props<Product>(),
);
export const createSuccess = createAction(ProductActionTypes.CREATE_SUCCESS);
export const createFailed = createAction(
  ProductActionTypes.CREATE_FAILURE,
  props<{ reason: string }>(),
);

export const update = createAction(
  ProductActionTypes.UPDATE,
  props<Product>(),
);
export const updateSuccess = createAction(ProductActionTypes.UPDATE_SUCCESS);
export const updateFailed = createAction(
  ProductActionTypes.UPDATE_FAILURE,
  props<{ reason: string }>(),
);

export const deleteProduct = createAction(
  ProductActionTypes.DELETE,
  props<{ id: string }>(),
);
export const deleteSuccess = createAction(ProductActionTypes.DELETE_SUCCESS);
export const deleteFailed = createAction(
  ProductActionTypes.DELETE_FAILURE,
  props<{ reason: string }>(),
);

export const addToBasket = createAction(
  ProductActionTypes.ADD_TO_BASKET,
  props<{ productId: string; }>()
);
export const addToBasketSuccess = createAction(
  ProductActionTypes.ADD_TO_BASKET_SUCCESS,
  props<{ productId: string; }>()
);
export const addToBasketFailed = createAction(
  ProductActionTypes.ADD_TO_BASKET_FAILURE,
  props<{ reason: string }>()
);

export const removeFromBasket = createAction(
  ProductActionTypes.REMOVE_FROM_BASKET,
  props<{ productId: string; }>()
);
