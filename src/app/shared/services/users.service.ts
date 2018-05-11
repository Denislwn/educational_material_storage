import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BaseApi} from '../base/base-api';
import {UserPage} from '../models/user/user-page.model';
import {User} from '../models/user/user.model';

@Injectable()
export class UsersService extends BaseApi {
  baseUrl = 'http://46.229.213.200/api/';

  constructor(public http: HttpClient) {
    super(http);
  }

  userLogin(user: Object): Observable<Object> {
    return this.http.post(this.baseUrl + 'login/', user);
  }

  registrationUser(user: Object): Observable<Object> {
    return this.http.post(this.baseUrl + 'registration/', user);
  }

  getUserInfo(userId: string): Observable<Object> {
    return this.get(`users/${userId}/`);
  }

  checkUserLogin(data: Object): Observable<Object> {
    return this.post(`users/check_username/`, data);
  }

  checkUserEmail(data: Object): Observable<Object> {
    return this.post(`users/check_email/`, data);
  }

  getRegistrationUsers(page: number): Observable<UserPage> {
    return this.get(`registration/?page=${page.toString()}`);
  }

  createUser(data: Object): Observable<Object> {
    return this.post(`users/`, data);
  }
}
