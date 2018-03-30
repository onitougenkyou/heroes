
export class Class {
  name: string;
  attributes: {
    pv: number;
    strenght: number;
    intelligence: number;
    agility: number;
    perception: number;
    luck: number;
  }

  constructor(nameC: string, APv: number, AStrenght: number, AIntelligence: number, AAgility: number, APerception: number, ALuck: number) {
    this.name = nameC;
    this.attributes.pv = APv;
    this.attributes.strenght = AStrenght;
    this.attributes.intelligence = AIntelligence;
    this.attributes.agility = AAgility;
    this.attributes.perception = APerception;
    this.attributes.luck = ALuck;
  }
}
