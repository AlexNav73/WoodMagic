import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { filter, first, mergeMap } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from '../store/app.states';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store: Store<AppState> = inject(Store<AppState>);

  return store.select(x => x.authState.user)
    .pipe(
      first(),
      mergeMap((user) => {
        const authReq = !!user?.token ? req.clone({
          setHeaders: { Authorization: 'Bearer ' + user!.token },
        }) : req;
        return next(authReq);
      })
    );
};
