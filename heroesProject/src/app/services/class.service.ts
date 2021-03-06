import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Subject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class ClassService {

  classArray = [];
  classSubject = new Subject();
  initialClass = [];

  base_url = 'http://localhost:3000/';

  constructor(private http: Http, private authService: AuthService) { }

  getClass() {
    return this.http.get(this.base_url + 'api/characters')
      .map(res => res.json());
  }

  addClass(classData, token) {
    const requestOptions = this.authService.addAuthorizationHeader(token);
    if (requestOptions) {
      return this.http.post(this.base_url + "api/characters", classData)
        .map(res => {
          this.classSubject.next(classData);
        })
    }
  }

  getOneClass(id) {
    return this.http.get(this.base_url + 'api/characters/' + id)
      .map(res => res.json());
  }
}
