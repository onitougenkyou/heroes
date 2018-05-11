import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  local = null;
  isAuthenticated: boolean = false;
  message = null;
  loginFail: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.userIsLoggedIn()) {
      this.refreshFlag();

    }
  }

  refreshFlag() {
    this.isAuthenticated = true;
    this.message = "Bienvenue";
  }

  login(formData) {
    this.authService.login(formData)
      .subscribe(data => {
        this.handleLoginSuccess(data);
      },
      error => {
        console.log(error);
        this.handleLoginFailer(error);
      });
  }

  handleLoginSuccess(response) {
    this.local = response;
    this.refreshFlag();
    localStorage.setItem('local-data', JSON.stringify(response));
  }

  handleLoginFailer(error) {
    this.loginFail = true;
    this.message = "Erreur d'identifiant";
    console.error('fail', error);
  }
}
