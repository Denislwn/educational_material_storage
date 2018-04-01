import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user.model';

@Injectable()
export class UsersService {
  baseUrl = 'http://127.0.0.1:8000/api/';

  constructor(public http: HttpClient) {
  }

  userLogin(user: Object): Observable<Object> {
    return this.http.post(this.baseUrl + 'login/', user);
  }

  createUser(user: Object): Observable<Object> {
    return this.http.post(this.baseUrl + 'users/', user);
  }
}
