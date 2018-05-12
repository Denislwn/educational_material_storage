import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Category} from '../../../shared/models/category/category.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {CategoryService} from '../../../shared/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  @Input() visible: boolean;
  @Output() newCategory = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('myForm') form: NgForm;
  subOnAddCategory: Subscription;

  constructor(private categoryService: CategoryService) { }

  close() {
    this.visible = !this.visible;
    this.visibleChange.emit();
  }

  addCategory() {
    const categoryName = this.form.form.value.categoryName;
    this.subOnAddCategory = this.categoryService.newCategory(categoryName)
      .subscribe((newCategory: Category) => {
        this.form.reset();
        this.visible = !this.visible;
        this.visibleChange.emit();
        this.newCategory.emit(newCategory);
      }, (err) => {
        console.log(err);
      }, () => {
        this.subOnAddCategory.unsubscribe();
      });
  }
}
