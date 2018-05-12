import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {User} from '../../../../shared/models/user/user.model';
import {UsersService} from '../../../../shared/services/users.service';

@Component({
  selector: 'app-register-user-dialog',
  templateUrl: './register-user-dialog.component.html',
  styleUrls: ['./register-user-dialog.component.css']
})
export class RegisterUserDialogComponent implements OnInit {
  userRoles = ['Студент', 'Преподаватель', 'Модератор', 'Админ'];
  @Input() visible: boolean;
  @Input() user: User;
  @Output() successRegisterUser = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('userRole') userRole;

  constructor(public usersService: UsersService) { }

  ngOnInit() {
  }

  registerUser() {
    const user = {
      registration: this.user.id,
      role: this.userRole.value
    };
    this.usersService.createUser(user)
      .subscribe((response) => {
        console.log(response);
        this.successRegisterUser.emit(response);
      });
  }

  close() {
    this.visible = !this.visible;
    this.visibleChange.emit();
  }

}
