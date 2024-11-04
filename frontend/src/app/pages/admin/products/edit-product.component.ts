import { Component, inject, input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

import { Store } from "@ngrx/store";

import { EditProductBaseComponent } from "./edit-product-base.component";
import { Product } from "../../../model/product.interface";
import * as ProductActions from "../../../store/actions/product.actions";
import { AppState } from "../../../store/app.states";
import { CatalogService } from "../../../services/catalog.service";

@Component({
  selector: "edit-product",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: "./edit-product-base.component.html",
  styleUrl: "./edit-product-base.component.scss",
})
export class EditProductComponent extends EditProductBaseComponent
  implements OnInit {
  private store: Store<AppState> = inject(Store<AppState>);
  private catalogService = inject(CatalogService);

  id = input.required<string>();

  override type: string = "Edit";

  ngOnInit(): void {
    this.catalogService.get(this.id())
      .subscribe((product) => {
        this.form.controls.name.setValue(product.name);
        this.form.controls.price.setValue(product.price);
      });
  }

  override onSubmit(): void {
    const product: Product = {
      id: this.id(),
      name: this.name.value,
      imageUrl: "",
      price: this.price.value,
      rate: 0,
      state: "Started",
    };
    this.store.dispatch(ProductActions.update(product));
  }
}
