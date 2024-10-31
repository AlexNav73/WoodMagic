import { Component, computed, inject, input, InputSignal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { AsyncPipe } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";

import { Store } from "@ngrx/store";

import { Product } from "../../../model/product.interface";
import { AppState } from "../../../store/app.states";
import * as ProductActions from "../../../store/actions/product.actions";

@Component({
  selector: "product",
  standalone: true,
  imports: [MatCardModule, MatChipsModule, MatButtonModule, RouterLink, AsyncPipe],
  templateUrl: "./product.component.html",
  styleUrl: "./product.component.scss",
})
export class ProductComponent {
  private store: Store<AppState> = inject(Store<AppState>);

  info: InputSignal<Product | undefined> = input();

  isAuthenticated$ = this.store.select(x => x.auth.isAuthenticated);

  id = computed(() => this.info()?.id);
  name = computed(() => this.info()?.name);
  price = computed(() => this.info()?.price);

  onDelete() {
    this.store.dispatch(ProductActions.deleteProduct({ id: this.id()! }));
  }
}
