import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user/user.model';
import {UserPage} from '../../shared/models/user/user-page.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  blockUser: User;
  blockUserNumber: number;
  showUserBlockDialog = false;

  constructor(public usersService: UsersService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers()
      .subscribe((userPage: UserPage) => {
        this.users = userPage.results;
      });
  }

  openBlockedDialog(blockedUserNumber: number) {
    this.blockUserNumber = blockedUserNumber;
    this.blockUser = this.users[this.blockUserNumber];
    this.showUserBlockDialog = true;
  }

  userBlocked() {
    this.users.splice(this.blockUserNumber, 1);
    this.showUserBlockDialog = false;
  }

}
