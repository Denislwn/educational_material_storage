import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../shared/services/category.service';
import {Category} from '../../shared/models/category/category.model';
import {Subscription} from 'rxjs/Subscription';
import {CategoryPage} from '../../shared/models/category/category-page.model';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

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

}
