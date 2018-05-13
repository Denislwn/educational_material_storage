import {UserPage} from '../models/user/user-page.model';
import {Observable} from 'rxjs/Observable';
import {BaseApi} from '../base/base-api';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AdminService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getBlockedUsers(page: number): Observable<UserPage> {
    return this.get(`users/?page=${page.toString()}&blocked=true`);
  }

  getFilterBlockedUsers(page: number, text: string) {
    return this.get(`users/search/?page=${page.toString()}&blocked=true&text=${text}`);
  }

  unBlockUser(userId: number): Observable<Object> {
    return this.post(`users/${userId.toString()}/unblock/`);
  }

  blockUser(userId: number): Observable<Object> {
    return this.post(`users/${userId.toString()}/block/`);
  }
}
