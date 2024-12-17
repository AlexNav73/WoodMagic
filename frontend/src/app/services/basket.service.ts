import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BasketService {
  private http = inject(HttpClient);

  public addToBasket(productId: string): Observable<HttpResponse<unknown>> {
    return this.http.post(`basket/add/${productId}`, {}, {
      observe: "response"
    });
  }

  public getAll(): Observable<string[]> {
    return this.http.get<string[]>("basket/get-all");
  }
}
