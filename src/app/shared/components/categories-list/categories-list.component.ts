import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Category} from '../../models/category/category.model';
import {CategoryService} from '../../services/category.service';
import {MaterialPage} from '../../models/material/material-page.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  categories: Category[];
  @Output() categoriesOut = new EventEmitter<string>();

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    if (this.categoryService.categories) {
      this.categories = this.categoryService.categories;
    } else {
      this.getServerCategories();
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
    this.categoriesOut.emit(searchCategories);
  }

}
