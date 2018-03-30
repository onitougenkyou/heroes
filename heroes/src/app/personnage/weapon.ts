import { Monney } from './monney';

export class Weapon {
  name: string;
  value: Monney;
  dammage: Number;
  levelMin: Number;
  constructor(nameC: string, valueC: Monney, dammageC: Number, levelMinC: Number) {
    this.name = nameC;
    this.value = valueC;
    this.dammage = dammageC;
    this.levelMin = levelMinC;
  }
}
