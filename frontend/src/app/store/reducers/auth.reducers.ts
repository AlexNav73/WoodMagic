import { createReducer, on } from "@ngrx/store";

import { User } from "../../model/user";
import * as AuthActions from "../actions/auth.actions";

export const initialState: State = {
  isAuthenticated: false,
  isAdmin: false,
  user: null,
  errorMessage: null,
};

export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // is a user authenticated?
  isAdmin: boolean;
  // if authenticated, there should be a user object
  user: User | null;
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
      user: { email: payload.email, token: payload.token },
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
      user: { email: payload.email, token: payload.token },
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
);
