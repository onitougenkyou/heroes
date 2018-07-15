import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user = null;
  isLoggin: boolean = false;
  userHaveAParty: boolean = false;
  allPlayer = null;
  currentPlayer = null;

  constructor(private authService: AuthService, private playerService: PlayerService) { }

  ngOnInit() {
    this.getUserData();
  }

  /**
   * Récupère les données de l'utilisateur
   */
  getUserData() {
    if (this.authService.userIsLoggedIn()) {
      const localToken = JSON.parse(localStorage.getItem('local-data'));
      this.user = this.authService.decodeToken(localToken.token);
      console.log(this.user);
      this.isLoggin = true;
      this.getPlayerInfo(this.user.name);
    }
  }

  /**
   * Permet de récupérer les infos du joueur
   * @param accountName
   */
  getPlayerInfo(accountName) {
    this.playerService.getPlayer().subscribe(
      data => {
        this.allPlayer = data;
        this.getCurrentPlayer(data);
      },
      error => { console.error(error) }
    );
  }

  getCurrentPlayer(allPlayer: Array<any>) {
    for (let i = 0; i < allPlayer.length; i++) {
      if (allPlayer[i].accountName === this.user.name) {
        this.currentPlayer = allPlayer[i];
      }
    }
    if (this.currentPlayer != null) {
      this.userHaveAParty = true;
    }
    
    console.log("CURRENT PLAYER",this.currentPlayer);
  }

}
