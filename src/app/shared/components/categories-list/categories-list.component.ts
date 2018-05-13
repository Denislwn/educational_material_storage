import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../models/category/category.model';
import {CategoryService} from '../../services/category.service';
import {NgForm} from '@angular/forms';
import {UtilsService} from '../../services/utils.service';
import {StoreService} from '../../services/store.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  categories: Category[];
  saveCategories = [];
  @Input() categoriesListState: string;
  @Output() categoriesOut = new EventEmitter<string>();

  constructor(private categoryService: CategoryService,
              private storeService: StoreService,
              private utils: UtilsService) {
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe((categories: Category[]) => {
        console.log(this.categories);
        this.categories = categories;
        this.getSelectedCategories();
      }, (err) => {
        console.log(err);
      });
  }

  getSelectedCategories() {
    if (this.storeService.materialCategories && this.categoriesListState === 'MATERIALS') {
      this.getParseSelectedCategories(this.storeService.materialCategories);
      console.log(this.saveCategories);
      this.storeService.materialCategories = null;
    } else if (this.storeService.userMaterialCategories && this.categoriesListState === 'USER_MATERIALS') {
      this.getParseSelectedCategories(this.storeService.materialCategories);
      this.storeService.userMaterialCategories = null;
    }
  }

  filterByCategories(form: NgForm) {
    const param = 'category=';
    const searchCategories = this.utils.formationParams(form.form.value, param);
    this.categoriesOut.emit(searchCategories);
  }

  getParseSelectedCategories(types: string) {
    const arr = this.utils.parseParams(types);
    for (const i of arr) {
      if (i > 0) {
        // this.saveCategories[i - 1] = true;
        for (let j = 0; j < this.categories.length; j++) {
          if (this.categories[j].id === Number(i)) {
            this.saveCategories[j] = true;
          }
        }
      }
    }
  }

}
