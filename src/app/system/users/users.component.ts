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
  blockedUser: User;
  blockedUserNumber: number;
  showUserBlockedDialog = false;

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
    this.blockedUserNumber = blockedUserNumber;
    this.blockedUser = this.users[this.blockedUserNumber];
    this.showUserBlockedDialog = true;
  }

  userBlocked() {
    this.users.splice(this.blockedUserNumber, 1);
    this.showUserBlockedDialog = true;
  }

}
