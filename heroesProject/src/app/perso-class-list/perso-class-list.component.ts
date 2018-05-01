import { Component, OnInit } from '@angular/core';
import { ClassService } from '../services/class.service';

@Component({
  selector: 'app-perso-class-list',
  templateUrl: './perso-class-list.component.html',
  styleUrls: ['./perso-class-list.component.scss']
})
export class PersoClassListComponent implements OnInit {

  classArray = [];
  error = "";

  constructor(private classService: ClassService) { }

  ngOnInit() {
    this.classService.getClass()
      .subscribe(
      data => this.classArray = data,
      error => {
        console.error(error);
        this.error = error;
      }
    );
    this.classService.classSubject.subscribe(data => {
      this.classArray = [data, ...this.classArray]
    })
  }

}
