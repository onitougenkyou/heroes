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
import { Attributes } from '../personnage/attributes';

import { Http, Response, Headers, RequestOptions } from '@angular/http';


@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss']
})
export class PlayerFormComponent implements OnInit {

  constructor(private newService: PlayerService, ) { }
  Repdata;
  valbutton = "Save";
  playerDefine;
  userChoice;
  playerArray = [];
  playerName;


  ngOnInit() {
    this.newService.getPlayer().subscribe(data => this.Repdata = data);
    this.definePlayerClass();
  }

  /**
   * Appel les différentes méthodes de création de personnage pour remplir le tableau arrayOfPlayerClass
   */
  definePlayerClass() {
    this.defineBarbare();
  }

  /**
   * Définit la classe barbare
   */
  defineBarbare() {
    var weaponValue = new Monney(10);
    var barbareWeapon = new Weapon("Hache à deux mains", weaponValue, 5, 1);
    let defValue = new Monney(0);
    var barbareDefense = new Defense("", defValue, 0, 1);
    var sellObject = new Sell("bibelots", new Monney(5));
    var barbareSell: Array<Sell> = [sellObject, sellObject];
    var barbareInventaire = new Inventaire(barbareWeapon, barbareDefense, new Monney(50), barbareSell);
    var barbareAttributes = new Attributes(150, 10, 4, 5, 5, 6);
    var barbareClass = new Class('barbare', barbareAttributes);
    var barbare = new Player('', 1, 0, barbareClass, barbareInventaire, true);

    this.playerArray.push(barbare);
    console.log(barbare);
  }

  /**
   * Permet la sauvegarde du joueur 
   */
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
    console.log("THIS ID IS ", this.id, "KKKKK ==>", kk);
  }

  delete = function (id) {
    this.newService.deletePlayer(id)
      .subscribe(data => { this.ngOnInit(); }, error => this.errorMessage = error)
  }
}
