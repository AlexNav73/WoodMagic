import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import { ProductComponent } from "./product/product.component";
import { SpinnerComponent } from "../../components/spinner/spinner.component";
import { AppState } from "../../store/app.states";
import * as CatalogActions from "../../store/actions/catalog.actions";

@Component({
  selector: "catalog",
  standalone: true,
  imports: [MatPaginatorModule, ProductComponent, SpinnerComponent, AsyncPipe],
  templateUrl: "./catalog.component.html",
  styleUrl: "./catalog.component.scss",
})
export class CatalogComponent implements OnInit, OnDestroy {
  private store: Store<AppState> = inject(Store<AppState>);
  private route = inject(ActivatedRoute);

  private subscription?: Subscription;

  isLoading$ = this.store.select((x) => x.catalog.isLoading);
  products$ = this.store.select((x) => x.catalog.products);
  length$ = this.store.select((x) => x.catalog.count);

  pageIndex: number = 0;
  pageSize: number = 10;

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

        this.pageIndex = page ?? 0;
        this.pageSize = count ?? 10;
        this.store.dispatch(CatalogActions.load({ page, count }));
    });
  }

  onPageSet(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.store.dispatch(CatalogActions.load({ page: this.pageIndex, count: this.pageSize }));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
