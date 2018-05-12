import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../shared/models/user/user.model';
import {AdminService} from '../../../shared/services/admin.service';

@Component({
  selector: 'app-user-block-dialog',
  templateUrl: './user-block-dialog.component.html',
  styleUrls: ['./user-block-dialog.component.css']
})
export class UserBlockDialogComponent {
  @Input() visible: boolean;
  @Input() user: User;
  @Output() blocked = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private adminService: AdminService) {
  }

  close() {
    this.visible = !this.visible;
    this.visibleChange.emit();
  }

  blockUser() {
    this.adminService.blockUser(this.user.id)
      .subscribe(() => {
        this.visible = !this.visible;
        this.visibleChange.emit();
        this.blocked.emit();
      });
  }

}
