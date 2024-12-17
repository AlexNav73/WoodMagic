import { Component, input } from "@angular/core";

@Component({
  selector: "product-details",
  imports: [],
  templateUrl: "./product-details.component.html",
  styleUrl: "./product-details.component.scss",
})
export class ProductDetailsComponent {
  id = input.required<string>();
}
