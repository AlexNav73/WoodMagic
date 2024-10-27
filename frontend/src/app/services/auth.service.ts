import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";

import { map, Observable } from "rxjs";

import { environment } from "../../environments/environment";
import { User } from "../model/user";

interface LoginResult {
  name: "result";
  tokenType: string;
  refreshToken: string;
  expiresIn: number;
  accessToken: string;
}

type ErrorType = {
  [key: string]: string[];
};

interface RegisterResult {
  name: "result";
  type: string;
  title: string;
  status: number;
  errors: ErrorType;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  private http = inject(HttpClient);

  logIn(email: string, password: string): Observable<User> {
    return this.http.post<LoginResult>(environment.apiUrl + "/login", {
      email: email,
      password: password,
    }).pipe(
      map((result) => {
        return { email: email, password: password, token: result.accessToken };
      }),
    );
  }

  signUp(email: string, password: string): Observable<User> {
    return this.http.post<RegisterResult>(environment.apiUrl + "/register", {
      email: email,
      password: password,
    }).pipe(
      map(() => {
        return { email: email, password: password };
      }),
    );
  }

  logout(token: string): Observable<HttpResponse<object>> {
    return this.http.post(environment.apiUrl + "/logout", {}, {
      observe: "response",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
