import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Subject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';


@Injectable()
export class MonsterService {

  classArray = [];
  classSubject = new Subject();
  initialClass = [];
  base_url = 'http://localhost:3000/';

  constructor(private http: Http, private authService: AuthService) { }

  getMonster() {
    return this.http.get(this.base_url + 'api/monsters')
      .map(res => res.json());
  }

  addMonster(monsterData, token) {
    console.log('Monster', monsterData);
    const requestOptions = this.authService.addAuthorizationHeader(token);
    if (requestOptions) {
      return this.http.post(this.base_url + "api/monsters", monsterData)
        .map(res => {
          this.classSubject.next(monsterData);
        })
    }
  }

  getOneMonster(id) {
    return this.http.get(this.base_url + 'api/monsters/' + id)
      .map(res => res.json());
  }
}
