import {Component, OnInit} from '@angular/core';
import {Book} from '../../shared/models/book/book.model';
import {BooksService} from '../../shared/services/books.service';
import {BookPage} from '../../shared/models/book/book-page.model';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {CategoryService} from '../../shared/services/category.service';
import {Category} from '../../shared/models/category/category.model';
import {CategoryPage} from '../../shared/models/category/category-page.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  categories: Category[];
  termBook$ = new Subject<string>();

  constructor(private bookService: BooksService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getBooks();
    this.getCategories();
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

  getCategories() {
    this.categoryService.getCategories()
      .subscribe((categories: CategoryPage) => {
        this.categories = categories.results;
      }, (err) => {
        console.log(err);
      });
  }

}
