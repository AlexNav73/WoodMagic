import { Component, inject, input, signal } from '@angular/core';

import { map, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { GetProductByIdGQL } from '../../../generated/graphql';

interface ProductInfo {
  name: string;
}

@Component({
  selector: 'product-details',
  imports: [AsyncPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  private readonly apollo = inject(GetProductByIdGQL);

  id = input.required<string>();
  name = input.required<string>();

  info = signal<Observable<ProductInfo | null>>(of(null));

  constructor() {
    this.info.set(
      this.apollo
        .fetch({ id: this.id() })
        .pipe(map(res => res.data.productById!))
    );
  }
}
