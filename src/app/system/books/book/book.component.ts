import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../../../shared/models/book/book.model';
import {Router} from '@angular/router';
import {BooksService} from '../../../shared/services/books.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  @Input() book: Book;

  constructor(private router: Router,
              private booksService: BooksService) { }

  ngOnInit() {
  }

  openBookDetail() {
    this.booksService.book = this.book;
    this.router.navigate([`/system/books/${this.book.id}`]);
  }

}
