import { Component, inject, OnInit } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { AsyncPipe } from "@angular/common";

import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

import { AppState } from "../../store/app.states";
import * as AuthActions from "../../store/actions/auth.actions";

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
export class AuthComponent implements OnInit {
  private store = inject(Store<AppState>);

  isAuthenticated$ = this.store.select((state) => state.auth.isAuthenticated);
  email$ = this.store.select((state) => state.auth.user);

  ngOnInit(): void {
    this.store.dispatch(AuthActions.updateCredentials());
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }
}
