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

  getBlockedUsers(): Observable<UserPage> {
    return this.get(`users/?blocked=true`);
  }

  unBlockUser(userId: number): Observable<Object> {
    return this.post(`users/${userId.toString()}/unblock/`);
  }

  blockUser(userId: number): Observable<Object> {
    return this.post(`users/${userId.toString()}/block/`);
  }
}
