import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Subject, takeUntil } from "rxjs";
import { Store } from "@ngrx/store";
import { Actions, ofType } from "@ngrx/effects";

import { ProductComponent } from "./product/product.component";
import { AppState } from "../../store/app.states";
import * as CatalogActions from "../../store/actions/catalog.actions";
import * as ProductActions from "../../store/actions/product.actions";

const defaultPageIndex: number = 0;
const defaultPageSize: number = 10;

@Component({
  selector: "catalog",
  standalone: true,
  imports: [MatPaginatorModule, MatProgressSpinnerModule, ProductComponent, AsyncPipe],
  templateUrl: "./catalog.component.html",
  styleUrl: "./catalog.component.scss",
})
export class CatalogComponent implements OnInit, OnDestroy {
  private store: Store<AppState> = inject(Store<AppState>);
  private route = inject(ActivatedRoute);
  private actions = inject(Actions);

  private destroy$ = new Subject<void>();

  isLoading$ = this.store.select((x) => x.catalog.isLoading);
  products$ = this.store.select((x) => x.catalog.products);
  length$ = this.store.select((x) => x.catalog.count);

  pageIndex: number = defaultPageIndex;
  pageSize: number = defaultPageSize;

  constructor() {
    this.actions
      .pipe(
        ofType(ProductActions.deleteSuccess),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.store.dispatch(
          CatalogActions.load({ page: this.pageIndex, count: this.pageSize }),
        );
      });
  }

  ngOnInit() {
    this.route.queryParamMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      let page: number | undefined;
      if (params.has("page")) {
        page = Number(params.get("page"));
      }
      let count: number | undefined;
      if (params.has("count")) {
        count = Number(params.get("count"));
      }

      this.pageIndex = page ?? defaultPageIndex;
      this.pageSize = count ?? defaultPageSize;
      this.store.dispatch(CatalogActions.load({ page, count }));
    });
  }

  onPageSet(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.store.dispatch(
      CatalogActions.load({ page: this.pageIndex, count: this.pageSize }),
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
