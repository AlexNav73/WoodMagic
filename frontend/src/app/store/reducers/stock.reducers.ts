import { createReducer, on } from "@ngrx/store";

import { IProduct } from "../../model/product";
import * as StockActions from "../actions/stock.actions";

export const initialState: State = {
  isLoading: false,
  products: [],
  errorMessage: null,
};

export interface State {
  isLoading: boolean;
  products: IProduct[];
  errorMessage: string | null;
}

export const reducer = createReducer(
  initialState,
  on(
    StockActions.load,
    (state) => ({ ...state, isLoading: true }),
  ),
  on(
    StockActions.loadAllSuccess,
    (state, payload) => ({
      ...state,
      isLoading: false,
      products: payload.products,
    }),
  ),
  on(
    StockActions.loadAllFailed,
    (state, error) => ({
      ...state,
      isLoading: false,
      errorMessage: error.reason,
    }),
  ),
);
