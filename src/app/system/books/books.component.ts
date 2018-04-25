import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Book} from '../../shared/models/book/book.model';
import {BooksService} from '../../shared/services/books.service';
import {BookPage} from '../../shared/models/book/book-page.model';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {CategoryService} from '../../shared/services/category.service';
import {Category} from '../../shared/models/category/category.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, AfterViewInit {
  books: Book[] = [];
  categories: Category[];
  termBook$ = new Subject<string>();
  page: number;
  isLoad: boolean;
  lastPage: boolean;
  scrollState = false;
  @ViewChild('booksList') booksList;

  constructor(private bookService: BooksService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getBooks();
    this.getCategories();
    this.subOnInputSearchField();
  }

  ngAfterViewInit(): void {
    if (this.scrollState) {
      this.booksList.nativeElement.scrollTop = this.bookService.booksListScroll;
    }
    this.scrollState = false;
  }

  getBooks() {
    this.isLoad = true;
    if (this.bookService.books) {
      this.getServiceBooks();
    } else {
      this.getServerBook();
    }
  }

  getCategories() {
    if (this.categoryService.categories) {
      this.categories = this.categoryService.categories;
    } else {
      this.getServerCategories();
    }
  }

  getServerBook() {
    this.page = 1;
    this.lastPage = false;
    this.bookService.getBooks(this.page)
      .subscribe((bookPage: BookPage) => {
        this.books = bookPage.results;
        if (bookPage.next === null) {
          this.lastPage = true;
        }
        this.saveBooks();
        this.isLoad = false;
      }, (err) => {
        console.log(err);
      });
  }

  getServiceBooks() {
    this.books = this.bookService.books;
    this.page = this.bookService.page;
    this.lastPage = this.bookService.lastPage;
    this.scrollState = true;
    this.isLoad = false;
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
      this.page = 1;
      this.isLoad = true;
      this.lastPage = false;
      this.bookService.getFilterBooks(text)
        .subscribe((bookPage) => {
          this.books = bookPage.results;
          if (bookPage.next === null) {
            this.lastPage = true;
          }
        });
    } else {
      this.getServerBook();
    }
  }

  getServerCategories() {
    this.categoryService.getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.categoryService.categories = this.categories;
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
    this.categoryService.getFilterBooksByCategories(searchCategories)
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
          this.saveBooks();
          this.isLoad = false;
        });
    }
  }

  saveBooks() {
    this.bookService.books = this.books;
    this.bookService.lastPage = this.lastPage;
    this.bookService.page = this.page;
  }

  scrollPosition() {
    this.bookService.booksListScroll = this.booksList.nativeElement.scrollTop;
  }

}
