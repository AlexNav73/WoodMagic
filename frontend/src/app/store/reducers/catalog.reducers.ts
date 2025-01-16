import { createReducer, on } from '@ngrx/store';

import { ProductInfo } from '../../model/product.interface';
import * as CatalogActions from '../actions/catalog.actions';

export const initialState: State = {
  isLoading: false,
  products: [],
  count: 0,
  errorMessage: null,
};

export interface State {
  isLoading: boolean;
  products: ProductInfo[];
  count: number;
  errorMessage: string | null;
}

export const reducer = createReducer(
  initialState,
  on(CatalogActions.load, state => ({ ...state, isLoading: true })),
  on(CatalogActions.loadSuccess, (state, payload) => ({
    ...state,
    isLoading: false,
    products: payload.products,
    count: payload.count,
  })),
  on(CatalogActions.loadFailed, (state, error) => ({
    ...state,
    isLoading: false,
    errorMessage: error.reason,
  }))
);
