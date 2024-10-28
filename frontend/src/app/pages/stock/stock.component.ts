import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import { ProductComponent } from "../../components/product/product.component";
import { SpinnerComponent } from "../../components/spinner/spinner.component";
import { AppState } from "../../store/app.states";
import * as StockActions from "../../store/actions/stock.actions";

@Component({
  selector: "stock",
  standalone: true,
  imports: [MatPaginatorModule, ProductComponent, SpinnerComponent, AsyncPipe],
  templateUrl: "./stock.component.html",
  styleUrl: "./stock.component.scss",
})
export class StockComponent implements OnInit, OnDestroy {
  private store: Store<AppState> = inject(Store<AppState>);
  private route = inject(ActivatedRoute);

  private subscription?: Subscription;

  isLoading$ = this.store.select((x) => x.stock.isLoading);
  products$ = this.store.select((x) => x.stock.products);

  index: number = 0;
  count: number = 10;

  ngOnInit() {
    this.subscription = this.route.queryParamMap.subscribe(params => {
        let page: number | undefined;
        if (params.has("page")) {
          page = Number(params.get("page"));
        }
        let count: number | undefined;
        if (params.has("count")) {
          count = Number(params.get("count"));
        }

        this.index = page ?? 0;
        this.count = count ?? 10;
        this.store.dispatch(StockActions.load({ page, count }));
    });
  }

  onPageSet(e: PageEvent) {
    this.count = e.pageSize;
    this.index = e.pageIndex;

    this.store.dispatch(StockActions.load({ page: this.index, count: this.count }));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
