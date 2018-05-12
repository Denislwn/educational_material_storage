import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Category} from '../../shared/models/category/category.model';
import {CategoryService} from '../../shared/services/category.service';
import {Subscription} from 'rxjs/Subscription';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  editCategory: Category;
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
  }

  getCategories() {
    this.subOnGetCategories = this.categoryService.getCategories()
      .subscribe((categoriesPage: Category[]) => {
        this.categories = categoriesPage;
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
