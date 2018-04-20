import {Component, OnInit} from '@angular/core';
import {Book} from '../../../shared/models/book/book.model';
import {BooksService} from '../../../shared/services/books.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book;
  electedMessage = 'Добавить в избранное';
  subOnToElected: Subscription;
  subOnFromElected: Subscription;

  constructor(private booksService: BooksService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getBook();
  }

  getBook() {
    this.activatedRoute.params
      .subscribe((params) => {
        this.booksService.getBookById(params['book_id'])
          .subscribe((book: Book) => {
            this.book = book;
            if (this.book.elected) {
              this.electedMessage = 'Убрать из избранного';
            }
          });
      });
  }

  toElectedButton() {
    if (this.book.elected) {
      this.fromElected();
    } else {
      this.toElected();
    }
  }

  toElected() {
    this.subOnToElected = this.booksService.addToFavorites(this.book.id)
      .subscribe((responce) => {
        this.book.elected = true;
        this.electedMessage = 'Убрать из избранного';
      }, (err) => {
        console.log(err);
      }, () => {
        this.subOnToElected.unsubscribe();
      });
  }

  fromElected() {
    this.subOnFromElected = this.booksService.removeFromFavorites(this.book.id)
      .subscribe((responce) => {
        this.book.elected = false;
        this.electedMessage = 'Добавить в избранное';
      }, (err) => {
        console.log(err);
      }, () => {
        this.subOnFromElected.unsubscribe();
      });
  }

}
