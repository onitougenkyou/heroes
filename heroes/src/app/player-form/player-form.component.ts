import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, } from '@angular/forms';
import { PlayerService } from '../player.service';

import { Http, Response, Headers, RequestOptions } from '@angular/http';


@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.sass']
})
export class PlayerFormComponent implements OnInit {

  constructor(private newService: PlayerService, ) { }
  Repdata;
  valbutton = "Save";


  ngOnInit() {
    this.newService.getPlayer().subscribe(data => this.Repdata = data);
  }

  onSave = function (player, isValid: boolean) {
    player.mode = this.valbutton;
    let playerParse = {
      name: player.playerName,
      class: {
        name: player.className
      }
    }
    console.log(playerParse);
    this.newService.savePlayer(playerParse)
      .subscribe(data => {
        this.ngOnInit();
      }
      , error => this.errorMessage = error)

  }
  edit = function (kk) {
    this.id = kk._id;
    this.playerName = kk.player.name;
    this.className = kk.class.name;
    this.valbutton = "Update";
  }

  delete = function (id) {
    this.newService.deletePlayer(id)
      .subscribe(data => { this.ngOnInit(); }, error => this.errorMessage = error)
  }
}
