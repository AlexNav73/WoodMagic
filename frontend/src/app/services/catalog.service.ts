import { HttpClient, HttpRequest, HttpResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
import { Product } from "../model/product.interface";

interface ProductList {
  products: Product[];
  count: number;
}

@Injectable({ providedIn: "root" })
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

    return this.http.get<ProductList>(environment.apiUrl + "/products/load", { params });
  }

  public create(product: Product): Observable<HttpResponse<unknown>> {
    return this.http.post(environment.apiUrl + "/products/add", product, {
      observe: "response"
    });
  }

  public update(product: Product): Observable<HttpResponse<unknown>> {
    return this.http.post(environment.apiUrl + "/products/update", product, {
      observe: "response"
    });
  }
}
