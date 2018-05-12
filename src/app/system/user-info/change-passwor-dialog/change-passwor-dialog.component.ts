import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {UsersService} from '../../../shared/services/users.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-change-passwor-dialog',
  templateUrl: './change-passwor-dialog.component.html',
  styleUrls: ['./change-passwor-dialog.component.css']
})
export class ChangePassworDialogComponent {
  password: string;
  isPasswordValid = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('myForm') form: NgForm;

  constructor(private usersService: UsersService) {
  }

  userPassword(password: string) {
    this.password = password;
  }

  checkUserPassword(secondPassword: string) {
    if (this.password === secondPassword) {
      this.isPasswordValid = true;
    } else {
      this.isPasswordValid = false;
    }
  }

  changePassword() {
    const password = this.form.form.value.password;
    const userId = localStorage.getItem('userId');
    this.usersService.changeUserPassword(userId, password)
      .subscribe(() => {
        this.close();
      });
  }

  close() {
    this.isPasswordValid = true;
    this.visible = !this.visible;
    this.visibleChange.emit();
  }

}
