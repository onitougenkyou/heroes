import { Component, OnInit } from '@angular/core';
import { ClassService } from '../services/class.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss']
})
export class ClassDetailsComponent implements OnInit {

  persoDetails = null;
  error = null;
  errorMessage = null;

  constructor(private classService: ClassService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activeRoute.snapshot.params.id;
    this.classService.getOneClass(id)
      .subscribe(data => {
        this.handleServerResponse(data);
      },
      error => {
        this.handleError(error);
      })
  }


  handleServerResponse(response) {
    if (response.success) {
      this.persoDetails = response.class;
    } else {
      this.errorMessage = response.message;
    }
  }

  handleError(error) {
    console.log(error.statusText);
    this.error = error;
  }
}
