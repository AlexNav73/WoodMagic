import { createAction, props } from "@ngrx/store";

import { Product } from "../../model/product.interface";

export enum ProductActionTypes {
  CREATE = "[Product] Create",
  CREATE_SUCCESS = "[Product] Create SUCCESS",
  CREATE_FAILURE = "[Product] Create FAILURE",
  UPDATE = "[Product] Update",
  UPDATE_SUCCESS = "[Product] Update SUCCESS",
  UPDATE_FAILURE = "[Product] Update FAILURE",
}

export const create = createAction(
    ProductActionTypes.CREATE,
    props<Product>()
);
export const createSuccess = createAction(ProductActionTypes.CREATE_SUCCESS);
export const createFailed = createAction(
    ProductActionTypes.CREATE_FAILURE,
    props<{ reason: string }>(),
);

export const update = createAction(
    ProductActionTypes.UPDATE,
    props<Product>()
);
export const updateSuccess = createAction(ProductActionTypes.UPDATE_SUCCESS);
export const updateFailed = createAction(
    ProductActionTypes.UPDATE_FAILURE,
    props<{ reason: string }>(),
);