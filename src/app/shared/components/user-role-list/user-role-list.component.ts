import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {StoreService} from '../../services/store.service';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-user-role-list',
  templateUrl: './user-role-list.component.html',
  styleUrls: ['./user-role-list.component.css']
})
export class UserRoleListComponent implements OnInit {
  userRoles = ['Студент', 'Преподаватель', 'Модератор', 'Админ'];
  savesUserRoles = [false, false, false, false];
  @Output() rolesOut = new EventEmitter<string>();

  constructor(private storeService: StoreService,
              private utils: UtilsService) {
  }

  ngOnInit(): void {
    if (this.storeService.userRolesFilter) {
      const arr = this.utils.parseParams(this.storeService.userRolesFilter);
      for (const i of arr) {
        if (i !== 0) {
          this.savesUserRoles[i - 1] = true;
        }
      }
      this.storeService.userRolesFilter = null;
    }
  }

  filterByRoles(form: NgForm) {
    const param = 'role=';
    const searchRoles = this.utils.formationParams(form.form.value, param);
    this.rolesOut.emit(searchRoles);
  }
}
