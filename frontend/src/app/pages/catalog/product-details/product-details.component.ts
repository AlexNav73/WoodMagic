import { Component, inject, input, signal } from '@angular/core';

import { map, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { GetProductsGQL } from '../../../generated/graphql';

@Component({
  selector: 'product-details',
  imports: [AsyncPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  private readonly apollo = inject(GetProductsGQL);

  id = input.required<string>();
  name = input.required<string>();

  info = signal<Observable<any>>(of({}));

  onClicked() {
    this.info.set(
      this.apollo
        .fetch({
          name: this.name(),
        })
        .pipe(map(res => res.data.products?.nodes?.map(x => x.name).join(', ')))
    );
  }
}
