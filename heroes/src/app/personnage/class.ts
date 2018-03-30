import { Attributes} from './attributes';

export class Class {
  name: string;
  attributes: Attributes;
  description: string;

  constructor(nameC: string, attributesC: Attributes, description: string) {
    this.name = nameC;
    this.attributes = attributesC;
    this.description = description;
  }
}
