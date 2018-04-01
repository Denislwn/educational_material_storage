import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user.model';

@Injectable()
export class UsersService {

  constructor(public http: HttpClient) {
  }

  userLogin(username: string, password: string): Observable<Object> {
    const user = {
      username: username,
      password: password
    };
    console.log(user);
    return this.http.post('http://127.0.0.1:8000/api/login/', user);
  }
}
