export class Attributes {
  pv: number;
  strenght: number;
  intelligence: number;
  agility: number;
  perception: number;
  luck: number;

  constructor(pv: number, strenght: number, intelligence: number, agility: number, perception: number, luck: number) {
    this.pv = pv;
    this.strenght = strenght;
    this.intelligence = intelligence;
    this.agility = agility;
    this.perception = perception;
    this.luck = luck;
  }
}