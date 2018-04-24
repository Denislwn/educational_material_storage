import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../shared/services/category.service';
import {Category} from '../../shared/models/category/category.model';
import {Subscription} from 'rxjs/Subscription';
import {CategoryPage} from '../../shared/models/category/category-page.model';
import {NgForm} from '@angular/forms';
import {NewBook} from '../../shared/models/book/new-book.model';
import {BooksService} from '../../shared/services/books.service';
import {Router} from '@angular/router';
import {Book} from '../../shared/models/book/book.model';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  categories: Category[] = [];
  file: FileList;
  categoriesList = [];
  categoriesVisibleList = [];
  fileInputValue = 'Выберите файл';
  fileValid = false;
  categoriesValid = true;

  constructor(private categoryService: CategoryService,
              private bookService: BooksService,
              private router: Router) {
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe((categoriesPage: Category[]) => {
        this.categories = categoriesPage;
        this.categoriesVisibleList.push(this.categories[0].id);
        this.categoriesList.push(this.categories[0].id);
      });
  }

  submitForm(form: NgForm) {
    const name = form.form.value.bookName;
    const author = form.form.value.author;
    const newBook = new NewBook(name, author, this.file, this.categoriesList);
    this.bookService.createBook(newBook)
      .subscribe((book: Book) => {
        this.resetForm(form);
        this.router.navigate([`/system/books/${book.id}`]);
      }, (err) => {
        console.log(err);
      });
  }

  changeFile(event) {
    this.file = event.target.files;
    this.fileInputValue = event.target.value;
    this.fileValid = true;
  }

  addCategory() {
    let k = -1;
    this.categories.map((i, index) => {
      if (k !== -1) {
        return;
      }
      for (const j of this.categoriesList) {
        if (j === i.id) {
          k = -1;
          break;
        } else {
          k = index;
        }
      }
    });
    this.categoriesList.push(this.categories[k].id);
    this.categoriesVisibleList.push(this.categories[k].id);
  }

  changeCategory(categoryId: string, numberCategory: number) {
    if (this.categoriesValid) {
      this.checkCategories(Number(categoryId));
      this.categoriesList[numberCategory] = Number(categoryId);
    } else {
      this.categoriesList[numberCategory] = Number(categoryId);
      this.checkDuplicate();
    }
  }

  removeCategory(numberCategory: number) {
    this.categoriesList.splice(numberCategory, 1);
    this.categoriesVisibleList.splice(numberCategory, 1);
  }

  checkCategories(categoryId: number) {
    for (const i of this.categoriesList) {
      if (i === categoryId) {
        this.categoriesValid = false;
        break;
      }
    }
  }

  checkDuplicate() {
    this.categoriesValid = true;
    for (const i of this.categoriesList) {
      let k = 0;
      for (const j of this.categoriesList) {
        if (i === j) {
          k++;
        }
      }
      if (k > 1) {
        this.categoriesValid = false;
        break;
      }
    }
  }

  resetForm(form: NgForm) {
    form.reset();
    this.fileValid = false;
    this.categoriesValid = true;
    this.categoriesList = [];
    this.categoriesList.push(this.categories[0].id);
    this.categoriesVisibleList = [];
    this.categoriesVisibleList.push(this.categories[0].id);
    this.file = null;
    this.fileInputValue = 'Выберите файл';
  }

}
