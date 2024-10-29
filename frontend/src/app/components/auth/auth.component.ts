import { Component, inject } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { AsyncPipe } from "@angular/common";

import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

import { AppState } from "../../store/app.states";
import { logout } from "../../store/actions/auth.actions";

@Component({
  selector: "app-auth",
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
  ],
  templateUrl: "./auth.component.html",
  styleUrl: "./auth.component.scss",
})
export class AuthComponent {
  private store = inject(Store<AppState>);

  isAuthenticated$: Observable<boolean> = this.store
    .select((state) => state.auth.isAuthenticated);

  onLogout() {
    this.store.dispatch(logout());
  }
}
