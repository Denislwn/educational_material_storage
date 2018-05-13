import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Material} from '../../../../shared/models/material/material.model';
import {Folder} from '../../../../shared/models/folder/folder.name';
import {FoldersService} from '../../../../shared/services/folders.service';
import {FolderPage} from '../../../../shared/models/folder/folder-page.model';

@Component({
  selector: 'app-add-folder-path',
  templateUrl: './add-folder-path.component.html',
  styleUrls: ['./add-folder-path.component.css']
})
export class AddFolderPathComponent implements OnInit {
  @Input() visible: boolean;
  @Input() material: Material;
  @Output() addMaterialToFolder = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  folders: Folder[];
  materials: Material[];
  folderParent: number;
  foldersPath: { folderId: number, folderName: string }[] = [];
  userId = Number(localStorage.getItem('userId'));

  constructor(private foldersService: FoldersService) {
  }

  ngOnInit() {
    this.getFolders();
  }

  getFolders() {
    this.foldersService.getFolders(this.userId)
      .subscribe((folders: Folder[]) => {
        this.folders = folders;
        this.foldersPath = [];
      });
  }

  getNextFolder(folderId: number) {
    if (this.folderParent === folderId) {
      return;
    } else {
      this.openNestedFolders(folderId);
    }
  }

  openNestedFolders(folderId: number) {
    this.foldersService.getNestedFolders(folderId, this.userId)
      .subscribe((folderPage: FolderPage) => {
        this.folders = folderPage.folders;
        this.materials = folderPage.materials;
        this.folderParent = folderPage.id;
        const folderPath = {folderId: folderPage.id, folderName: folderPage.name};
        this.getNewFoldersPath(folderPath);
      });
  }

  getNewFoldersPath(folderPath: { folderId: number, folderName: string }) {
    let clickNumberFolder = -1;
    for (let i = 0; i < this.foldersPath.length; i++) {
      if (folderPath.folderId === this.foldersPath[i].folderId) {
        clickNumberFolder = i;
        break;
      }
    }
    if (clickNumberFolder !== -1) {
      clickNumberFolder += 1;
      this.foldersPath.splice(clickNumberFolder);
    } else {
      this.foldersPath.push(folderPath);
    }
    console.log(this.foldersPath);
  }

  close() {
    this.visible = !this.visible;
    this.visibleChange.emit();
  }

  putInFolder() {
    const folder = {folder: this.folderParent};
    this.foldersService.addMaterialToTheFolder(this.material.id, folder)
      .subscribe(() => {
        this.addMaterialToFolder.emit();
        this.close();
      });
  }

}
