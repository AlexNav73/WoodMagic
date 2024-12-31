import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { AuthService } from '../../services/auth.service';
import * as AuthActions from '../actions/auth.actions';
import { UserInfo } from '../../services/auth.service';

@Injectable()
export class AuthEffects {
  private actions = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  LogIn$ = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.login),
      switchMap(action => {
        return this.authService.logIn(action.email!, action.password!).pipe(
          map(() => {
            return AuthActions.loginSuccess({ email: action.email! });
          }),
          catchError(error => {
            console.log(error.error);
            return of(AuthActions.loginFailed({ reason: 'REASON' }));
          })
        );
      })
    )
  );

  LogInSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.loginSuccess),
      switchMap(() => {
        this.router.navigateByUrl('/');
        return of(AuthActions.getUserInfo());
      })
    )
  );

  SignUp$ = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.signUp),
      switchMap(action => {
        return this.authService.signUp(action.email!, action.password!).pipe(
          map(result => {
            console.log(result);
            return AuthActions.signUpSuccess();
          }),
          catchError(error => {
            console.log(error.error);
            return of(AuthActions.signUpFailed({ reason: 'REASON' }));
          })
        );
      })
    )
  );

  SignUpSuccess$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(AuthActions.signUpSuccess),
        tap(() => this.router.navigateByUrl('/login'))
      ),
    { dispatch: false }
  );

  LogOut$ = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.logout),
      switchMap(() => {
        return this.authService.logout().pipe(
          map(result => {
            console.log(result);
            return AuthActions.logoutSuccess();
          }),
          catchError(error => {
            console.log(error.error);
            return of(AuthActions.logoutFailed({ reason: 'REASON' }));
          })
        );
      })
    )
  );

  LogOutSuccess$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => this.router.navigateByUrl('/'))
      ),
    { dispatch: false }
  );

  Update$ = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.getUserInfo),
      switchMap(() => {
        return this.authService.getUser().pipe(
          map((user: UserInfo) =>
            AuthActions.getUserInfoSuccess({
              id: user.id,
              email: user.email,
              isAdmin: user.isAdmin,
            })
          ),
          catchError(() => {
            return of(AuthActions.getUserInfoFailed());
          })
        );
      })
    )
  );
}
