import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { catchError, map, of, switchMap, tap } from "rxjs";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { CatalogService } from "../../services/catalog.service";
import * as ProductActions from "../actions/product.actions";
import { BasketService } from "../../services/basket.service";

@Injectable()
export class ProductEffects {
  private actions = inject(Actions);
  private catalogService = inject(CatalogService);
  private basketService = inject(BasketService);
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
      tap(() => this.route.navigateByUrl("/")),
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
          }),
        );
      }),
    )
  );

  UpdateSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(ProductActions.updateSuccess),
      tap(() => this.route.navigateByUrl("/")),
    ), { dispatch: false });

  Delete$ = createEffect(() =>
    this.actions.pipe(
      ofType(ProductActions.deleteProduct),
      switchMap((action) => {
        return this.catalogService.delete(action.id).pipe(
          map(() => ProductActions.deleteSuccess()),
          catchError((error) => {
            console.log(error.error);
            return of(ProductActions.deleteFailed({ reason: "REASON" }));
          }),
        );
      }),
    )
  );

  AddToBasket$ = createEffect(() =>
    this.actions.pipe(
      ofType(ProductActions.addToBasket),
      switchMap((action) => {
        return this.basketService.addToBasket(action.productId).pipe(
          map(() => ProductActions.addToBasketSuccess({ productId: action.productId })),
          catchError((error) => {
            console.log(error);
            return of(ProductActions.addToBasketFailed({ reason: "REASON" }));
          })
        );
      })
    )
  );

  RefreshBasket$ = createEffect(() =>
    this.actions.pipe(
      ofType(ProductActions.refreshBasket),
      switchMap((action) => {
        return this.basketService.getAll().pipe(
          map((products) => ProductActions.refreshBasketSuccess({ products })),
          catchError((error) => {
            console.log(error);
            return of(ProductActions.refreshBasketFailed({ reason: "REASON" }));
          })
        )
      })
    )
  );
}
