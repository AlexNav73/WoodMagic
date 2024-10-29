import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { catchError, map, of, switchMap, tap } from "rxjs";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { AuthService } from "../../services/auth.service";
import * as AuthActions from "../actions/auth.actions";

@Injectable()
export class AuthEffects {
  private actions = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  LogIn$ = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.login),
      switchMap((action) => {
        return this.authService.logIn(action.email!, action.password!)
          .pipe(
            map((user) => {
              console.log(user);
              return AuthActions.loginSuccess({
                token: user.token!,
                email: action.email!,
              });
            }),
            catchError((error) => {
              console.log(error.error);
              return of(AuthActions.loginFailed({ reason: "REASON" }));
            }),
          );
      }),
    )
  );

  LogInSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.loginSuccess),
      tap((action) => {
        localStorage.setItem("token", action.token);
        this.router.navigateByUrl("/home");
      }),
    ), { dispatch: false });

  SignUp$ = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.signUp),
      switchMap((action) => {
        return this.authService.signUp(action.email!, action.password!)
          .pipe(
            map((result) => {
              console.log(result);
              return AuthActions.signUpSuccess({
                token: result.token!,
                email: action.email!,
              });
            }),
            catchError((error) => {
              console.log(error.error);
              return of(AuthActions.signUpFailed({ reason: "REASON" }));
            }),
          );
      }),
    )
  );

  SignUpSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.signUpSuccess),
      tap((action) => {
        localStorage.setItem("token", action.token);
        this.router.navigateByUrl("/login");
      }),
    ), { dispatch: false });

  LogOut$ = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.logout),
      switchMap(() => {
        const token = localStorage.getItem("token");
        return this.authService.logout(token!)
          .pipe(
            map((result) => {
              console.log(result);
              return AuthActions.logoutSuccess();
            }),
            catchError((error) => {
              console.log(error.error);
              return of(AuthActions.logoutFailed({ reason: "REASON" }));
            }),
          );
      }),
    )
  );

  LogOutSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.logoutSuccess),
      tap(() => {
        localStorage.removeItem("token");
      }),
    ), { dispatch: false });
}
