import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Category} from '../../shared/models/category/category.model';
import {CategoryService} from '../../shared/services/category.service';
import {Subscription} from 'rxjs/Subscription';
import {NgForm} from '@angular/forms';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  editCategory: Category;
  termCategories$ = new Subject<string>();
  searchText = '';
  page: number;
  editCategoryNumber: number;
  showEditCategoryDialog = false;
  showAddCategoryDialog = false;
  @ViewChild('myForm') form: NgForm;
  subOnGetCategories: Subscription;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getCategories();
    this.subOnInputSearchField();
  }

  getCategories() {
    this.subOnGetCategories = this.categoryService.getCategories()
      .subscribe((categoriesPage: Category[]) => {
        this.categories = categoriesPage;
      });
  }

  subOnInputSearchField() {
    this.termCategories$
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe((term) => {
        this.searchText = term;
        this.getFilterCategories();
      });
  }

  getFilterCategories() {
    this.categoryService.getFilterCategories(this.searchText)
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  openAddCategoryDialog() {
    this.showAddCategoryDialog = true;
  }

  addNewCategory(category: Category) {
    if (category) {
      this.getCategories();
    }
  }

  openEditCategoryDialog(editCategoryNumber: number) {
    this.editCategoryNumber = editCategoryNumber;
    this.editCategory = this.categories[editCategoryNumber];
    this.showEditCategoryDialog = true;
  }

  successEditCategory(category: Category) {
    this.categories[this.editCategoryNumber] = category;
    this.editCategory = null;
    this.showEditCategoryDialog = false;
  }

  getUserRole() {
    return Number(localStorage.getItem('userRole'));
  }

  ngOnDestroy() {
    if (this.subOnGetCategories) {
      this.subOnGetCategories.unsubscribe();
    }
  }

}
