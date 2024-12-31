import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

import { Store } from '@ngrx/store';

import { AppState } from '../../../store/app.states';
import * as ProductActions from '../../../store/actions/product.actions';
import { Product } from '../../../model/product.interface';
import { EditProductBaseComponent } from './edit-product-base.component';

@Component({
  selector: 'add-product',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './edit-product-base.component.html',
  styleUrl: './edit-product-base.component.scss',
})
export class AddProductComponent extends EditProductBaseComponent {
  private store: Store<AppState> = inject(Store<AppState>);

  override type: string = 'Create';

  override onSubmit() {
    const product: Product = {
      id: null,
      name: this.name.value,
      imageUrl: '',
      price: this.price.value,
      rate: 0,
      state: 'Started',
    };
    this.store.dispatch(ProductActions.create(product));
  }
}
