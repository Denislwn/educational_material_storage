import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'userRole'
})
export class UserRolePipe implements PipeTransform {
  transform(role: number): string {
    let userRole = '';
    switch (role) {
      case 1: {
        userRole = 'Студент';
        break;
      }
      case 2: {
        userRole = 'Преподаватель';
        break;
      }
      case 3: {
        userRole = 'Модератор';
        break;
      }
      case 4: {
        userRole = 'Админ';
        break;
      }
    }
    return userRole;
  }
}
