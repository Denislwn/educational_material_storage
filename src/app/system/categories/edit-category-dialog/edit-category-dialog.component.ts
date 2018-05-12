import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CategoryService} from '../../../shared/services/category.service';
import {Category} from '../../../shared/models/category/category.model';
import {Subscription} from 'rxjs/Subscription';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent {
  @Input() category: Category;
  @Input() visible: boolean;
  @Output() newCategory = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('myForm') form: NgForm;
  subOnEditCategory: Subscription;

  constructor(private categoryService: CategoryService) {
  }

  close() {
    this.visible = !this.visible;
    this.visibleChange.emit();
  }

  editCategory() {
    const categoryName = this.form.form.value.categoryName;
    this.subOnEditCategory = this.categoryService.editCategory(this.category.id, categoryName)
      .subscribe((editCategory: Category) => {
        this.form.reset();
        this.visible = !this.visible;
        this.visibleChange.emit();
        this.newCategory.emit(editCategory);
      }, (err) => {
        console.log(err);
      }, () => {
        this.subOnEditCategory.unsubscribe();
      });
  }

}
