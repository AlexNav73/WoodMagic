import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { GetUserGQL } from '../generated/graphql';

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
  private userService = inject(GetUserGQL);

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
    return this.userService.fetch().pipe(
      map(response => ({
        id: response.data.userInfo.at(0)?.id!,
        email: response.data.userInfo.at(0)?.email!,
        isAdmin: response.data.isAdmin,
      }))
    );
  }
}
