import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BaseApi} from '../base/base-api';
import {UserPage} from '../models/user/user-page.model';
import {User} from '../models/user/user.model';
import {MaterialPage} from '../models/book/material-page.model';

@Injectable()
export class UsersService extends BaseApi {
  baseUrl = '/api/';

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

  createUser(data: Object): Observable<MaterialPage> {
    return this.post(`users/`, data);
  }

  getUsers(): Observable<UserPage> {
    return this.get(`users/`);
  }

  getUserQuickToolBar(): Observable<MaterialPage> {
    return this.get(`materials/quick_toolbar/`);
  }
}
