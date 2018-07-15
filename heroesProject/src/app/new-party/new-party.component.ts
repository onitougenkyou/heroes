import { Component, OnInit } from '@angular/core';
import { ClassService } from '../services/class.service';
import { PlayerService } from '../services/player.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToolsService } from '../services/tools.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-party',
  templateUrl: './new-party.component.html',
  styleUrls: ['./new-party.component.scss']
})
export class NewPartyComponent implements OnInit {

  public form: FormGroup;

  decodeToken = null;
  characterArray = [];
  error = "";
  selectedIdx = null;
  characterSelected = null;
  userIsLoggedIn: boolean = false;
  playerName: string = "";
  errorDetected: boolean = false;

  constructor(private classService: ClassService, private playerService: PlayerService, private formBuilder: FormBuilder, private authService: AuthService, private tools: ToolsService, private router: Router) { }

  ngOnInit() {

    if (this.authService.userIsLoggedIn()) {
      const localToken = JSON.parse(localStorage.getItem('local-data'));
      this.decodeToken = this.authService.decodeToken(localToken.token);
    }

    this.classService.getClass()
      .subscribe(
        data => {
          this.characterArray = data
        },
        error => {
          console.error(error);
          this.error = error;
        }
      );
    this.classService.classSubject.subscribe(data => {
      this.characterArray = [data, ...this.characterArray]
    });
    this.checkUserIsLoggedIn();

    this.form = this.formBuilder.group({
      id: Date.now(),
      name: ''
    });
  }


  choiceCharacter(character, index) {
    this.selectedIdx = index;
    this.characterSelected = character;
  }

  checkUserIsLoggedIn() {
    if (this.authService.userIsLoggedIn()) {
      this.userIsLoggedIn = true;
    }
  }

  newParty(playerData) {
    const token = JSON.parse(localStorage.getItem('local-data')).token;
    let classData = this.characterSelected;

    console.log(this.decodeToken.name);

    if (this.tools.stringIsNotEmptyOrNull(this.playerName)) {
      let parseData = {
        accountName: this.decodeToken.name,
          id: Date.now(),
        name: this.playerName,
        level: 1,
        experience: 0,
        isAlive: true,
        class: classData.name,
        attributs: {
          force: classData.attributs.force,
          intelligence: classData.attributs.intelligence,
          agilite: classData.attributs.agilite,
          perception: classData.attributs.perception,
          endurance: classData.attributs.endurance,
          chance: classData.attributs.chance,
          pv: classData.attributs.vie
        },
        inventaire: {
          weapon: {
            weaponType: classData.inventaire.weapon.name,
            weaponDammage: classData.inventaire.weapon.dammage,
            weaponValue: classData.inventaire.weapon.value,
            weaponLevel: classData.inventaire.weapon.levelMin
          },
          armor: {
            armorType: classData.inventaire.armor.name,
            armorResistance: classData.inventaire.armor.defense,
            armorValue: classData.inventaire.armor.value,
            armorLevel: classData.inventaire.armor.levelMin
          },
          monney: classData.inventaire.monney,
          sell: [{ type: 'morceau de cuir usée', value: 2 }, { type: 'Morceau de fer', value: 4 }]
        },
        description: classData.description
      };

      this.playerService.addPlayer(parseData, token).subscribe();
      // Redirigé vers tutorial du jeu
      this.router.navigateByUrl('/tutorial');
    } else {
      this.error = "Le pseudo ne peut pas être vide";
      this.errorDetected = true;
    }
  }

}
