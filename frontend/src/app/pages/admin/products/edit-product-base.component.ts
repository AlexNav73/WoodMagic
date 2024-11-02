import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "edit-product-base",
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
export abstract class EditProductBaseComponent {
  private fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    name: this.fb.control<string>("", Validators.required),
    price: this.fb.control<number>(0, Validators.required),
  });

  abstract type: string;

  get name() {
    return this.form.controls.name;
  }

  get price() {
    return this.form.controls.price;
  }

  abstract onSubmit(): void;
}
