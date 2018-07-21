import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as jwtDecode from 'jwt-decode';
import { window } from 'rxjs/operator/window';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  base_url = "http://localhost:3000/auth/";

  constructor(private http: Http, private router: Router) {

  }

  login(credentials) {
    return this.http.post(this.base_url + 'login', credentials)
      .map(res => res.json());
  }

  userIsLoggedIn() {
    return !!localStorage.getItem('local-data');
  }

  userIsAdmin(): boolean {
    let isAdmin: boolean = false;
    if (this.userIsLoggedIn()) {
      let user = JSON.parse(localStorage.getItem('local-data'));
      user = this.decodeToken(user.token);
      if (user.role === 'admin') {
        isAdmin = true;
      }
    }
    return isAdmin;
  }

  logOut() {
    localStorage.removeItem('local-data');
    localStorage.removeItem('player');
  }

  register(credentials) {
    return this.http.post(this.base_url + 'register', credentials)
      .map(res => res.json());
  }

  addAuthorizationHeader(token) {
    const authorizationHeader = new Headers({
      'Authorization': 'Bearer ' + token
    });

    return new RequestOptions({ headers: authorizationHeader });
  }

  decodeToken(token) {
    return jwtDecode(token);
  }
}
