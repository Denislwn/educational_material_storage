import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Material} from '../../../../shared/models/material/material.model';
import {MaterialsService} from '../../../../shared/services/materials.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-edit-material-dialog',
  templateUrl: './edit-material-dialog.component.html',
  styleUrls: ['./edit-material-dialog.component.css']
})
export class EditMaterialDialogComponent implements OnInit {
  @Input() visible: boolean;
  @Input() material: Material;
  @Output() successEditMaterial = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('myForm') form: NgForm;

  constructor(private materialsService: MaterialsService) {
  }

  ngOnInit() {
  }

  editMaterial() {
    const editObjectMaterial = this.getFormValues();
    this.materialsService.editMaterial(this.material.id, editObjectMaterial)
      .subscribe((material: Material) => {
        this.successEditMaterial.emit(material);
        this.close();
      });
  }

  getFormValues() {
    const name = this.form.form.value.materialName;
    const author = this.form.form.value.author;
    const is_open = this.form.form.value.materialIsOpen;
    return {name, author, is_open};
  }

  close() {
    this.visible = !this.visible;
    this.visibleChange.emit();
  }

}
