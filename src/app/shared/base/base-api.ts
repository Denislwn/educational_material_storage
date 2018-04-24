import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

export class BaseApi {
  private url = '/api/';
  headers = new HttpHeaders().set('Authorization', 'token ' + this.token());

  constructor(public http: HttpClient) {
  }

  getUrl(url: string) {
    return this.url + url;
  }

  get(url: string): Observable<any> {
    return this.http.get(
      this.getUrl(url), {
        headers: this.headers
      });
  }

  post(url: string, data: any = {}): Observable<any> {
    return this.http.post(
      this.getUrl(url),
      data,
      {headers: this.headers}
    );
  }

  delete(url: string): Observable<any> {
    return this.http.delete(
      this.getUrl(url),
      {headers: this.headers}
    );
  }

  private token() {
    return localStorage.getItem('token');
  }

}
