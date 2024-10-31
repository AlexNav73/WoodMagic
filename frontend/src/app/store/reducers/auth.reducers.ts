import { createReducer, on } from "@ngrx/store";

import * as AuthActions from "../actions/auth.actions";

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null,
};

export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: string | null;
  // error message
  errorMessage: string | null;
}

export const reducer = createReducer(
  initialState,
  on(
    AuthActions.loginSuccess,
    (state, payload) => ({
      ...state,
      isAuthenticated: true,
      user: payload.email,
    }),
  ),
  on(
    AuthActions.loginFailed,
    (state, error) => ({ ...state, errorMessage: error.reason }),
  ),
  on(
    AuthActions.signUpSuccess,
    (state, payload) => ({
      ...state,
      user: payload.email,
    }),
  ),
  on(
    AuthActions.signUpFailed,
    (state, error) => ({ ...state, errorMessage: error.reason }),
  ),
  on(
    AuthActions.logoutSuccess,
    () => initialState,
  ),
  on(
    AuthActions.updateCredentialsSuccess,
    (state, payload) => ({ ...state, isAuthenticated: true, user: payload.email })
  )
);
