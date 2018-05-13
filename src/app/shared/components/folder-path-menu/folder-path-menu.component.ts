import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-folder-path-menu',
  templateUrl: './folder-path-menu.component.html',
  styleUrls: ['./folder-path-menu.component.css']
})
export class FolderPathMenuComponent {
  @Input() foldersPath = [];
  @Input() folderParent: number;
  @Output() rootFolder = new EventEmitter();
  @Output() nextFolder = new EventEmitter<number>();

}
