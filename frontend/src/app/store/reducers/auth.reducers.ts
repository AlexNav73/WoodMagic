import { createReducer, on } from '@ngrx/store';

import * as AuthActions from '../actions/auth.actions';

export const initialState: State = {
  isAuthenticated: false,
  isAdmin: false,
  email: null,
  id: null,
  errorMessage: null,
};

export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  isAdmin: boolean;
  // if authenticated, there should be a user object
  email: string | null;
  id: string | null;
  // error message
  errorMessage: string | null;
}

export const reducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, payload) => ({
    ...state,
    isAuthenticated: true,
    email: payload.email,
  })),
  on(AuthActions.loginFailed, (state, error) => ({
    ...state,
    errorMessage: error.reason,
  })),
  on(AuthActions.signUpFailed, (state, error) => ({
    ...state,
    errorMessage: error.reason,
  })),
  on(AuthActions.logoutSuccess, () => initialState),
  on(AuthActions.getUserInfoSuccess, (state, payload) => ({
    ...state,
    isAuthenticated: true,
    isAdmin: payload.isAdmin,
    id: payload.id,
    email: payload.email,
  }))
);
