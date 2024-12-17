import { Component, computed, inject, input, InputSignal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { AsyncPipe } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

import { Subject, takeUntil } from "rxjs";
import { Store } from "@ngrx/store";
import { Actions, ofType } from "@ngrx/effects";

import { Product } from "../../../model/product.interface";
import { AppState } from "../../../store/app.states";
import * as ProductActions from "../../../store/actions/product.actions";

@Component({
  selector: "product",
  imports: [
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIcon,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: "./product.component.html",
  styleUrl: "./product.component.scss",
})
export class ProductComponent {
  private store: Store<AppState> = inject(Store<AppState>);

  private destroy$ = new Subject<void>();

  info: InputSignal<Product | undefined> = input();

  id = computed(() => this.info()?.id);
  name = computed(() => this.info()?.name);
  price = computed(() => this.info()?.price);

  isAdmin$ = this.store.select((x) => x.auth.isAdmin);

  isProcessing: boolean = false;
  isInBasket: boolean = false;

  constructor() {
    const actions = inject(Actions);

    actions.pipe(
      ofType(ProductActions.addToBasketSuccess, ProductActions.addToBasketFailed),
      takeUntil(this.destroy$)
    )
      .subscribe(() => this.isProcessing = false);

    this.store.select((x) => x.basket.products).pipe(
      takeUntil(this.destroy$)
    )
      .subscribe((products) => products.includes(this.id()!));
  }

  onDelete() {
    this.store.dispatch(ProductActions.deleteProduct({ id: this.id()! }));
  }

  onAddToCart() {
    this.isProcessing = true;
    this.store.dispatch(ProductActions.addToBasket({ productId: this.id()! }));
  }
}
