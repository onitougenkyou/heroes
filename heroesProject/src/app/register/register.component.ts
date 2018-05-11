import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errorMessage = null;
  formIsInvalid: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }


  register(formData) {
    this.authService.register(formData)
      .subscribe(
      data => this.handleRegisterSuccess(data),
      error => this.handleRegisterFailure(error)
      )
  }

  handleRegisterSuccess(response) {
    if (response.success === false) {
      console.log(response);
      this.handleRegisterFailure(response.message);
    } else {
      this.router.navigate(['/']);
    }
  }

  handleRegisterFailure(error) {
    this.formIsInvalid = true;
    this.errorMessage = error;
    console.error('ERREUR ',error);
  }
}
