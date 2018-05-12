import { Component, OnInit } from '@angular/core';
import {User} from '../../../shared/models/user/user.model';
import {AdminService} from '../../../shared/services/admin.service';
import {UserPage} from '../../../shared/models/user/user-page.model';

@Component({
  selector: 'app-blocked-users',
  templateUrl: './blocked-users.component.html',
  styleUrls: ['./blocked-users.component.css']
})
export class BlockedUsersComponent implements OnInit {
  blockedUsers: User[];
  unblockUser: User;
  unblockUserNumber: number;
  showUserUnblockDialog = false;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getBlockedUsers();
  }

  getBlockedUsers() {
    this.adminService.getBlockedUsers()
      .subscribe((userPage: UserPage) => {
        this.blockedUsers = userPage.results;
      });
  }

  openUnblockedDialog(unblockedUserNumber: number) {
    this.unblockUserNumber = unblockedUserNumber;
    this.unblockUser = this.blockedUsers[this.unblockUserNumber];
    this.showUserUnblockDialog = true;
  }

  userUnblocked() {
    this.blockedUsers.splice(this.unblockUserNumber, 1);
    this.showUserUnblockDialog = false;
  }

}
