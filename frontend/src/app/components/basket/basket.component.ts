import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from "@angular/material/icon";

import { Store } from '@ngrx/store';

import { AppState } from '../../store/app.states';
import * as ProductActions from '../../store/actions/product.actions';

@Component({
  selector: 'basket',
  imports: [
    MatButtonModule,
    MatBadgeModule,
    MatIconModule,
    AsyncPipe
  ],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit {
  private store: Store<AppState> = inject(Store<AppState>);

  productsCount$ = this.store.select(x => x.basket.products.length);

  ngOnInit(): void {
    this.store.dispatch(ProductActions.refreshBasket());
  }
}
