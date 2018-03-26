import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class PlayerService {

  constructor(private http: Http) { }

  savePlayer(player) {
    return this.http.post('http://localhost:8080/api/SavePlayer/', player).map((response: Response) => response.json())
  }

  getPlayer() {
    return this.http.get('http://localhost:8080/api/getPlayer/').map((response: Response) => response.json())
  }

  deletePlayer(id) {
    return this.http.post('http://localhost:8080/api/deletePlayer/', {'id':id}).map((response: Response)=>response.json())
  }
}
