import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'userRole'
})
export class UserRolePipe implements PipeTransform {
  transform(role: number): string {
    let userRole = '';
    switch (role) {
      case 0: {
        userRole = 'Преподаватель';
        break;
      }
      case 1: {
        userRole = 'Студент';
        break;
      }
      case 2: {
        userRole = 'Админ';
        break;
      }
    }
    return userRole;
  }
}
