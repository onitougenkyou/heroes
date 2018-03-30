import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, } from '@angular/forms';
import { PlayerService } from '../player.service';

import { Defense } from '../personnage/defense';
import { Weapon } from '../personnage/weapon';
import { Class } from '../personnage/class';
import { Inventaire } from '../personnage/inventaire';
import { Player } from '../personnage/player';
import { Monney } from '../personnage/monney';
import { Sell } from '../personnage/sell';


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
  playerDefine;


  ngOnInit() {
    this.newService.getPlayer().subscribe(data => this.Repdata = data);
  }

  onSave = function (player, isValid: boolean) {
    player.mode = this.valbutton;
    this.playerDefine = {
      id: player.id,
      name: player.name,
      level: player.level,
      class: {
        name: player.className,
        attributes: {
          pv: player.pv,
          strenght: player.strenght,
        }
      }
    }

    console.log('player', player, 'this.playerDefine', this.playerDefine)
    
    this.newService.savePlayer(this.playerDefine)
      .subscribe(data => {
        this.ngOnInit();
      }
      , error => this.errorMessage = error)

  }
  edit = function (kk) {
    this.id = kk._id;
    this.name = kk.name;
    this.className = kk.class.name;
    this.level = kk.level;
    this.pv = kk.class.attributes.pv;
    this.strenght = kk.class.attributes.strenght;
    this.valbutton = "Edit";
    this.mode = this.valbutton;
    console.log("THIS ID IS ",this.id, "KKKKK ==>", kk);
  }

  delete = function (id) {
    this.newService.deletePlayer(id)
      .subscribe(data => { this.ngOnInit(); }, error => this.errorMessage = error)
  }
}
