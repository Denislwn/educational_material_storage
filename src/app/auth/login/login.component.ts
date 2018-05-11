import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user/user.model';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorLogin = false;
  subOnUserLogin: Subscription;

  constructor(private usersService: UsersService,
              private router: Router) {
  }

  submitForm(form: NgForm) {
    const userServer = {
      username: form.form.value.username,
      password: form.form.value.password
    };
    this.subOnUserLogin = this.usersService.userLogin(userServer)
      .subscribe((user: User) => {
        localStorage.setItem('token', user.token);
        localStorage.setItem('userId', user.id.toString());
        this.router.navigate(['/system/user_info']);
      }, (err) => {
        if (err.status === 400) {
          this.errorLogin = true;
        }
        console.log(err);
      }, () => {
        this.subOnUserLogin.unsubscribe();
      });
  }

}
