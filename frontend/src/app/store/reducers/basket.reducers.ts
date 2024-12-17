import { createReducer, on } from "@ngrx/store";

import * as ProductActions from "../actions/product.actions";

export const initialState: State = {
    products: [],
    isLocked: false
};

export interface State {
    products: string[];
    isLocked: boolean;
}

export const reducer = createReducer(
    initialState,
    on(
        ProductActions.addToBasket,
        (state) => ({ ...state, isLocked: true })
    ),
    on(
        ProductActions.addToBasketSuccess,
        (state, payload) => ({ ...state, isLocked: false, products: [...state.products, payload.productId] })
    ),
    on(
        ProductActions.addToBasketFailed,
        (state) => ({ ...state, isLocked: false })
    ),
    on(
        ProductActions.refreshBasketSuccess,
        (state, payload) => ({ ...state, products: payload.products })
    )
);