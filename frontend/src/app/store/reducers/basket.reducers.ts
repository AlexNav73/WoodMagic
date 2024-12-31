import { createReducer, on } from '@ngrx/store';

import * as ProductActions from '../actions/product.actions';

export const initialState: State = {
  products: [],
  error: null,
};

export interface State {
  products: string[];
  error: string | null;
}

export const reducer = createReducer(
  initialState,
  on(ProductActions.addToBasketSuccess, (state, payload) => ({
    ...state,
    products: [...state.products, payload.productId],
  })),
  on(ProductActions.addToBasketFailed, (state, payload) => ({
    ...state,
    error: payload.reason,
  })),
  on(ProductActions.removeFromBasketSuccess, (state, payload) => ({
    ...state,
    products: state.products.filter(x => x !== payload.productId),
  })),
  on(ProductActions.refreshBasketSuccess, (state, payload) => ({
    ...state,
    products: payload.products,
  })),
  on(ProductActions.clearBasketSuccess, state => ({
    ...state,
    products: [],
  }))
);
