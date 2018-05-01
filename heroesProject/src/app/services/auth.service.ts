import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as jwtDecode from 'jwt-decode';

@Injectable()
export class AuthService {

  base_url = "http://localhost:3000/auth/";

  constructor(private http: Http) {

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
  }

  register(credentials) {
    console.log(credentials);
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
