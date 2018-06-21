import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClassService } from '../services/class.service';
import { AuthService } from '../services/auth.service';
import { MonsterService } from '../services/monster.service';

@Component({
  selector: 'app-monster-add-form',
  templateUrl: './monster-add-form.component.html',
  styleUrls: ['./monster-add-form.component.scss']
})
export class MonsterAddFormComponent implements OnInit {

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

  constructor(private formBuilder: FormBuilder, private monsterService: MonsterService, private authService: AuthService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: Date.now(),
      type: '',
      name: '',
      level: 0,
      force: 0,
      intelligence: 0,
      agilite: 0,
      endurance: 0,
      perception: 0,
      chance: 0,
      pv: 0,
      weaponType: '',
      weaponDammageValue: 0,
      armorType: '',
      armorResistanceValue: 0,
      monney: 0,
      description: ""
    });

    this.checkUserIsLoggedIn();
  }


  createMonster(monsterData) {
    const token = JSON.parse(localStorage.getItem('local-data')).token;
    let parseData = {
      id: Date.now(),
      type: monsterData.type,
      name: monsterData.name,
      level: monsterData.level,
      attributs: {
        force: monsterData.force,
        intelligence: monsterData.intelligence,
        agilite: monsterData.agilite,
        perception: monsterData.perception,
        endurance: monsterData.endurance,
        chance: monsterData.chance,
        pv: monsterData.pv
      },
      inventaire: {
        weapon: {
          weaponType: monsterData.weaponType,
          weaponDammage: monsterData.weaponDammageValue
        },
        armor: {
          armorType: monsterData.armorType,
          armorResistance: monsterData.armorResistanceValue
        },
        monney: monsterData.monney,
        objetDrop: [
          { type: "babioles", name: "dent orc", prix: 1, luckToDrop: 0.8 },
          { type: "babioles", name: "morceau de viande", prix: 2, luckToDrop: 0.8 },
          { type: "arme", name: "épée rouillé orc", prix: 7, levelRequis: 5, dommage: 4, attributsMinimum: { force: 6 }, luckToDrop: 0.4 },
          { type: "armure", name: "armure de cuir cloutée orc", prix: 6, levelRequis: 5, defense: 5, attributsMinimum: { force: 5, endurance: 6 }, luckToDrop: 0.4 }
        ]
      },
      description: monsterData.description
    };
    this.monsterService.addMonster(parseData, token).subscribe();
    this.form.reset();
    console.log('MONSTRE', parseData);
  }

  checkUserIsLoggedIn() {
    if (this.authService.userIsLoggedIn()) {
      this.userIsLoggedIn = true;
    }
  }
}
