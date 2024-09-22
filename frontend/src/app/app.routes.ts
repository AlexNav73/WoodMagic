import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { StockComponent } from './pages/stock/stock.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: "home", component: HomeComponent },
    { path: "stock", component: StockComponent }
];
