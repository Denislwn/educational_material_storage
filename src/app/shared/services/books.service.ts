import {Injectable} from '@angular/core';
import {BaseApi} from '../base/base-api';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {BookPage} from '../models/book/book-page.model';
import {NewBook} from '../models/book/new-book.model';
import {Book} from '../models/book/book.model';

@Injectable()
export class BooksService extends BaseApi {
  book: Book;

  constructor(public http: HttpClient) {
    super(http);
  }

  getBooks(page: number): Observable<BookPage> {
    return this.get(`books/?page=${page.toString()}`);
  }

  getBookById(bookId: number) {
    return this.get(`books/${bookId.toString()}/`);
  }

  createBook(book: NewBook): Observable<Object> {
    let finalData;
    const formData = new FormData();
    formData.append('name', book.name);
    formData.append('author', book.author);
    formData.append('categories', book.categories);
    formData.append('file', book.file[0]);
    finalData = formData;
    return this.post(`books/`, finalData);
  }

  getFilterBooks(text: string): Observable<BookPage> {
    return this.get(`books/search/?text=${text}`);
  }

  addToFavorites(bookId: number): Observable<Object> {
    return this.post(`books/${bookId.toString()}/take/`);
  }

  removeFromFavorites(bookId: number): Observable<Object> {
    return this.post(`books/${bookId.toString()}/remove/`);
  }

  removeBook(bookId: number): Observable<Object> {
    return this.delete(`books/${bookId.toString()}/`);
  }
}
