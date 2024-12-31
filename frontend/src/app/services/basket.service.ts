import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BasketService {
  private http = inject(HttpClient);

  public addToBasket(productId: string): Observable<boolean> {
    return this.http.post<boolean>(`basket/add/${productId}`, {});
  }

  public removeFromBasket(productId: string): Observable<boolean> {
    return this.http.post<boolean>(`basket/remove/${productId}`, {});
  }

  public getAll(): Observable<string[]> {
    return this.http.get<string[]>('basket/get-all');
  }

  public clear(): Observable<HttpResponse<unknown>> {
    return this.http.post(
      'basket/clear',
      {},
      {
        observe: 'response',
      }
    );
  }
}
