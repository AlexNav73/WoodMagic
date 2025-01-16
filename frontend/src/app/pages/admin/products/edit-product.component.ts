import { Component, inject, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { map } from 'rxjs';
import { Store } from '@ngrx/store';

import { EditProductBaseComponent } from './edit-product-base.component';
import { ProductInfo } from '../../../model/product.interface';
import * as ProductActions from '../../../store/actions/product.actions';
import { AppState } from '../../../store/app.states';
import { GetProductByIdGQL } from '../../../generated/graphql';

@Component({
  selector: 'edit-product',
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
export class EditProductComponent
  extends EditProductBaseComponent
  implements OnInit
{
  private store: Store<AppState> = inject(Store<AppState>);
  private getProductQuery = inject(GetProductByIdGQL);

  id = input.required<string>();

  override type: string = 'Edit';

  ngOnInit(): void {
    this.getProductQuery
      .fetch({ id: this.id() })
      .pipe(map(result => result.data.productById!))
      .subscribe(product => {
        this.form.controls.name.setValue(product.name);
        this.form.controls.price.setValue(product.price);
      });
  }

  override onSubmit(): void {
    const product: ProductInfo = {
      id: this.id(),
      name: this.name.value,
      price: this.price.value,
    };
    this.store.dispatch(ProductActions.update(product));
  }
}
