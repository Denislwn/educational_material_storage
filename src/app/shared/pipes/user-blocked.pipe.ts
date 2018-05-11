import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'userBlocked'
})
export class UserBlockedPipe implements PipeTransform {
  transform(blocked: boolean): string {
    if (blocked) {
      return 'Заблокирован';
    } else {
      return 'Не заблокирован';
    }
  }
}
