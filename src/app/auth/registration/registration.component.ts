import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  @ViewChild('myForm') form: NgForm;
  login$ = new Subject();
  email$ = new Subject();
  loginValid = true;
  emailValid = true;
  firstPassword: string;
  passwordValid = true;

  constructor(private usersService: UsersService,
              private router: Router) {
  }

  ngOnInit() {
    this.subOnInputUsernameField();
    this.subOnInputEmailField();
  }

  subOnInputUsernameField() {
    this.login$
      .debounceTime(600)
      .distinctUntilChanged()
      .subscribe((username: string) => {
        this.searchUsername(username);
      });
  }

  subOnInputEmailField() {
    this.email$
      .debounceTime(600)
      .distinctUntilChanged()
      .subscribe((email: string) => {
        this.searchEmail(email);
      });
  }

  searchUsername(username: string) {
    this.usersService.checkUserLogin({username})
      .subscribe(() => {
        this.loginValid = true;
      }, (err) => {
        if (err.status === 400) {
          this.loginValid = false;
        }
      });
  }

  searchEmail(email: string) {
    this.usersService.checkUserEmail({email})
      .subscribe(() => {
        this.emailValid = true;
      }, (err) => {
        if (err.status === 400) {
          this.emailValid = false;
        }
      });
  }

  saveFirstPassword(firstPassword) {
    this.firstPassword = firstPassword;
  }

  checkPasswords(secondPassword: string) {
    if (secondPassword !== this.firstPassword) {
      this.passwordValid = false;
    } else {
      this.passwordValid = true;
    }
    console.log(this.passwordValid);
  }

  submitForm() {
    const userServer = {
      first_name: this.form.form.value.firstName,
      username: this.form.form.value.username,
      last_name: this.form.form.value.lastName,
      email: this.form.form.value.email,
      password: this.form.form.value.password
    };
    this.usersService.registrationUser(userServer)
      .subscribe((responce) => {
        console.log(responce);
        this.router.navigate(['/login']);
      }, (err) => {
        console.log(err);
      });
  }

}
