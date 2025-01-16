import { createAction, props } from '@ngrx/store';
import { ProductInfo } from '../../model/product.interface';

export enum CatalogActionTypes {
  LOAD = '[Catalog] Load',
  LOAD_SUCCESS = '[Catalog] Load SUCCESS',
  LOAD_FAILURE = '[Catalog] Load FAILURE',
}

export const load = createAction(
  CatalogActionTypes.LOAD,
  props<{ page: number; count: number }>()
);
export const loadSuccess = createAction(
  CatalogActionTypes.LOAD_SUCCESS,
  props<{ products: ProductInfo[]; count: number }>()
);
export const loadFailed = createAction(
  CatalogActionTypes.LOAD_FAILURE,
  props<{ reason: string }>()
);
