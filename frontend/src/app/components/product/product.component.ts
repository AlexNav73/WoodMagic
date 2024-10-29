import { Component, computed, input, InputSignal } from "@angular/core";

import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";

import { Product } from "../../model/product.interface";

@Component({
  selector: "product",
  standalone: true,
  imports: [MatCardModule, MatChipsModule],
  templateUrl: "./product.component.html",
  styleUrl: "./product.component.scss",
})
export class ProductComponent {
  info: InputSignal<Product | undefined> = input();

  name = computed(() => this.info()?.name);
}
