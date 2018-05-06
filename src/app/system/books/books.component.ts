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
import {ActivatedRoute} from '@angular/router';
import {StoreService} from '../../shared/services/store.service';

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
  isPhone = false;
  isLoad: boolean;
  lastPage: boolean;
  scrollState = false;
  @ViewChild('booksList') booksList;

  constructor(private bookService: BooksService,
              private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService,
              private storeService: StoreService) {
  }

  ngOnInit() {
    if (this.booksList.nativeElement.clientWidth < 768) {
      this.isPhone = true;
    }
    this.getBooks();
    this.getCategories();
    this.subOnInputSearchField();
  }

  ngAfterViewInit(): void {
    if (this.scrollState) {
      if (!this.isPhone) {
        this.booksList.nativeElement.scrollTop = this.storeService.booksListScroll;
      } else {
        document.getElementsByTagName('html')[0].scrollTop = this.storeService.booksListScroll;
      }
    }
    this.scrollState = false;
  }

  getBooks() {
    this.isLoad = true;
    if (this.storeService.books) {
      this.getServiceBooks();
    } else {
      this.getServerBook();
    }
    this.storeService.storeReset();
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
        this.isLoad = false;
      }, (err) => {
        console.log(err);
      });
  }

  getServiceBooks() {
    this.books = this.storeService.books;
    this.page = this.storeService.page;
    this.lastPage = this.storeService.lastPage;
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
          this.isLoad = false;
        });
    }
  }

  clickOnBook() {
    this.storeService.books = this.books;
    this.storeService.lastPage = this.lastPage;
    this.storeService.page = this.page;
    if (!this.isPhone) {
      this.storeService.booksListScroll = this.booksList.nativeElement.scrollTop;
    } else {
      this.storeService.booksListScroll = document.getElementsByTagName('html')[0].scrollTop;
    }
  }
}
