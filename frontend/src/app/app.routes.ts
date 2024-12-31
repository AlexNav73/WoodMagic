import { Routes } from '@angular/router';

import { CatalogComponent } from './pages/catalog/catalog.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/singUp/signUp.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AddProductComponent } from './pages/admin/products/add-product.component';
import { ProductDetailsComponent } from './pages/catalog/product-details/product-details.component';
import { EditProductComponent } from './pages/admin/products/edit-product.component';

export const routes: Routes = [
  { path: 'catalog', component: CatalogComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'product/add', component: AddProductComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'product/edit/:id', component: EditProductComponent },
  { path: '', redirectTo: '/catalog', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
