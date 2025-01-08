import { Component, inject, input, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { Store } from '@ngrx/store';

import { AppState } from '../../../store/app.states';
import * as ProductActions from '../../../store/actions/product.actions';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'basket-item',
  imports: [MatCheckboxModule, MatButtonModule, RouterLink],
  templateUrl: './basket-item.component.html',
  styleUrl: './basket-item.component.scss',
})
export class BasketItemComponent {
  private store: Store<AppState> = inject(Store<AppState>);

  id = input.required<string>();
  name = input.required<string>();
  price = input.required<number>();
  checked = model<boolean>(false);
  amount = model<number>(1);

  onChange(value: boolean) {
    this.checked.set(value);
  }

  onAmountChanged(value: number) {
    this.amount.set(value);
  }

  onRemove() {
    this.store.dispatch(
      ProductActions.removeFromBasket({ productId: this.id() })
    );
  }
}
