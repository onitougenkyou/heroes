import { Defense } from './defense';
import { Weapon } from './weapon';
import { Class } from './class';
import { Inventaire } from './inventaire';


export class Player {
  name: string;
  level: number;
  experience: number;
  class: Class;
  inventaire: Inventaire;
  isAlive: Boolean;

  constructor(nameC: string, levelC: number, experienceC: number, classC: Class, inventaireC: Inventaire, isAliveC: Boolean) {
    this.name = nameC;
    this.level = levelC;
    this.experience = experienceC;
    this.class = classC;
    this.inventaire = inventaireC;
    this.isAlive = isAliveC;
  }
}
