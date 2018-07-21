// Service global permettant les vérification d'élements passer en paramètres
import { Injectable } from '@angular/core';

@Injectable()
export class ToolsService {

  constructor() { }

  /**
   * Détermine si le string n'est pas null ou indéfini
   * @param string
   */
  stringIsNotEmptyOrNull(string: string): boolean {
    let result: boolean = true;
    if (string != undefined) {
      if (string.length < 0) {
        result = false;
      } else if (string === null) {
        result = false;
      } else if (string === "") {
        result = false;
      }
    } else {
      result = false;
    }

    return result;
  }


  dataIsDifferent(objectToCheck: object, stringToCheck: string, propertyCheck: any): boolean {
    let result: boolean = false;
    if (objectToCheck != null) {
      if (objectToCheck[propertyCheck] !== stringToCheck) {
        result = true;
      }
    }

    return result;
  }

}
