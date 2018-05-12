import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user/user.model';
import {UserPage} from '../../shared/models/user/user-page.model';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  blockUser: User;
  termMaterial$ = new Subject<string>();
  searchText = '';
  searchByRoles = '';
  blockUserNumber: number;
  page: number;
  isLoad: boolean;
  lastPage: boolean;
  showUserBlockDialog = false;

  constructor(public usersService: UsersService) {
  }

  ngOnInit() {
    this.getUsers();
    this.subOnInputSearchField();
  }

  getUsers() {
    this.usersService.getUsers()
      .subscribe((userPage: UserPage) => {
        this.users = userPage.results;
      });
  }

  subOnInputSearchField() {
    this.termMaterial$
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe((term) => {
        this.searchText = term;
        const url = this.getUrlForFilterUsers();
        this.getFilterUsers(url);
      });
  }

  filterByRoles(roles: string) {
    this.searchByRoles = roles;
    console.log(roles);
    const url = this.getUrlForFilterUsers();
    this.getFilterUsers(url);
  }

  getUrlForFilterUsers() {
    let url = 'users/?';
    if (this.searchText) {
      url = `users/search/?text=${this.searchText}&`;
    }
    if (this.searchByRoles) {
      url += `${this.searchByRoles}`;
    }
    return url;
  }

  getFilterUsers(url) {
    this.isLoad = true;
    this.page = 1;
    this.lastPage = false;
    this.usersService.getFilterUsers(url)
      .subscribe((userPage: UserPage) => {
        this.users = userPage.results;
        if (userPage.next_page === null) {
          this.lastPage = true;
        }
        this.isLoad = false;
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
