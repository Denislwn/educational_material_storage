import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  user: User;
  lastPage = false;

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.usersService.getUserInfo(localStorage.getItem('userId'))
      .subscribe((user: User) => {
        this.user = user;
      });
  }

}
