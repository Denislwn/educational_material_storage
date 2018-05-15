import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user/user.model';
import {UserPage} from '../../shared/models/user/user-page.model';
import {Subject} from 'rxjs/Subject';
import {StoreService} from '../../shared/services/store.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {
  users: User[];
  blockUser: User;
  termUsers$ = new Subject<string>();
  searchText = '';
  searchByRoles = '';
  blockUserNumber: number;
  page: number;
  isLoad: boolean;
  lastPage: boolean;
  showUserBlockDialog = false;
  scrollState = false;
  USERS = 'USERS';
  @ViewChild('usersList') usersList;

  constructor(private usersService: UsersService,
              private storeService: StoreService) {
  }

  ngOnInit() {
    this.getUsers();
    this.subOnInputSearchField();
  }

  ngAfterViewInit(): void {
    if (this.scrollState) {
      this.usersList.nativeElement.scrollTop = this.storeService.usersListScroll;
    }
    this.scrollState = false;
  }

  getUsers() {
    if (this.storeService.users) {
      this.getUsersFromService();
    } else {
      this.getUsersFromServer();
    }
  }

  getUsersFromService() {
    this.users = this.storeService.users;
    this.page = this.storeService.userPage;
    this.lastPage = this.storeService.userLastPage;
    this.searchByRoles = this.storeService.userRolesFilter;
    this.searchText = this.storeService.searchTextFilterUsers;
    this.scrollState = true;
    this.storeService.storeUserReset();
  }

  getUsersFromServer() {
    this.page = 1;
    this.isLoad = true;
    this.usersService.getUsers(this.page)
      .subscribe((userPage: UserPage) => {
        this.users = userPage.results;
        this.checkLastPage(userPage.next_page);
      });
  }

  subOnInputSearchField() {
    this.termUsers$
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
    this.usersService.getFilterUsers(url)
      .subscribe((userPage: UserPage) => {
        this.users = userPage.results;
        this.checkLastPage(userPage.next_page);
      });
  }

  onScroll() {
    if (this.searchByRoles || this.searchText) {
      this.getFilterNextUserPage();
    } else {
      this.getNextUserPage();
    }
  }

  getNextUserPage() {
    if (!this.isLoad && !this.lastPage) {
      this.isLoad = true;
      this.page += 1;
      this.usersService.getUsers(this.page)
        .subscribe((userPage: UserPage) => {
          this.users = this.users.concat(userPage.results);
          this.checkLastPage(userPage.next_page);
        });
    }
  }

  getFilterNextUserPage() {
    if (!this.isLoad && !this.lastPage) {
      this.isLoad = true;
      this.page += 1;
      const url = this.getUrlForFilterUsers() + `page=${this.page}`;
      this.usersService.getFilterUsers(url)
        .subscribe((userPage: UserPage) => {
          this.users = this.users.concat(userPage.results);
          this.checkLastPage(userPage.next_page);
        });
    }
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

  checkLastPage(nextPage: string) {
    if (nextPage === null) {
      this.lastPage = true;
    } else {
      this.lastPage = false;
    }
    this.isLoad = false;
  }

  clickOnUser(userName: string) {
    this.storeService.users = this.users;
    this.storeService.userLastPage = this.lastPage;
    this.storeService.userPage = this.page;
    this.storeService.searchTextFilterUsers = this.searchText;
    this.storeService.pageState = this.USERS;
    this.storeService.userRolesFilter = this.searchByRoles;
    this.storeService.usersListScroll = this.usersList.nativeElement.scrollTop;
    this.storeService.userName = userName;
  }

  getUserRole() {
    if (localStorage.getItem('userRole') === '4') {
      return true;
    }
    return false;
  }
}
