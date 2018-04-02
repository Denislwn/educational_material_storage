import {Injectable} from '@angular/core';
import {BaseApi} from '../base/base-api';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {BookPage} from '../models/book/book-page.model';
import {NewBook} from '../models/book/new-book.model';

@Injectable()
export class BooksService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  getBooks(): Observable<BookPage> {
    return this.get(`books/`);
  }

  createBook(book: NewBook): Observable<Object> {
    let finalData;
    const formData = new FormData();
    const obj = {
      name: book.name,
      author: book.author,
      categories: book.categories
    };
    formData.append('name', book.name);
    formData.append('author', book.author);
    formData.append('categories', book.categories);
    formData.append('file', book.file[0]);
    finalData = formData;
    console.log(finalData);
    return this.post(`books/`, finalData);
  }
}
