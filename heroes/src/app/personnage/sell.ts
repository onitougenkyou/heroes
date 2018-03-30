import { Monney } from './monney';

export class Sell {
  name: string;
  value: Monney;

  constructor(nameC: string, valueC: Monney) {
    this.name = nameC;
    this.value = valueC;
  }
}
