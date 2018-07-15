// Service global permettant les vérification d'élements passer en paramètres
import { Injectable } from '@angular/core';

@Injectable()
export class ToolsService {

  constructor() { }

  stringIsNotEmptyOrNull(string: string): boolean {
    let result: boolean = true;
    if (string.length < 0) {
      result = false;
    } else if (string === null) {
      result = false;
    } else if (string === "") {
      result = false;
    }

    return result;
  }

}
