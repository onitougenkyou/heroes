import { Monney } from './monney';

export class Defense {
  name: string;
  value: Monney;
  defense: number;
  levelMin: number;

  constructor(nameC: string, valueC: Monney, defenseC: number, levelMinC: number) {
    this.name = nameC;
    this.value = valueC;
    this.defense = defenseC;
    this.levelMin = levelMinC;
  }
}
