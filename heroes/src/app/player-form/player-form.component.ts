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
  userChoiceDone: boolean = false;


  ngOnInit() {
    this.definePlayerClass();
  }

  /**
   * Appel les différentes méthodes de création de personnage pour remplir le tableau arrayOfPlayerClass
   */
  definePlayerClass() {
    this.defineBarbare();
    this.defineArcher();
    this.defineSorcier();
    this.defineWarrior();
  }

  /**
   * Définit la classe barbare
   */
  defineBarbare() {
    var weaponValue = new Monney(10);
    var barbareWeapon = new Weapon("Hache à deux mains", weaponValue, 5, 1);
    let defValue = new Monney(10);
    var barbareDefense = new Defense("Armure en peau", defValue, 3, 1);
    var sellObject = new Sell("bibelots", new Monney(5));
    var barbareSell: Array<Sell> = [sellObject, sellObject];
    var barbareInventaire = new Inventaire(barbareWeapon, barbareDefense, new Monney(50), barbareSell);
    var barbareAttributes = new Attributes(150, 10, 9, 4, 5, 5, 6);
    var barbareDescription = "Pour certains individus, tout n’est que rage. Que ce soit dans les coutumes de leur peuple, dans la fureur de leurs passions ou dans leurs cris de bataille, la seule chose qu’ils connaissent est le conflit. Il s’agit de sauvages, de mercenaires qui louent leurs services ou encore d’experts en techniques martiales violentes. Ce ne sont ni des soldats ni des guerriers professionnels mais des créatures entièrement dévouées à la bataille et au carnage, des esprits de la guerre. Ces combattants, connus sous le nom de barbares, font peu de cas de l’entraînement, de la préparation ou des règles d’affrontement. Seuls comptent pour eux le moment présent, les ennemis qui se tiennent devant eux et le fait de savoir que la mort pourrait les surprendre à tout moment. Ils possèdent un sixième sens pour le danger et sont suffisamment endurants pour supporter tout ce qui pourrait leur arriver. Ces combattants violents peuvent apparaître au sein de n’importe quelle communauté, qu’elle soit civilisée ou primitive, mais, dans les recoins sauvages du monde, des sociétés entières ont embrassé cette philosophie. C’est l’esprit originel des batailles qui se déchaîne dans le cœur des barbares : malheur à ceux qui affronteront leur rage.";
    var barbareClass = new Class('barbare', barbareAttributes, barbareDescription);
    var barbare = new Player('', 1, 0, barbareClass, barbareInventaire, true);

    this.playerArray.push(barbare);
  }

  /**
   * Définit la classe archer
   */
  defineArcher() {
    var weaponValue = new Monney(10);
    var archerWeapon = new Weapon("Arc en bois", weaponValue, 5, 1);
    let defValue = new Monney(10);
    var archerDefense = new Defense("Armure en cuir", defValue, 5, 1);
    var sellObject = new Sell("bibelots", new Monney(5));
    var archerSell: Array<Sell> = [sellObject, sellObject];
    var archerInventaire = new Inventaire(archerWeapon, archerDefense, new Monney(50), archerSell);
    var archerAttributes = new Attributes(100, 5, 5, 6, 8, 10, 6);
    var archerDescription = "L'archer se consacre à la maîtrise de l'arc. Des années d'entraînement ont perfectionné ses compétences, il s'est affûté jour après jour sur des cibles, à la chasse ou à la guerre, faisant pleuvoir la mort sur les lignes ennemies.";
    var archerClass = new Class('archer', archerAttributes, archerDescription);
    var archer = new Player('', 1, 0, archerClass, archerInventaire, true);

    this.playerArray.push(archer);
  }

  /**
   * Définit la classe sorcier
   */
  defineSorcier() {
    var weaponValue = new Monney(10);
    var sorcierWeapon = new Weapon("Baton de novice", weaponValue, 5, 1);
    let defValue = new Monney(15);
    var sorcierDefense = new Defense("Robe de novice", defValue, 2, 1);
    var sellObject = new Sell("bibelots", new Monney(5));
    var sorcierSell: Array<Sell> = [sellObject, sellObject];
    var sorcierInventaire = new Inventaire(sorcierWeapon, sorcierDefense, new Monney(50), sorcierSell);
    var sorcierAttributes = new Attributes(90, 3, 6, 10, 8, 7, 8);
    var sorcierDescription = "Au-delà du voile du monde de tous les jours se cachent les mystères du pouvoir absolu. Les œuvres des êtres supérieurs aux mortels, les légendes des royaumes où vivent les dieux et les esprits, les actes créateurs à la fois merveilleux et terribles… tous ces mystères intriguent ceux qui possèdent l’ambition et les capacités nécessaires pour s’élever au-dessus du commun des mortels et atteindre le pouvoir véritable. C’est la voie des sorciers. Ces individus à l’esprit affûté recherchent, collectent et convoitent les connaissances ésotériques et se servent d’arts connus seulement d’une poignée de personnes pour réaliser des merveilles allant au-delà de la portée des simples mortels. Certains choisissent un domaine d’étude magique spécifique et deviennent des experts d’une certaine catégorie de pouvoirs, alors que d’autres optent pour la versatilité et jouissent de toute l’étendue des merveilles magiques. Dans tous les cas, l’ingéniosité et la puissance des sorciers sont évidentes : ils peuvent détruire leurs ennemis, renforcer leurs alliés et façonner le monde selon leurs désirs.";
    var sorcierClass = new Class('sorcier', sorcierAttributes, sorcierDescription);
    var sorcier = new Player('', 1, 0, sorcierClass, sorcierInventaire, true);

    this.playerArray.push(sorcier);
  }

  /**
   * Définit la classe guerrier
   */
  defineWarrior() {
    var weaponValue = new Monney(10);
    var guerrierWeapon = new Weapon("Epée en fer", weaponValue, 5, 1);
    let defValue = new Monney(10);
    var guerrierDefense = new Defense("Armure en fer", defValue, 5, 1);
    var sellObject = new Sell("bibelots", new Monney(5));
    var guerrierSell: Array<Sell> = [sellObject, sellObject];
    var guerrierInventaire = new Inventaire(guerrierWeapon, guerrierDefense, new Monney(50), guerrierSell);
    var guerrierAttributes = new Attributes(110, 7, 9, 6, 5, 5, 5);
    var guerrierDescription = "Certains prennent les armes en quête de gloire, de richesse, ou de vengeance. D’autres combattent pour faire leurs preuves, pour protéger des proches ou parce qu’ils ne savent rien faire d’autre. Et d’autres encore s’engagent sur la voie des armes pour affûter leur corps et démontrer leur courage lorsque le combat fait rage. Les guerriers, ces seigneurs du champ de bataille, forment un groupe hétéroclite. Ils s’entraînent à manier de nombreuses armes ou juste une, ils apprennent à utiliser les armures de manière optimale, ils suivent les enseignements martiaux de maîtres exotiques et étudient l’art de la guerre. Tout cela pour devenir de véritables armes vivantes. Ces combattants exceptionnels sont plus que de simples brutes : ils révèlent la véritable puissance des armes et transforment de simples morceaux de métal en outils permettant de soumettre des royaumes, de massacrer des monstres et d’unir des armées. Les guerriers sont des soldats, des chevaliers, des chasseurs, des artistes de la guerre et des champions sans égal. Malheur à ceux qui oseraient s’opposer à eux.";
    var guerrierClass = new Class('guerrier', guerrierAttributes, guerrierDescription);
    var guerrier = new Player(this.playerName, 1, 0, guerrierClass, guerrierInventaire, true);

    this.playerArray.push(guerrier);
  }

  /**
   * Récupère le choix du joueur en classe
   * @param data
   */
  setUserChoice(data) {
    this.userChoice = data;
  }

  /**
   * Permet la sauvegarde du joueur 
   */
  onSave = function (player) {
    player.name = this.playerName;

   
    this.newService.savePlayer(player);

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
