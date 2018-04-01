import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../shared/services/category.service';
import {Category} from '../../shared/models/category.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
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

  }

}
