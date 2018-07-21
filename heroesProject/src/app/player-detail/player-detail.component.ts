import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit {

  user = null;
  playerData = null;

  constructor(private playerService: PlayerService, private authService: AuthService) { }

  ngOnInit() {

    const localPlayer = JSON.parse(localStorage.getItem('player'));
    this.playerData = localPlayer;
    console.log('PLAYER', this.playerData);
  }
}
