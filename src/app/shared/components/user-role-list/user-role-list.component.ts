import {Component, EventEmitter, Output} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-user-role-list',
  templateUrl: './user-role-list.component.html',
  styleUrls: ['./user-role-list.component.css']
})
export class UserRoleListComponent {
  userRoles = ['Студент', 'Преподаватель', 'Модератор', 'Админ'];
  @Output() rolesOut = new EventEmitter<string>();

  filterByRoles(form: NgForm) {
    const dict = Object.entries(form.form.value);
    let searchTypes = '';
    for (let i = 0; i < dict.length; i++) {
      if (dict[i][1] === true) {
        searchTypes += 'type=' + dict[i][0];
        if (i !== dict.length - 1) {
          searchTypes += '&';
        }
      }
    }
    this.rolesOut.emit(searchTypes);
  }
}
