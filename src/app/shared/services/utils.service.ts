import {Injectable} from '@angular/core';

@Injectable()
export class UtilsService {
  re = /\D+/ig;

  parseParams(parseStr: string) {
    let arr = [];
    const str = parseStr.replace(this.re, ' ');
    arr = str.split(' ');
    return arr;
  }

  formationParams(formValue: object, searchParam: string) {
    const dict = Object.entries(formValue);
    let searchStr = '';
    for (let i = 0; i < dict.length; i++) {
      if (dict[i][1] === true) {
        searchStr += searchParam + dict[i][0];
        searchStr += '&';
      }
    }
    return searchStr;
  }
}
