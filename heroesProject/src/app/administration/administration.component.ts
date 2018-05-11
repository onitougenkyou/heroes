import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  decodeToken = null;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.userIsLoggedIn()) {
      const localToken = JSON.parse(localStorage.getItem('local-data'));
      this.decodeToken = this.authService.decodeToken(localToken.token);
      if (this.decodeToken && this.decodeToken.role === 'admin') {
        this.isAdmin = true;
      }
    }
  }

}
