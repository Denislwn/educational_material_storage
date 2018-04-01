import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user.model';
import {BaseApi} from '../base/base-api';

@Injectable()
export class UsersService extends BaseApi {
  baseUrl = 'http://127.0.0.1:8000/api/';

  constructor(public http: HttpClient) {
    super(http);
  }

  userLogin(user: Object): Observable<Object> {
    return this.http.post(this.baseUrl + 'login/', user);
  }

  createUser(user: Object): Observable<Object> {
    return this.http.post(this.baseUrl + 'users/', user);
  }

  getUserInfo(userId: string): Observable<User> {
    return this.get(`users/${userId}/`);
  }
}
