import {
  Component,
  DestroyRef,
  inject,
  Input,
  input,
  InputSignal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import { ProductInfo } from '../../../model/product.interface';
import { AppState } from '../../../store/app.states';
import * as ProductActions from '../../../store/actions/product.actions';

@Component({
  selector: 'product',
  imports: [
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIcon,
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  private store: Store<AppState> = inject(Store<AppState>);
  private destroy$ = inject(DestroyRef);

  info = input.required<ProductInfo>();

  isAdmin$ = this.store.select(x => x.auth.isAdmin);
  isAuthenticated$ = this.store.select(x => x.auth.isAuthenticated);
  isInBasket$ = this.store
    .select(x => x.basket.products)
    .pipe(map(products => products.map(x => x.id).includes(this.info().id!)));

  isProcessing: boolean = false;

  constructor() {
    const actions = inject(Actions);

    actions
      .pipe(
        ofType(
          ProductActions.addToBasketSuccess,
          ProductActions.addToBasketAlreadyAdded,
          ProductActions.addToBasketFailed,
          ProductActions.removeFromBasketSuccess,
          ProductActions.removeFromBasketFailed
        ),
        takeUntilDestroyed(this.destroy$)
      )
      .subscribe(() => (this.isProcessing = false));
  }

  onDelete() {
    this.store.dispatch(ProductActions.deleteProduct({ id: this.info().id! }));
  }

  onAddToCart() {
    this.isProcessing = true;
    this.store.dispatch(
      ProductActions.addToBasket({
        product: {
          id: this.info().id!,
          name: this.info().name,
          price: this.info().price,
        },
      })
    );
  }

  onRemoveFromCart() {
    this.isProcessing = true;
    this.store.dispatch(
      ProductActions.removeFromBasket({ productId: this.info().id! })
    );
  }
}
