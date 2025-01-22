import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ProductActions from '../actions/product.actions';
import {
  AddToBasketGQL,
  ClearBasketGQL,
  CreateProductGQL,
  DeleteProductGQL,
  GetAllProductsFromBasketGQL,
  RemoveFromBasketGQL,
  UpdateProductGQL,
} from '../../generated/graphql';

@Injectable()
export class ProductEffects {
  private actions = inject(Actions);
  private route = inject(Router);

  private getAllProductsFromBasketQuery = inject(GetAllProductsFromBasketGQL);

  private createProductMutation = inject(CreateProductGQL);
  private updateProductMutation = inject(UpdateProductGQL);
  private deleteProductMutation = inject(DeleteProductGQL);

  private addToBasketMutation = inject(AddToBasketGQL);
  private removeFromBasketMutation = inject(RemoveFromBasketGQL);
  private clearBasketMutation = inject(ClearBasketGQL);

  Create$ = createEffect(() =>
    this.actions.pipe(
      ofType(ProductActions.create),
      switchMap(product => {
        return this.createProductMutation
          .mutate({ name: product.name, price: product.price })
          .pipe(
            map(result => ProductActions.createSuccess()),
            catchError(error => {
              console.log(error.error);
              return of(ProductActions.createFailed({ reason: 'REASON' }));
            })
          );
      })
    )
  );

  CreateSuccess$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(ProductActions.createSuccess),
        tap(() => this.route.navigateByUrl('/'))
      ),
    { dispatch: false }
  );

  Update$ = createEffect(() =>
    this.actions.pipe(
      ofType(ProductActions.update),
      switchMap(product => {
        return this.updateProductMutation
          .mutate({ id: product.id, name: product.name, price: product.price })
          .pipe(
            map(() => ProductActions.updateSuccess()),
            catchError(error => {
              console.log(error.error);
              return of(ProductActions.updateFailed({ reason: 'REASON' }));
            })
          );
      })
    )
  );

  UpdateSuccess$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(ProductActions.updateSuccess),
        tap(() => this.route.navigateByUrl('/'))
      ),
    { dispatch: false }
  );

  Delete$ = createEffect(() =>
    this.actions.pipe(
      ofType(ProductActions.deleteProduct),
      switchMap(action => {
        return this.deleteProductMutation.mutate({ id: action.id }).pipe(
          map(() => ProductActions.deleteSuccess()),
          catchError(error => {
            console.log(error.error);
            return of(ProductActions.deleteFailed({ reason: 'REASON' }));
          })
        );
      })
    )
  );

  AddToBasket$ = createEffect(() =>
    this.actions.pipe(
      ofType(ProductActions.addToBasket),
      switchMap(action => {
        return this.addToBasketMutation.mutate({ id: action.product.id }).pipe(
          map(result => {
            if (!result) {
              return ProductActions.addToBasketAlreadyAdded();
            }

            return ProductActions.addToBasketSuccess({
              product: action.product,
            });
          }),
          catchError(error => {
            console.log(error);
            return of(ProductActions.addToBasketFailed({ reason: 'REASON' }));
          })
        );
      })
    )
  );

  RemoveFromBasket$ = createEffect(() =>
    this.actions.pipe(
      ofType(ProductActions.removeFromBasket),
      switchMap(action => {
        return this.removeFromBasketMutation
          .mutate({ id: action.productId })
          .pipe(
            map(result => {
              if (!result) {
                return ProductActions.removeFromBasketFailed({
                  reason: 'Product is not added to the basket',
                });
              }

              return ProductActions.removeFromBasketSuccess({
                productId: action.productId,
              });
            }),
            catchError(error => {
              console.log(error);
              return of(
                ProductActions.removeFromBasketFailed({ reason: 'REASON' })
              );
            })
          );
      })
    )
  );

  RefreshBasket$ = createEffect(() =>
    this.actions.pipe(
      ofType(ProductActions.refreshBasket),
      switchMap(action => {
        return this.getAllProductsFromBasketQuery.fetch().pipe(
          map(
            response =>
              response.data.user.at(0)?.basket?.products.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
              })) ?? []
          ),
          map(products => ProductActions.refreshBasketSuccess({ products })),
          catchError(error => {
            console.log(error);
            return of(ProductActions.refreshBasketFailed({ reason: 'REASON' }));
          })
        );
      })
    )
  );

  ClearBasket$ = createEffect(() =>
    this.actions.pipe(
      ofType(ProductActions.clearBasket),
      switchMap(() => {
        return this.clearBasketMutation.mutate().pipe(
          map(() => ProductActions.clearBasketSuccess()),
          catchError(error => {
            console.log(error);
            return of(ProductActions.clearBasketFailed({ reason: 'REASON' }));
          })
        );
      })
    )
  );
}
