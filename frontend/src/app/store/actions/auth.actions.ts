import { createAction, props } from '@ngrx/store';

import { Credentials } from '../../model/credentials.interface';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  SIGNUP = '[Auth] Signup',
  SIGNUP_SUCCESS = '[Auth] Signup Success',
  SIGNUP_FAILURE = '[Auth] Signup Failure',
  LOGOUT = '[Auth] Logout',
  LOGOUT_SUCCESS = '[Auth] Logout Success',
  LOGOUT_FAILURE = '[Auth] Logout Failure',
  GET_USER_INFO = '[Auth] Get User Info',
  GET_USER_INFO_SUCCESS = '[Auth] Get User Info Success',
  GET_USER_INFO_FAILED = '[Auth] Get User Info Failure',
}

export const login = createAction(AuthActionTypes.LOGIN, props<Credentials>());
export const loginSuccess = createAction(
  AuthActionTypes.LOGIN_SUCCESS,
  props<{ email: string }>()
);
export const loginFailed = createAction(
  AuthActionTypes.LOGIN_FAILURE,
  props<{ reason: string }>()
);

export const signUp = createAction(
  AuthActionTypes.SIGNUP,
  props<Credentials>()
);
export const signUpSuccess = createAction(AuthActionTypes.SIGNUP_SUCCESS);
export const signUpFailed = createAction(
  AuthActionTypes.SIGNUP_FAILURE,
  props<{ reason: string }>()
);

export const logout = createAction(AuthActionTypes.LOGOUT);
export const logoutSuccess = createAction(AuthActionTypes.LOGOUT_SUCCESS);
export const logoutFailed = createAction(
  AuthActionTypes.LOGOUT_FAILURE,
  props<{ reason: string }>()
);

export const getUserInfo = createAction(AuthActionTypes.GET_USER_INFO);
export const getUserInfoSuccess = createAction(
  AuthActionTypes.GET_USER_INFO_SUCCESS,
  props<{ id: string; email: string; isAdmin: boolean }>()
);
export const getUserInfoFailed = createAction(
  AuthActionTypes.GET_USER_INFO_FAILED
);
