import {Injectable} from '@angular/core';
import {BaseApi} from '../base/base-api';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {BookPage} from '../models/book/book-page.model';

@Injectable()
export class BooksService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  getBooks(): Observable<BookPage> {
    return this.get(`books/`);
  }
}
