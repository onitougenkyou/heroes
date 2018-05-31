import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user = null;
  isLoggin: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    if (this.authService.userIsLoggedIn()) {
      const localToken = JSON.parse(localStorage.getItem('local-data'));
      this.user = this.authService.decodeToken(localToken.token);
      console.log(this.user);
      this.isLoggin = true;
    }
  }

}
