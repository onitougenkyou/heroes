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
    this.newService.getPlayer().subscribe(data => this.Repdata = data)
  }

  onSave = function (user, isValid: boolean) {
    user.mode = this.valbutton;
    console.log(user)
    this.newService.savePlayer(user)
      .subscribe(data => {
        this.ngOnInit();
      }
      , error => this.errorMessage = error)

  }
  edit = function (kk) {
    this.id = kk._id;
    this.name = kk.name;
    this.weaponName = kk.weaponName;
    this.valbutton = "Update";
  }

  delete = function (id) {
    this.newService.deletePlayer(id)
      .subscribe(data => { this.ngOnInit(); }, error => this.errorMessage = error)
  }  
}
