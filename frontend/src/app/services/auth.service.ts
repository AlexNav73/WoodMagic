import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";

import { map, Observable, of } from "rxjs";

import { environment } from "../../environments/environment";

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

  logIn(email: string, password: string): Observable<HttpResponse<unknown>> {
    return this.http.post(environment.apiUrl + "/login", {
      email: email,
      password: password,
    }, {
      params: {
        useCookies: true,
        useSessionCookies: true
      },
      observe: "response"
    });
  }

  signUp(email: string, password: string): Observable<HttpResponse<unknown>> {
    return this.http.post<RegisterResult>(environment.apiUrl + "/register", {
      email: email,
      password: password,
    }, {
      observe: "response"
    });
  }

  logout(): Observable<HttpResponse<unknown>> {
    return this.http.post(environment.apiUrl + "/logout", {}, {
      observe: "response",
    });
  }

  getUser(): Observable<string> {
    return this.http.get<string>(environment.apiUrl + "/user");
  }
}
