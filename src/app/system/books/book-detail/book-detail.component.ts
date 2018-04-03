import {Component, OnInit} from '@angular/core';
import {Book} from '../../../shared/models/book/book.model';
import {BooksService} from '../../../shared/services/books.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book;

  constructor(private booksService: BooksService) {
  }

  ngOnInit() {
    this.getBook();
  }

  getBook() {
    this.book = this.booksService.book;
  }

  toFavorites() {
    this.booksService.addToFavorites(this.book.id)
      .subscribe((book) => {
        console.log(book);
      });
  }

}
