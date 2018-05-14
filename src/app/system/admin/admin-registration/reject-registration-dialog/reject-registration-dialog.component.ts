import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from '../../../../shared/models/user/user.model';
import {UsersService} from '../../../../shared/services/users.service';

@Component({
  selector: 'app-reject-registration-dialog',
  templateUrl: './reject-registration-dialog.component.html',
  styleUrls: ['./reject-registration-dialog.component.css']
})
export class RejectRegistrationDialogComponent {
  @Input() visible: boolean;
  @Input() user: User;
  @Output() reject = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private usersService: UsersService) {
  }

  close() {
    this.visible = !this.visible;
    this.visibleChange.emit();
  }

  rejectUser() {
    this.usersService.rejectUserRegistration(this.user.id)
      .subscribe((responce) => {
        this.reject.emit();
        this.close();
      });
  }

}
