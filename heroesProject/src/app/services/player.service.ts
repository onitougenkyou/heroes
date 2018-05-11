import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class PlayerService {

  base_url = 'http://localhost:3000/';

  constructor(private http: Http) { }

  savePlayer(player) {
    return this.http.post(this.base_url + 'api/savePlayer/', player).map((response: Response) => response.json())
  }

  getPlayer() {
    return this.http.get(this.base_url + 'api/getPlayer/').map((response: Response) => response.json())
  }

  deletePlayer(id) {
    return this.http.post(this.base_url + 'api/deletePlayer/', { 'id': id }).map((response: Response) => response.json())
  }
}
