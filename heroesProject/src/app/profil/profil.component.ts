import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

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
