import { Component, computed, inject, input, InputSignal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";

import { Store } from "@ngrx/store";

import { Product } from "../../../model/product.interface";
import { MatButtonModule } from "@angular/material/button";
import { AppState } from "../../../store/app.states";
import { AsyncPipe } from "@angular/common";

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
}
