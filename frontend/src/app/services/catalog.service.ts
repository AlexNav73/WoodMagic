import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Product, ProductInfo } from '../model/product.interface';

interface ProductList {
  products: Product[];
  count: number;
}

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private http = inject(HttpClient);

  public load(page?: number, count?: number): Observable<ProductList> {
    let params = {};
    if (page) {
      params = { page };
    }
    if (count) {
      params = { ...params, count };
    }

    return this.http.get<ProductList>('products/load', {
      params,
    });
  }

  public get(id: string): Observable<Product> {
    return this.http.get<Product>(`products/${id}`);
  }

  public create(product: Product): Observable<HttpResponse<unknown>> {
    return this.http.post('products/add', product, {
      observe: 'response',
    });
  }

  public update(product: ProductInfo): Observable<HttpResponse<unknown>> {
    return this.http.post('products/update', product, {
      observe: 'response',
    });
  }

  public delete(id: string): Observable<HttpResponse<unknown>> {
    return this.http.post(
      'products/delete',
      {},
      {
        observe: 'response',
        params: { id },
      }
    );
  }
}
