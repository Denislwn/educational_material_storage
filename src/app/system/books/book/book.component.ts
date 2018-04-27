import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from '../../../shared/models/book/book.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  @Input() book: Book;
  @Output() clickOnBook = new EventEmitter();

  constructor() {
  }

  bookClick() {
    this.clickOnBook.emit();
  }

}
