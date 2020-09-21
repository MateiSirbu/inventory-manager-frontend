import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import * as moment from "moment"
import { shareReplay, tap } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class Authenticator {

  constructor(private http: HttpClient) { }

  logIn(email: string, password: string) {
    return this.http.post('/api/login', { email: email, password: password })
      .pipe(tap(res => this.setSession(res)), shareReplay());
  }


  signUp(user: User) {
    return this.http.post('/api/register', { firstName: user.firstName, lastName: user.lastName, email: user.email, hash: user.hash });
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  getAuthenticatedUserInfo() {
    return this.http.post<User>('/api/login/userinfo', { idToken: localStorage.getItem('id_token') });
  }

  logOut() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpirationTimestamp());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpirationTimestamp() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
