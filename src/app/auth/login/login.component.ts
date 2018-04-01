import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
  }

  submitForm(form: NgForm) {
    const userServer = {
      username: form.form.value.username,
      password: form.form.value.password
    };
    this.usersService.userLogin(userServer)
      .subscribe((user: User) => {
        console.log(user);
        localStorage.setItem('token', user.token);
      }, (err) => {
        console.log(err);
      });
  }

}
