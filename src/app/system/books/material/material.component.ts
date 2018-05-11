import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Material} from '../../../shared/models/book/material.model';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class BookComponent {
  @Input() material: Material;
  @Output() clickOnBook = new EventEmitter();

  constructor() {
  }

  materialClick() {
    this.clickOnBook.emit();
  }

}
