import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../shared/models/user/user.model';
import {UsersService} from '../../../shared/services/users.service';

@Component({
  selector: 'app-user-block-dialog',
  templateUrl: './user-block-dialog.component.html',
  styleUrls: ['./user-block-dialog.component.css']
})
export class UserBlockDialogComponent implements OnInit {
  @Input() visible: boolean;
  @Input() user: User;
  @Output() blocked = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
  }

  close() {
    this.visible = !this.visible;
    this.visibleChange.emit();
  }

  blockedUser() {
    this.usersService.blockedUser(this.user.id)
      .subscribe((response) => {
        this.visible = !this.visible;
        this.visibleChange.emit();
        this.blocked.emit();
      });
  }

}
