import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

class Product {
    imageUrl: string = '';
    name: string = '';
    price: number = 0;
    rate: number = 0;
    state: string = '';
}

@Component({
    selector: 'product',
    standalone: true,
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss'
})
export class ProductComponent {
    name: string = "test";

    constructor(private http: HttpClient) {
        // This service can now make HTTP requests via `this.http`.  
    }

    ngOnInit() {
        console.log("component is initializing ...");
    }

    loadData() {
        console.log("loading data ...");

        this.http.get<Product[]>('https://localhost:44370').subscribe(products => {
            for (let index = 0; index < products.length; index++) {
                const element = products[index];

                console.log(element.imageUrl);
            }
        });
    }
}