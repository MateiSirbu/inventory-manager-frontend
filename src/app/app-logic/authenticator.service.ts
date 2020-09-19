import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import * as moment from "moment"
import { shareReplay, tap } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post<User>('/api/login', user)
      .pipe(tap(res => this.setSession), shareReplay());
  }

  signup(user: User) {
    return this.http.post<User>('/api/register', user);
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }
}
