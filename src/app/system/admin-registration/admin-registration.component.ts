import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user/user.model';
import {UserPage} from '../../shared/models/user/user-page.model';

@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.css']
})
export class AdminRegistrationComponent implements OnInit {
  users: User[];
  user: User;
  userNumber: number;
  lastPage: boolean;
  isLoading: boolean;
  page: number;
  showRegisterDialog = false;

  constructor(public usersService: UsersService) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.page = 1;
    this.isLoading = true;
    this.usersService.getRegistrationUsers(this.page)
      .subscribe((userPage: UserPage) => {
        this.users = userPage.results;
        if (userPage.next_page === null) {
          this.lastPage = true;
        }
        this.isLoading = false;
      });
  }

  openRegisterDialog(userNumber) {
    this.userNumber = userNumber;
    this.user = this.users[userNumber];
    this.showRegisterDialog = true;
  }

  registerUser() {
    this.users.splice(this.userNumber, 1);
    this.user = null;
    this.showRegisterDialog = false;
  }

}
