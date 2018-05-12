import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-file-type-list',
  templateUrl: './file-type-list.component.html',
  styleUrls: ['./file-type-list.component.css']
})
export class FileTypeListComponent implements OnInit {
  fileTypes = ['Документ', 'Аудио', 'Видео', 'Презентация', 'Фото', 'Другое'];
  @Output() typesOut = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  filterByTypes(form: NgForm) {
    const dict = Object.entries(form.form.value);
    let searchTypes = '';
    for (let i = 0; i < dict.length; i++) {
      if (dict[i][1] === true) {
        searchTypes += 'type=' + dict[i][0];
        if (i !== dict.length - 1) {
          searchTypes += '&';
        }
      }
    }
    this.typesOut.emit(searchTypes);
  }

}
