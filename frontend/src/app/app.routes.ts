import { Routes } from "@angular/router";

import { CatalogComponent } from "./pages/catalog/catalog.component";
import { LoginComponent } from "./pages/login/login.component";
import { SignUpComponent } from "./pages/singUp/signUp.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";

export const routes: Routes = [
  { path: "catalog", component: CatalogComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: SignUpComponent },
  { path: "", redirectTo: "/catalog", pathMatch: "full" },
  { path: "**", component: NotFoundComponent },
];
