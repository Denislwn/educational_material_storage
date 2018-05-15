import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user/user.model';
import {Material} from '../../shared/models/material/material.model';
import {MaterialPage} from '../../shared/models/material/material-page.model';
import {UtilsService} from '../../shared/services/utils.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  user: User;
  materials: Material[];
  showChangePasswordDialog = false;

  constructor(private usersService: UsersService,
              private utilService: UtilsService) {
  }

  ngOnInit() {
    this.getUserInfo();
    this.getUserQuickToolBar();
  }

  getUserInfo() {
    this.usersService.getUserInfo(localStorage.getItem('userId'))
      .subscribe((user: User) => {
        this.user = user;
      });
  }

  getUserQuickToolBar() {
    this.usersService.getUserQuickToolBar()
      .subscribe((materialPage: MaterialPage) => {
        this.materials = materialPage.results;
      });
  }

  openChangePasswordDialog() {
    this.showChangePasswordDialog = true;
  }

  getUserImage(userRole: number) {
    return this.utilService.getUserImage(userRole);
  }

}
