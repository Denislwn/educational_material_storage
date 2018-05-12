import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../../shared/models/user/user.model';
import {AdminService} from '../../../../shared/services/admin.service';

@Component({
  selector: 'app-user-unblock-dialog',
  templateUrl: './user-unblock-dialog.component.html',
  styleUrls: ['./user-unblock-dialog.component.css']
})
export class UserUnblockDialogComponent {
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

  unblockUser() {
    this.adminService.unBlockUser(this.user.id)
      .subscribe(() => {
        this.visible = !this.visible;
        this.visibleChange.emit();
        this.blocked.emit();
      });
  }


}
