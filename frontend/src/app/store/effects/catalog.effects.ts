import { inject, Injectable } from "@angular/core";

import { catchError, map, of, switchMap } from "rxjs";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { CatalogService } from "../../services/catalog.service";
import * as CatalogActions from "../actions/catalog.actions";

@Injectable()
export class CatalogEffects {
  private actions = inject(Actions);
  private catalogService = inject(CatalogService);

  LoadAll$ = createEffect(() =>
    this.actions.pipe(
      ofType(CatalogActions.load),
      switchMap((action) => {
        return this.catalogService.load(action.page, action.count).pipe(
          map((products) => {
            return CatalogActions.loadSuccess({ products: products.products, count: products.count });
          }),
          catchError((error) => {
            console.log(error.error);
            return of(CatalogActions.loadFailed({ reason: "REASON" }));
          }),
        );
      }),
    )
  );
}
