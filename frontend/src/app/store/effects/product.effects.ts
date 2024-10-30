import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { catchError, map, of, switchMap, tap } from "rxjs";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { CatalogService } from "../../services/catalog.service";
import * as ProductActions from "../actions/product.actions";

@Injectable()
export class ProductEffects {
  private actions = inject(Actions);
  private catalogService = inject(CatalogService);
  private route = inject(Router);

  Create$ = createEffect(() =>
    this.actions.pipe(
      ofType(ProductActions.create),
      switchMap((product) => {
        return this.catalogService.create(product).pipe(
          map(() => ProductActions.createSuccess()),
          catchError((error) => {
            console.log(error.error);
            return of(ProductActions.createFailed({ reason: "REASON" }));
          }),
        );
      }),
    )
  );

  CreateSuccess$ = createEffect(() =>
    this.actions.pipe(
        ofType(ProductActions.createSuccess),
        tap(() => this.route.navigateByUrl("/"))
    ), { dispatch: false });

  Update$ = createEffect(() =>
    this.actions.pipe(
        ofType(ProductActions.update),
        switchMap((product) => {
            return this.catalogService.update(product).pipe(
                map(() => ProductActions.updateSuccess()),
                catchError((error) => {
                    console.log(error.error);
                    return of(ProductActions.updateFailed({ reason: "REASON" }));
                })
            )
        })
    )
  );

  UpdateSuccess$ = createEffect(() =>
    this.actions.pipe(
        ofType(ProductActions.updateSuccess),
        tap(() => this.route.navigateByUrl("/"))
    ), { dispatch: false });
}
