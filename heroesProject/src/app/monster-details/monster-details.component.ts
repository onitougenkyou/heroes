import { Component, OnInit } from '@angular/core';
import { MonsterService } from '../services/monster.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-monster-details',
  templateUrl: './monster-details.component.html',
  styleUrls: ['./monster-details.component.scss']
})
export class MonsterDetailsComponent implements OnInit {

  monsterDetails = null;
  error = null;
  haveError: boolean = false;
  errorMessage: string = null;
  monsterNameConvert: string = null;
  monsterTypeConvert: string = null;

  constructor(private monsterService: MonsterService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activeRoute.snapshot.params.id;
    this.monsterService.getOneMonster(id)
      .subscribe(data => {
        this.handleServerResponse(data);
      },
      error => {
        this.handleError(error);
      })
  }


  handleServerResponse(response) {
    if (response.success) {
      console.log('RES', response.monster);
      this.monsterDetails = response.monster;
      this.getMonsterNameForImage(response.monster.name, response.monster.type);
    } else {
      this.errorMessage = response.message;
    }
  }

  handleError(error) {
    console.log(error.statusText);
    this.error = error;
  }

  getMonsterNameForImage(monsterName: string, monsterType: string) {
    if (monsterName.length > 0) {
      monsterName = monsterName.toLowerCase();
      this.monsterNameConvert = monsterName.replace(/ /g, "_");
    } else {
      this.errorMessage = "Impossible de trouver l'image";
      this.haveError = true;
    }
    if (monsterType.length > 0) {
      this.monsterTypeConvert = monsterType.toLowerCase();
    } else {
      this.errorMessage = "Impossible de trouver l'image";
      this.haveError = true;
    }
  }
}
