import { Component, DestroyRef, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { filter } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from '../../../store/app.states';
import * as ProductActions from '../../../store/actions/product.actions';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'basket-icon',
  imports: [
    MatButtonModule,
    MatBadgeModule,
    MatIconModule,
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: './basket-icon.component.html',
  styleUrl: './basket-icon.component.scss',
})
export class BasketIconComponent {
  private store: Store<AppState> = inject(Store<AppState>);
  private destroy$ = inject(DestroyRef);

  isAuthenticated$ = this.store.select(x => x.auth.isAuthenticated);
  productsCount$ = this.store.select(x => x.basket.products.length);

  constructor() {
    this.isAuthenticated$
      .pipe(
        filter(x => x === true),
        takeUntilDestroyed(this.destroy$)
      )
      .subscribe(() => this.store.dispatch(ProductActions.refreshBasket()));
  }

  onClick() {
    this.store.dispatch(ProductActions.clearBasket());
  }
}
