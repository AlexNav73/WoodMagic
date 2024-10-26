import { createReducer, on } from "@ngrx/store";

import { IProduct } from "../../model/product";
import * as StockActions from "../actions/stock.actions";

export const initialState: State = {
    products: [],
    errorMessage: null,
}

export interface State {
    products: IProduct[];
    errorMessage: string | null;
}

export const reducer = createReducer(
    initialState,
    on(
        StockActions.loadAllSuccess,
        (state, payload) => ({ ...state, products: payload.products })
    ),
    on(
        StockActions.loadAllFailed,
        (state, error) => ({ ...state, errorMessage: error.reason })
    ),
);