import { inject, Injectable } from "@angular/core";

import { catchError, map, of, switchMap } from "rxjs";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { StockService } from "../../services/stock.service";
import * as StockActions from "../actions/stock.actions";

@Injectable()
export class StockEffects {
  private actions = inject(Actions);
  private stockService = inject(StockService);

  LoadAll$ = createEffect(() =>
    this.actions.pipe(
      ofType(StockActions.loadAll),
      switchMap(() => {
        return this.stockService.loadAll().pipe(
          map((products) => {
            return StockActions.loadAllSuccess({ products: products });
          }),
          catchError((error) => {
            console.log(error.error);
            return of(StockActions.loadAllFailed({ reason: "REASON" }));
          }),
        );
      }),
    )
  );
}
