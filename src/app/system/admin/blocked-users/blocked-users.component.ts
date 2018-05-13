import {Component, OnInit} from '@angular/core';
import {User} from '../../../shared/models/user/user.model';
import {AdminService} from '../../../shared/services/admin.service';
import {UserPage} from '../../../shared/models/user/user-page.model';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-blocked-users',
  templateUrl: './blocked-users.component.html',
  styleUrls: ['./blocked-users.component.css']
})
export class BlockedUsersComponent implements OnInit {
  blockedUsers: User[];
  unblockUser: User;
  termUsers$ = new Subject<string>();
  searchText = '';
  page: number;
  isLoad: boolean;
  lastPage: boolean;
  unblockUserNumber: number;
  showUserUnblockDialog = false;

  constructor(private adminService: AdminService) {
  }

  ngOnInit() {
    this.getBlockedUsers();
    this.subOnInputSearchField();
  }

  getBlockedUsers() {
    this.page = 1;
    this.isLoad = true;
    this.adminService.getBlockedUsers(this.page)
      .subscribe((userPage: UserPage) => {
        this.blockedUsers = userPage.results;
        this.checkLastPage(userPage.next_page);
      });
  }

  subOnInputSearchField() {
    this.termUsers$
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe((term) => {
        this.searchText = term;
        this.getFilterBlockedUsers();
      });
  }

  getFilterBlockedUsers() {
    this.page = 1;
    this.isLoad = true;
    this.adminService.getFilterBlockedUsers(this.page, this.searchText)
      .subscribe((userPage: UserPage) => {
        this.blockedUsers = userPage.results;
        this.checkLastPage(userPage.next_page);
      });
  }

  onScroll() {
    if (this.searchText) {
      this.getFilterNextBlockedUserPage();
    } else {
      this.getNextBlockedUserPage();
    }
  }

  getNextBlockedUserPage() {
    if (!this.isLoad && !this.lastPage) {
      this.isLoad = true;
      this.page += 1;
      this.adminService.getBlockedUsers(this.page)
        .subscribe((userPage: UserPage) => {
          this.blockedUsers = this.blockedUsers.concat(userPage.results);
          this.checkLastPage(userPage.next_page);
        });
    }
  }

  getFilterNextBlockedUserPage() {
    if (!this.isLoad && !this.lastPage) {
      this.isLoad = true;
      this.page += 1;
      this.adminService.getFilterBlockedUsers(this.page, this.searchText)
        .subscribe((userPage: UserPage) => {
          this.blockedUsers = this.blockedUsers.concat(userPage.results);
          this.checkLastPage(userPage.next_page);
        });
    }
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

  checkLastPage(nextPage: string) {
    if (nextPage === null) {
      this.lastPage = true;
    } else {
      this.lastPage = false;
    }
    this.isLoad = false;
  }

}
