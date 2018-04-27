import {Component, OnInit} from '@angular/core';
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
  login$ = new Subject();
  loginValid: true;

  constructor(private usersService: UsersService,
              private router: Router) {
  }

  ngOnInit() {
  }

  submitForm(form: NgForm) {
    const userServer = {
      first_name: form.form.value.firstName,
      username: form.form.value.username,
      role: form.form.value.role,
      last_name: form.form.value.lastName,
      email: form.form.value.email,
      password: form.form.value.password
    };
    this.usersService.createUser(userServer)
      .subscribe((user: User) => {
        console.log(user);
        this.router.navigate(['/login']);
      }, (err) => {
        console.log(err);
      });
  }

}
