import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { AuthService } from './auth.service';

@Injectable()
export class PlayerService {

  base_url = 'http://localhost:3000/';

  constructor(private http: Http, private authService: AuthService) { }

  savePlayer(player, token) {
    const requestOptions = this.authService.addAuthorizationHeader(token);
    if (requestOptions) {
      return this.http.post(this.base_url + 'api/savePlayer/', player).map((response: Response) => response.json())
    }
  }

  addPlayer(player, token) {
    const requestOptions = this.authService.addAuthorizationHeader(token);
    if (requestOptions) {
      return this.http.post(this.base_url + 'api/addPlayer/', player).map((response: Response) => response.json())
    }
  }

  getPlayer() {
    return this.http.get(this.base_url + 'api/getPlayer/').map((response: Response) => response.json())
  }

  getCurrentPlayer(account) {
    return this.http.get(this.base_url + 'api/getCurrentPlayer/' + account)
      .map(res => res.json());
  }

  deletePlayer(id) {
    return this.http.post(this.base_url + 'api/deletePlayer/', { 'id': id }).map((response: Response) => response.json())
  }
}
