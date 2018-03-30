import { Attributes} from './attributes';

export class Class {
  name: string;
  attributes: Attributes;

  constructor(nameC: string, attributesC: Attributes) {
    this.name = nameC;
    this.attributes = attributesC;
  }
}
