import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UtilsService} from '../../services/utils.service';
import {StoreService} from '../../services/store.service';

@Component({
  selector: 'app-file-type-list',
  templateUrl: './file-type-list.component.html',
  styleUrls: ['./file-type-list.component.css']
})
export class FileTypeListComponent implements OnInit {
  fileTypes = ['Документ', 'Аудио', 'Видео', 'Презентация', 'Фото', 'Другое'];
  savesFileTypes = [false, false, false, false, false, false];
  @Input() fileTypesListState;
  @Output() typesOut = new EventEmitter<string>();

  constructor(private storeService: StoreService,
              private utils: UtilsService) {
  }

  ngOnInit(): void {
    if (this.storeService.materialFileTypes && this.fileTypesListState === 'MATERIALS') {
      this.getSelectedFileTypes(this.storeService.materialFileTypes);
      this.storeService.materialFileTypes = null;
    }
    if (this.storeService.userMaterialFileTypes && this.fileTypesListState === 'USER_MATERIALS') {
      this.getSelectedFileTypes(this.storeService.userMaterialFileTypes);
      this.storeService.userMaterialFileTypes = null;
    }
  }

  filterByTypes(form: NgForm) {
    const param = 'type=';
    const searchTypes = this.utils.formationParams(form.form.value, param);
    this.typesOut.emit(searchTypes);
  }

  getSelectedFileTypes(types: string) {
    const arr = this.utils.parseParams(types);
    for (const i of arr) {
      if (i !== 0) {
        this.savesFileTypes[i - 1] = true;
      }
    }
  }
}
