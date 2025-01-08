import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  signal,
} from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { map } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from '../../store/app.states';
import { ProductInfo } from '../../model/product.interface';
import { BasketItemComponent } from '../../components/basket/basket-item/basket-item.component';

class BasketItem {
  public checked = signal(false);
  public amount = signal(1);

  constructor(public product: ProductInfo) {}
}

@Component({
  selector: 'basket',
  imports: [MatCheckboxModule, BasketItemComponent],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent {
  private store: Store<AppState> = inject(Store<AppState>);
  private destroy$ = inject(DestroyRef);

  basketItems = signal<BasketItem[]>([]);

  readonly total = computed(() => {
    return this.basketItems()
      .filter(x => x.checked())
      .reduce((sum, item) => sum + item.product.price * item.amount(), 0);
  });

  readonly checked = computed(() => {
    if (this.basketItems().length == 0) {
      return false;
    }
    return this.basketItems().every(x => x.checked());
  });

  readonly indeterminate = computed(() => {
    const items = this.basketItems();

    const checked = items.some(x => x.checked());
    const unchecked = items.some(x => !x.checked());

    return checked && unchecked;
  });

  constructor() {
    this.store
      .select(x => x.basket.products)
      .pipe(
        map(products => products.map(p => new BasketItem(p))),
        takeUntilDestroyed(this.destroy$)
      )
      .subscribe(items => this.onBasketChanged(items));
  }

  onBasketChanged(items: BasketItem[]) {
    this.basketItems.set(items);
  }

  update(checked: boolean) {
    this.basketItems.update(prev => {
      prev.forEach(item => item.checked.set(checked));
      return [...prev];
    });
  }
}
