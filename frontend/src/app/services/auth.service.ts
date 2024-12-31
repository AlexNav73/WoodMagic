import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

type ErrorType = {
  [key: string]: string[];
};

interface RegisterResult {
  name: 'result';
  type: string;
  title: string;
  status: number;
  errors: ErrorType;
}

export interface UserInfo {
  id: string;
  email: string;
  isAdmin: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  logIn(email: string, password: string): Observable<HttpResponse<unknown>> {
    return this.http.post(
      'login',
      {
        email: email,
        password: password,
      },
      {
        params: {
          useCookies: true,
          useSessionCookies: true,
        },
        observe: 'response',
      }
    );
  }

  signUp(email: string, password: string): Observable<HttpResponse<unknown>> {
    return this.http.post<RegisterResult>(
      'register',
      {
        email: email,
        password: password,
      },
      {
        observe: 'response',
      }
    );
  }

  logout(): Observable<HttpResponse<unknown>> {
    return this.http.post(
      'user/logout',
      {},
      {
        observe: 'response',
      }
    );
  }

  getUser(): Observable<UserInfo> {
    return this.http.get<UserInfo>('user');
  }
}
