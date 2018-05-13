import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FoldersService} from '../../shared/services/folders.service';
import {Folder} from '../../shared/models/folder/folder.name';
import {FolderPage} from '../../shared/models/folder/folder-page.model';
import {Material} from '../../shared/models/material/material.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit {
  folders: Folder[];
  editFolder: Folder;
  folderParent: number = null;
  deleteObj: { title: string, message: string };
  editFolderNumber: number;
  deleteFolderNumber: number;
  showDeleteDialog = false;
  showEditFolderDialog = false;
  showAddFolderDialog = false;
  @Output() nestedMaterials = new EventEmitter<Material[]>();
  subOnRemoveFolder: Subscription;

  constructor(private foldersService: FoldersService) {
  }

  ngOnInit() {
    this.getFolders();
  }

  getFolders() {
    this.foldersService.getFolders()
      .subscribe((folders: Folder[]) => {
        this.folders = folders;
      });
  }

  openAddFolderDialog() {
    this.showAddFolderDialog = true;
  }

  addNewFolder(folder: Folder) {
    if (!this.folderParent) {
      this.getFolders();
    } else {
      this.openNestedFolders(this.folderParent);
    }
  }

  openNestedFolders(folderNumber: number) {
    this.foldersService.getNestedFolders(folderNumber)
      .subscribe((folderPage: FolderPage) => {
        this.folders = folderPage.folders;
        this.folderParent = folderPage.id;
        console.log(this.folderParent);
        this.nestedMaterials.emit(folderPage.materials);
      });
  }

  openEditFolderDialog(editFolderNumber: number) {
    this.editFolderNumber = editFolderNumber;
    this.editFolder = this.folders[editFolderNumber];
    this.showEditFolderDialog = true;
  }

  successEditFolder(folder: Folder) {
    this.folders[this.editFolderNumber] = folder;
    this.editFolder = null;
    this.showEditFolderDialog = false;
  }

  openDeleteDialog(folderNumber: number) {
    this.deleteFolderNumber = folderNumber;
    const message = `папку "${this.folders[folderNumber].name}"`;
    this.deleteObj = {title: 'папки', message: message};
    this.showDeleteDialog = true;
  }

  removeFolder() {
    this.subOnRemoveFolder = this.foldersService.removeFolder(this.folders[this.deleteFolderNumber].id)
      .subscribe(() => {
        this.folders.splice(this.deleteFolderNumber, 1);
      }, (err) => {
        console.log(err);
      }, () => {
        this.subOnRemoveFolder.unsubscribe();
      });
  }

}
