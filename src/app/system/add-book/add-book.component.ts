import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../shared/services/category.service';
import {Category} from '../../shared/models/category/category.model';
import {Subscription} from 'rxjs/Subscription';
import {CategoryPage} from '../../shared/models/category/category-page.model';
import {NgForm} from '@angular/forms';
import {NewBook} from '../../shared/models/book/new-book.model';
import {BooksService} from '../../shared/services/books.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  categories: Category[] = [];
  file: FileList;

  constructor(private categoryService: CategoryService,
              private bookService: BooksService) {
  }

  ngOnInit() {
    this.getCategories();
  }

  addCategory(categoryName: HTMLInputElement) {
    this.categoryService.newCategory(categoryName.value)
      .subscribe((newCategory: Category) => {
        this.categories.push(newCategory);
        console.log(this.categories);
      }, (err) => {
        console.log(err);
      });
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe((categoriesPage: CategoryPage) => {
        this.categories = categoriesPage.results;
      });
  }

  submitForm(form: NgForm) {
    const name = form.form.value.bookName;
    const author = form.form.value.author;
    const category = form.form.value.category;
    const newBook = new NewBook(name, author, this.file, category);
    this.bookService.createBook(newBook)
      .subscribe((book) => {
        alert('Книга успешно добавлена');
      }, (err) => {
        console.log(err);
      });
  }

  changeFile(event) {
    this.file = event.target.files;
    console.log(this.file);
  }

}
