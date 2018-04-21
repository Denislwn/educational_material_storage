import {Component, OnDestroy, OnInit} from '@angular/core';
import {Category} from '../../shared/models/category/category.model';
import {CategoryService} from '../../shared/services/category.service';
import {CategoryPage} from '../../shared/models/category/category-page.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  page: number;
  isLoad: boolean;
  lastPage: boolean;
  subOnAddCategory: Subscription;
  subOnGetCategories: Subscription;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.subOnGetCategories = this.categoryService.getCategories()
      .subscribe((categoriesPage: CategoryPage) => {
        this.categories = categoriesPage.results;
      });
  }

  addCategory(categoryName: HTMLInputElement) {
    this.subOnAddCategory = this.categoryService.newCategory(categoryName.value)
      .subscribe((newCategory: Category) => {
        this.categories.push(newCategory);
        console.log(this.categories);
      }, (err) => {
        console.log(err);
      }, () => {
        this.subOnAddCategory.unsubscribe();
      });
  }

  onScroll() {

  }

  ngOnDestroy() {
    if (this.subOnGetCategories) {
      this.subOnGetCategories.unsubscribe();
    }
  }

}
