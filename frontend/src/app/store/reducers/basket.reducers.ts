import { createReducer, on } from '@ngrx/store';

import * as ProductActions from '../actions/product.actions';
import { ProductInfo } from '../../model/product.interface';

export const initialState: State = {
  products: [],
  error: null,
};

export interface State {
  products: ProductInfo[];
  error: string | null;
}

export const reducer = createReducer(
  initialState,
  on(ProductActions.addToBasketSuccess, (state, payload) => ({
    ...state,
    products: [...state.products, payload.product],
  })),
  on(ProductActions.addToBasketFailed, (state, payload) => ({
    ...state,
    error: payload.reason,
  })),
  on(ProductActions.removeFromBasketSuccess, (state, payload) => ({
    ...state,
    products: state.products.filter(x => x.id !== payload.productId),
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
