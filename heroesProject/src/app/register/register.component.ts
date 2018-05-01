import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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
    this.router.navigate(['/']);
  }

  handleRegisterFailure(error) {
    console.error('ERREUR ',error);
  }
}
