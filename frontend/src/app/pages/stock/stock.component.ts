import { HttpClient } from "@angular/common/http";
import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { IProduct } from "../../model/product";
import { ProductComponent } from "../../components/product/product.component";
import { SpinnerComponent } from "../../components/spinner/spinner.component";
import { environment } from "../../../environments/environment";

@Component({
    selector: 'stock',
    standalone: true,
    imports: [ProductComponent, SpinnerComponent],
    templateUrl: './stock.component.html',
    styleUrl: './stock.component.scss'
})
export class StockComponent implements OnInit, OnDestroy {
    private http = inject(HttpClient);

    private subscription!: Subscription;

    isLoading: boolean = false;
    products: IProduct[] = [];

    ngOnInit() {
        this.isLoading = true;

        this.subscription = this.http.get<IProduct[]>(environment.apiUrl).subscribe(products => {
            this.products = products;

            this.isLoading = false;
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}