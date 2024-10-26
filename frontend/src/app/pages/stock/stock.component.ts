import { Component, inject, OnInit } from "@angular/core";
import { AsyncPipe } from "@angular/common";

import { tap } from "rxjs";
import { Store } from "@ngrx/store";

import { ProductComponent } from "../../components/product/product.component";
import { SpinnerComponent } from "../../components/spinner/spinner.component";
import { AppState } from "../../store/app.states";
import * as StockActions from "../../store/actions/stock.actions";
import { StockEffects } from "../../store/effects/stock.effects";

@Component({
    selector: 'stock',
    standalone: true,
    imports: [ProductComponent, SpinnerComponent, AsyncPipe],
    templateUrl: './stock.component.html',
    styleUrl: './stock.component.scss'
})
export class StockComponent implements OnInit {
    private store: Store<AppState> = inject(Store<AppState>);
    private stockEffects = inject(StockEffects);

    isLoading: boolean = false;
    products = this.store.select(x => x.stock.products);

    LoadAllSuccess$ = this.stockEffects.LoadAllSuccess$.subscribe(x => {
        this.isLoading = false;
    });

    ngOnInit() {
        this.isLoading = true;
        this.store.dispatch(StockActions.loadAll());
    }
}