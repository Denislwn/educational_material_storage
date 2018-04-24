import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Category} from '../../shared/models/category/category.model';
import {CategoryService} from '../../shared/services/category.service';
import {Subscription} from 'rxjs/Subscription';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  page: number;
  @ViewChild('myForm') form: NgForm;
  subOnAddCategory: Subscription;
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

  addCategory() {
    const categoryName = this.form.form.value.categoryName;
    this.subOnAddCategory = this.categoryService.newCategory(categoryName)
      .subscribe((newCategory: Category) => {
        this.categories.push(newCategory);
        this.form.reset();
      }, (err) => {
        console.log(err);
      }, () => {
        this.subOnAddCategory.unsubscribe();
      });
  }

  ngOnDestroy() {
    if (this.subOnGetCategories) {
      this.subOnGetCategories.unsubscribe();
    }
  }

}
