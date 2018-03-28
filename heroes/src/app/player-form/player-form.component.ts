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
  p;


  ngOnInit() {
    this.newService.getPlayer().subscribe(data => this.Repdata = data);
  }

  onSave = function (player, isValid: boolean) {
    player.mode = this.valbutton;
    this.p = {
      name: player.name,
      level: player.level,
      class: {
        name: player.className,
        pv: player.pv
      }
    }

    console.log(this.p)
    this.newService.savePlayer(player)
      .subscribe(data => {
        this.ngOnInit();
      }
      , error => this.errorMessage = error)

  }
  edit = function (kk) {
    console.log(kk, 'this', this);
    this.id = kk._id;
    this.name = kk.name;
    this.className = kk.class.name;
    this.level = kk.level;
    this.pv = kk.class.attributes.pv;
    this.valbutton = "Update";
  }

  delete = function (id) {
    this.newService.deletePlayer(id)
      .subscribe(data => { this.ngOnInit(); }, error => this.errorMessage = error)
  }
}
