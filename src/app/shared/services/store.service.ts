import {Injectable} from '@angular/core';
import {Book} from '../models/book/book.model';

@Injectable()
export class StoreService {
  books: Book[];
  userBooks: Book[];
  lastPage: boolean;
  page: number;
  booksListScroll: number;

  storeReset() {
    this.books = null;
    this.lastPage = null;
    this.page = null;
  }
}
