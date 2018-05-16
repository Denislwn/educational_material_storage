import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {UsersService} from '../../../shared/services/users.service';
import {User} from '../../../shared/models/user/user.model';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {
  userRoles = ['Студент', 'Преподаватель', 'Модератор', 'Админ'];
  @Input() visible: boolean;
  @Input() user: User;
  @Output() successEditUser = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('userRole') userRole;

  constructor(public usersService: UsersService) {
  }

  ngOnInit() {
  }

  registerUser() {
    const role = this.userRole.value;
    this.usersService.editUser(this.user.id, {role})
      .subscribe((response) => {
        this.successEditUser.emit(response);
        this.close();
      });
  }

  close() {
    this.visible = !this.visible;
    this.visibleChange.emit();
  }

}
