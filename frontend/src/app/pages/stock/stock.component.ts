import { Component, inject, OnInit } from "@angular/core";
import { AsyncPipe } from "@angular/common";

import { Store } from "@ngrx/store";

import { ProductComponent } from "../../components/product/product.component";
import { SpinnerComponent } from "../../components/spinner/spinner.component";
import { AppState } from "../../store/app.states";
import * as StockActions from "../../store/actions/stock.actions";

@Component({
  selector: "stock",
  standalone: true,
  imports: [ProductComponent, SpinnerComponent, AsyncPipe],
  templateUrl: "./stock.component.html",
  styleUrl: "./stock.component.scss",
})
export class StockComponent implements OnInit {
  private store: Store<AppState> = inject(Store<AppState>);

  isLoading$ = this.store.select((x) => x.stock.isLoading);
  products$ = this.store.select((x) => x.stock.products);

  ngOnInit() {
    this.store.dispatch(StockActions.loadAll());
  }
}
