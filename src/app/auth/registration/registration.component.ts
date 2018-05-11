import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user/user.model';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  @ViewChild('myForm') form: NgForm;
  login$ = new Subject();
  email$ = new Subject();
  loginValid = true;
  emailValid = true;
  firstPassword: string;
  passwordValid = true;
  subOnLogin: Subscription;
  subOnEmail: Subscription;

  constructor(private usersService: UsersService,
              private router: Router) {
  }

  ngOnInit() {
    this.subOnInputUsernameField();
    this.subOnInputEmailField();
  }

  subOnInputUsernameField() {
    this.subOnLogin = this.login$
      .debounceTime(600)
      .distinctUntilChanged()
      .subscribe((username: string) => {
        this.searchUsername(username);
      });
  }

  subOnInputEmailField() {
    this.subOnEmail = this.email$
      .debounceTime(600)
      .distinctUntilChanged()
      .subscribe((email: string) => {
        this.searchEmail(email);
      });
  }

  searchUsername(username: string) {
    this.usersService.checkUserLogin({username})
      .subscribe((response: { free: boolean }) => {
        this.loginValid = response.free;
      });
  }

  searchEmail(email: string) {
    email = email.toLowerCase();
    this.usersService.checkUserEmail({email})
      .subscribe((response: { free: boolean }) => {
        this.emailValid = response.free;
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
      email: this.form.form.value.email.toLowerCase(),
      password: this.form.form.value.password
    };
    this.usersService.registrationUser(userServer)
      .subscribe((responce) => {
        this.router.navigate(['/login']);
      }, (err) => {
        console.log(err);
      });
  }

  ngOnDestroy(): void {
    if (this.subOnLogin) {
      this.subOnLogin.unsubscribe();
    }
    if (this.subOnEmail) {
      this.subOnEmail.unsubscribe();
    }
  }

}
