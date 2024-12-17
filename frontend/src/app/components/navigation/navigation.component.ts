import { Component, inject } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatBadgeModule } from '@angular/material/badge';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AsyncPipe } from "@angular/common";

import { Store } from "@ngrx/store";

import { AuthComponent } from "../auth/auth.component";
import { AppState } from "../../store/app.states";
import { BasketComponent } from "../basket/basket.component";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrl: "./navigation.component.scss",
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
    AuthComponent,
    AsyncPipe,
    BasketComponent
  ],
})
export class NavigationComponent {
  private store: Store<AppState> = inject(Store<AppState>);

  isAdmin$ = this.store.select((x) => x.auth.isAdmin);
}
