import { createAction, props } from "@ngrx/store";
import { IProduct } from "../../model/product";

export enum StockActionTypes {
  LOAD_ALL = "[Stock] Load All",
  LOAD_SUCCESS = "[Stock] Load All SUCCESS",
  LOAD_FAILURE = "[Stock] Load All FAILURE",
}

export const load = createAction(
  StockActionTypes.LOAD_ALL,
  props<{ page?: number; count?: number; }>()
);
export const loadAllSuccess = createAction(
  StockActionTypes.LOAD_SUCCESS,
  props<{ products: IProduct[] }>(),
);
export const loadAllFailed = createAction(
  StockActionTypes.LOAD_FAILURE,
  props<{ reason: string }>(),
);
