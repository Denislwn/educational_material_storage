import {BaseApi} from '../base/base-api';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {BookPage} from '../models/book/book-page.model';
import {Category} from '../models/category/category.model';

@Injectable()
export class CategoryService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  newCategory(name: string): Observable<Object> {
    return this.post(`categories/`, {name: name});
  }

  getCategories(): Observable<Category[]> {
    return this.get(`categories/`);
  }

  getFilterBooksByCategories(categories: string): Observable<BookPage> {
    return this.get(`books/?${categories}`);
  }
}
