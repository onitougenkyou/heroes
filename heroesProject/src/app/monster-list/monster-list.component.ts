import { Component, OnInit } from '@angular/core';
import { MonsterService } from '../services/monster.service';

@Component({
  selector: 'app-monster-list',
  templateUrl: './monster-list.component.html',
  styleUrls: ['./monster-list.component.scss']
})
export class MonsterListComponent implements OnInit {

  monsterArray = [];
  error = "";

  constructor(private monsterService: MonsterService) { }

  ngOnInit() {
    this.monsterService.getMonster().subscribe(
      data => this.monsterArray = data,
      error => {
        console.error(error);
        this.error = error;
      }
    );
    this.monsterService.classSubject.subscribe(data => {
      this.monsterArray = [data, ... this.monsterArray]
    });
  }

}
