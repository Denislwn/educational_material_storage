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
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  categories: Category[];
  termBook$ = new Subject<string>();
  page: number;
  isLoad: boolean;
  lastPage: boolean;

  constructor(private bookService: BooksService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getBooks();
    this.getCategories();
    this.subOnInputSearchField();
  }

  getBooks() {
    this.page = 1;
    this.isLoad = true;
    this.lastPage = false;
    this.bookService.getBooks(this.page)
      .subscribe((bookPage: BookPage) => {
        this.books = bookPage.results;
        if (bookPage.next === null) {
          this.lastPage = true;
        }
        this.isLoad = false;
        console.log(this.books.length);
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

  filterByCategories(form: NgForm) {
    const dict = Object.entries(form.form.value);
    let searchCategories = '';
    for (let i = 0; i < dict.length; i++) {
      if (dict[i][1] === true) {
        searchCategories += 'category=' + dict[i][0];
        if (i !== dict.length - 1) {
          searchCategories += '&';
        }
      }
    }
    this.isLoad = true;
    this.page = 1;
    this.categoryService.getFilterCategories(searchCategories)
      .subscribe((bookPage: BookPage) => {
        this.books = bookPage.results;
        if (bookPage.next === null) {
          this.lastPage = true;
        }
        this.isLoad = false;
      });
  }

  onScroll() {
    this.getNextBookPage();
  }

  getNextBookPage() {
    if (!this.isLoad && !this.lastPage) {
      this.isLoad = true;
      this.page += 1;
      this.bookService.getBooks(this.page)
        .subscribe((bookPage: BookPage) => {
          this.books = this.books.concat(bookPage.results);
          if (bookPage.next === null) {
            this.lastPage = true;
          }
          this.isLoad = false;
        });
    }
  }

}
