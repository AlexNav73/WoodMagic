import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
import { IProduct } from "../model/product";

@Injectable({ providedIn: "root" })
export class StockService {
  private http = inject(HttpClient);

  public load(page?: number, count?: number): Observable<IProduct[]> {
    let params = {};
    if (page) {
      params = { page };
    }
    if (count) {
      params = { ...params, count };
    }

    return this.http.get<IProduct[]>(environment.apiUrl, { params });
  }
}
