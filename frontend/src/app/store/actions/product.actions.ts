import { createAction, props } from '@ngrx/store';

import { Product, ProductInfo } from '../../model/product.interface';

export enum ProductActionTypes {
  CREATE = '[Product] Create',
  CREATE_SUCCESS = '[Product] Create SUCCESS',
  CREATE_FAILURE = '[Product] Create FAILURE',
  UPDATE = '[Product] Update',
  UPDATE_SUCCESS = '[Product] Update SUCCESS',
  UPDATE_FAILURE = '[Product] Update FAILURE',
  DELETE = '[Product] Delete',
  DELETE_SUCCESS = '[Product] Delete SUCCESS',
  DELETE_FAILURE = '[Product] Delete FAILURE',
  ADD_TO_BASKET = '[Product] Add To Basket',
  ADD_TO_BASKET_SUCCESS = '[Product] Add To Basket SUCCESS',
  ADD_TO_BASKET_FAILURE = '[Product] Add To Basket FAILURE',
  ADD_TO_BASKET_ALREADY_ADDED = '[Product] Add To Basket ALREADY ADDED',
  REMOVE_FROM_BASKET = '[Product] Remove From Basket',
  REMOVE_FROM_BASKET_SUCCESS = '[Product] Remove From Basket SUCCESS',
  REMOVE_FROM_BASKET_FAILURE = '[Product] Remove From Basket FAILURE',
  REFRESH_BASKET = '[Product] Refresh Basket',
  REFRESH_BASKET_SUCCESS = '[Product] Refresh Basket SUCCESS',
  REFRESH_BASKET_FAILURE = '[Product] Refresh Basket FAILURE',
  CLEAR_BASKET = '[Product] Clear Basket',
  CLEAR_BASKET_SUCCESS = '[Product] Clear Basket SUCCESS',
  CLEAR_BASKET_FAILURE = '[Product] Clear Basket FAILURE',
}

export const create = createAction(ProductActionTypes.CREATE, props<Product>());
export const createSuccess = createAction(ProductActionTypes.CREATE_SUCCESS);
export const createFailed = createAction(
  ProductActionTypes.CREATE_FAILURE,
  props<{ reason: string }>()
);

export const update = createAction(ProductActionTypes.UPDATE, props<Product>());
export const updateSuccess = createAction(ProductActionTypes.UPDATE_SUCCESS);
export const updateFailed = createAction(
  ProductActionTypes.UPDATE_FAILURE,
  props<{ reason: string }>()
);

export const deleteProduct = createAction(
  ProductActionTypes.DELETE,
  props<{ id: string }>()
);
export const deleteSuccess = createAction(ProductActionTypes.DELETE_SUCCESS);
export const deleteFailed = createAction(
  ProductActionTypes.DELETE_FAILURE,
  props<{ reason: string }>()
);

export const addToBasket = createAction(
  ProductActionTypes.ADD_TO_BASKET,
  props<{ product: ProductInfo }>()
);
export const addToBasketSuccess = createAction(
  ProductActionTypes.ADD_TO_BASKET_SUCCESS,
  props<{ product: ProductInfo }>()
);
export const addToBasketAlreadyAdded = createAction(
  ProductActionTypes.ADD_TO_BASKET_ALREADY_ADDED
);
export const addToBasketFailed = createAction(
  ProductActionTypes.ADD_TO_BASKET_FAILURE,
  props<{ reason: string }>()
);

export const removeFromBasket = createAction(
  ProductActionTypes.REMOVE_FROM_BASKET,
  props<{ productId: string }>()
);
export const removeFromBasketSuccess = createAction(
  ProductActionTypes.REMOVE_FROM_BASKET_SUCCESS,
  props<{ productId: string }>()
);
export const removeFromBasketFailed = createAction(
  ProductActionTypes.REMOVE_FROM_BASKET_FAILURE,
  props<{ reason: string }>()
);

export const refreshBasket = createAction(ProductActionTypes.REFRESH_BASKET);
export const refreshBasketSuccess = createAction(
  ProductActionTypes.REFRESH_BASKET_SUCCESS,
  props<{ products: ProductInfo[] }>()
);
export const refreshBasketFailed = createAction(
  ProductActionTypes.REFRESH_BASKET_FAILURE,
  props<{ reason: string }>()
);

export const clearBasket = createAction(ProductActionTypes.CLEAR_BASKET);
export const clearBasketSuccess = createAction(
  ProductActionTypes.CLEAR_BASKET_SUCCESS
);
export const clearBasketFailed = createAction(
  ProductActionTypes.CLEAR_BASKET_FAILURE,
  props<{ reason: string }>()
);
