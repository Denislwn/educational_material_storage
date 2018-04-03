import {Component, OnInit} from '@angular/core';
import {Book} from '../../shared/models/book/book.model';
import {BooksService} from '../../shared/services/books.service';
import {BookPage} from '../../shared/models/book/book-page.model';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  termBook$ = new Subject<string>();

  constructor(private bookService: BooksService) {
  }

  ngOnInit() {
    this.getBooks();
    this.subOnInputSearchField();
  }

  getBooks() {
    this.bookService.getBooks()
      .subscribe((bookPage: BookPage) => {
        this.books = bookPage.results;
      });
  }

  subOnInputSearchField() {
    this.termBook$
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe((term) => {
        this.search(term);
      });
  }

  search(text: string) {
    if (text !== '') {
      this.bookService.getFilterBooks(text)
        .subscribe((bookPage) => {
          this.books = bookPage.results;
        });
    } else {
      this.getBooks();
    }
  }

}
