import { createAction, props } from "@ngrx/store";

import { Credentials } from "../../model/credentials.interface";

export enum AuthActionTypes {
  LOGIN = "[Auth] Login",
  LOGIN_SUCCESS = "[Auth] Login Success",
  LOGIN_FAILURE = "[Auth] Login Failure",
  SIGNUP = "[Auth] Signup",
  SIGNUP_SUCCESS = "[Auth] Signup Success",
  SIGNUP_FAILURE = "[Auth] Signup Failure",
  LOGOUT = "[Auth] Logout",
  LOGOUT_SUCCESS = "[Auth] Logout Success",
  LOGOUT_FAILURE = "[Auth] Logout Failure",
  UPDATE_CREDENTIALS = "[Auth] Update Credentials",
  UPDATE_CREDENTIALS_SUCCESS = "[Auth] Update Credentials Success",
  UPDATE_CREDENTIALS_FAILED = "[Auth] Update Credentials Failure",
}

export const login = createAction(AuthActionTypes.LOGIN, props<Credentials>());
export const loginSuccess = createAction(
  AuthActionTypes.LOGIN_SUCCESS,
  props<{ email: string }>(),
);
export const loginFailed = createAction(
  AuthActionTypes.LOGIN_FAILURE,
  props<{ reason: string }>(),
);

export const signUp = createAction(
  AuthActionTypes.SIGNUP,
  props<Credentials>(),
);
export const signUpSuccess = createAction(
  AuthActionTypes.SIGNUP_SUCCESS,
  props<{ email: string }>(),
);
export const signUpFailed = createAction(
  AuthActionTypes.SIGNUP_FAILURE,
  props<{ reason: string }>(),
);

export const logout = createAction(AuthActionTypes.LOGOUT);
export const logoutSuccess = createAction(AuthActionTypes.LOGOUT_SUCCESS);
export const logoutFailed = createAction(
  AuthActionTypes.LOGOUT_FAILURE,
  props<{ reason: string }>(),
);

export const updateCredentials = createAction(AuthActionTypes.UPDATE_CREDENTIALS);
export const updateCredentialsSuccess = createAction(
  AuthActionTypes.UPDATE_CREDENTIALS_SUCCESS,
  props<{ email: string; }>(),
);
export const updateCredentialsFailed = createAction(AuthActionTypes.UPDATE_CREDENTIALS_FAILED);
