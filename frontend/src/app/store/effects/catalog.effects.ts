import { inject, Injectable } from '@angular/core';

import { catchError, map, of, switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { CatalogService } from '../../services/catalog.service';
import * as CatalogActions from '../actions/catalog.actions';
import { GetAllProductsGQL } from '../../generated/graphql';

@Injectable()
export class CatalogEffects {
  private actions = inject(Actions);
  private catalogService = inject(CatalogService);
  private getAllProducts = inject(GetAllProductsGQL);

  Load$ = createEffect(() =>
    this.actions.pipe(
      ofType(CatalogActions.load),
      switchMap(action => {
        return this.getAllProducts.fetch({ count: action.count! }).pipe(
          map(result => {
            return CatalogActions.loadSuccess({
              products: result.data.items?.nodes!,
              count: result.data.totalCount,
            });
          }),
          catchError(error => {
            console.log(error.error);
            return of(CatalogActions.loadFailed({ reason: 'REASON' }));
          })
        );
      })
    )
  );
}
