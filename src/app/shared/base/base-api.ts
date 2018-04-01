import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

export class BaseApi {
  private url = 'http://127.0.0.1:8000/api/';

  constructor(public http: HttpClient) {
  }

  getUrl(url: string) {
    return this.url + url;
  }

  get(url: string): Observable<any> {
    return this.http.get(
      this.getUrl(url), {
        headers: new HttpHeaders().set('Authorization', 'token ' + this.token()),
      });
  }

  post(url: string, data: any = {}): Observable<any> {
    return this.http.post(
      this.getUrl(url),
      data,
      {headers: new HttpHeaders().set('Authorization', 'token ' + this.token())}
    );
  }

  private token() {
    return localStorage.getItem('token');
  }

}