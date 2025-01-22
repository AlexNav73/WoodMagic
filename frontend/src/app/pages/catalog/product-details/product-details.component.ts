import {
  Component,
  DestroyRef,
  OnInit,
  inject,
  input,
  signal,
} from '@angular/core';

import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { GetProductByIdGQL } from '../../../generated/graphql';

interface ProductInfo {
  name: string;
}

@Component({
  selector: 'product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  private getProductById = inject(GetProductByIdGQL);
  private destroy$ = inject(DestroyRef);

  id = input.required<string>();

  info = signal<ProductInfo | null>(null);

  ngOnInit(): void {
    this.getProductById
      .fetch({ id: this.id() })
      .pipe(
        map(res => res.data.productById),
        takeUntilDestroyed(this.destroy$)
      )
      .subscribe(info => this.info.set(info ?? null));
  }

  get name(): string | undefined {
    return this.info()?.name;
  }
}
