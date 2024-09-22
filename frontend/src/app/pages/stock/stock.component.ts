import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

import { Product } from "../../../model/product";
import { ProductComponent } from "../../../components/product/product.component";

@Component({
    selector: 'stock',
    standalone: true,
    imports: [ProductComponent],
    templateUrl: './stock.component.html',
    styleUrl: './stock.component.scss'
})
export class StockComponent {
    products: Product[] = [];

    constructor(private http: HttpClient) {
        // This service can now make HTTP requests via `this.http`.  
    }

    ngOnInit() {
        this.http.get<Product[]>('http://localhost:29473').subscribe(products => {
            this.products = products;
        });
    }
}