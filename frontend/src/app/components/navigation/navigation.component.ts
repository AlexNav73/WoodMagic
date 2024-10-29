import { Component, inject } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AsyncPipe } from "@angular/common";

import { Store } from "@ngrx/store";

import { AuthComponent } from "../auth/auth.component";
import { AppState } from "../../store/app.states";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrl: "./navigation.component.scss",
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    AuthComponent,
    AsyncPipe
  ],
})
export class NavigationComponent {
  private store: Store<AppState> = inject(Store<AppState>);

  isAuthorized$ = this.store.select(x => x.auth.isAuthenticated);
}
