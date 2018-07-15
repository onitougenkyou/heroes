import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClassService } from '../services/class.service';
import { AuthService } from '../services/auth.service';
import { PlayerService } from '../services/player.service';


@Component({
  selector: 'app-class-add-form',
  templateUrl: './class-add-form.component.html',
  styleUrls: ['./class-add-form.component.scss']
})
export class ClassAddFormComponent implements OnInit {

  public form: FormGroup;
  weaponTypes = [
    { type: 'hache' },
    { type: 'épée' },
    { type: 'arc' },
    { type: 'baton magique' }
  ];

  armorType = [
    { type: 'Armure de cuir' },
    { type: 'Robe de mage' },
    { type: 'Armure de fer' },
    { type: 'Côte de maille' }
  ];

  userIsLoggedIn: boolean = false;

  constructor(private formBuilder: FormBuilder, private classService: ClassService, private authService: AuthService) { }



  ngOnInit() {
    this.form = this.formBuilder.group({
      id: Date.now(),
      name: '',
      force: 0,
      intelligence: 0,
      agilite: 0,
      endurance: 0,
      perception: 0,
      chance: 0,
      vie: 0,
      weaponType: '',
      weaponDammageValue:0,
      valueWeapon: 0,
      weaponLevel: 0,
      armorType: '',
      armorResistanceValue: 0,
      armorValue: 0,
      armorLevel: 0,
      monney: 0,
      description: ""
    });

    this.checkUserIsLoggedIn();
  }
  

  /**
   * Créer l'objet class et l'envoi au service pour la sauvegarde en base
   * @param classData
   */
  createClass(classData) {
    const token = JSON.parse(localStorage.getItem('local-data')).token;
    let parseData = {
      id: Date.now(),
      name: classData.name,
      attributs: {
        force: classData.force,
        intelligence: classData.intelligence,
        agilite: classData.agilite,
        perception: classData.perception,
        endurance: classData.endurance,
        chance: classData.chance,
        pv: classData.vie
      },
      inventaire: {
        weapon: {
          weaponType: classData.weaponType,
          weaponDammage: classData.weaponDammageValue,
          weaponValue: classData.valueWeapon,
          weaponLevel: classData.weaponLevel
        },
        armor: {
          armorType: classData.armorType,
          armorResistance: classData.armorResistanceValue,
          armorValue: classData.armorValue,
          armorLevel: classData.armorLevel
        },
        monney: classData.monney,
        sell: [{ type: 'morceau de cuir usée', value: 2 }, {type: 'Morceau de fer', value: 4}]
      },
        description: classData.description
    };
    this.classService.addClass(parseData, token).subscribe();
    this.form.reset();
  }


  /**
   * Vérifie si l'utilisateur est connecté
   */
  checkUserIsLoggedIn() {
    if (this.authService.userIsLoggedIn()) {
      this.userIsLoggedIn = true;
    }
  }

}
