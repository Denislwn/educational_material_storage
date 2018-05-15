import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Material} from '../../../shared/models/material/material.model';

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

  getImage() {
    switch (this.material.type) {
      case 1: {
        return 'document.png';
      }
      case 2: {
        return 'audio.png';
      }
      case 3: {
        return 'video.png';
      }
      case 4: {
        return 'presentation.png';
      }
      case 5: {
        return 'foto.png';
      }
      default: {
        return 'other.png';
      }
    }
  }

}
