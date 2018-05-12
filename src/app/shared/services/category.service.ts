import {BaseApi} from '../base/base-api';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {MaterialPage} from '../models/material/material-page.model';
import {Category} from '../models/category/category.model';

@Injectable()
export class CategoryService extends BaseApi {
  categories: Category[];

  constructor(public http: HttpClient) {
    super(http);
  }

  newCategory(name: string): Observable<Object> {
    return this.post(`categories/`, {name: name});
  }

  getCategories(): Observable<Category[]> {
    return this.get(`categories/`);
  }

  editCategory(categoryId: number, name: string): Observable<Category> {
    return this.patch(`categories/${categoryId.toString()}/`, {name});
  }

  getFilterCategories(text: string): Observable<Category[]> {
    return this.get(`categories/search/?text=${text}`);
  }
}
