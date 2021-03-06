import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FoldersService} from '../../shared/services/folders.service';
import {Folder} from '../../shared/models/folder/folder.name';
import {FolderPage} from '../../shared/models/folder/folder-page.model';
import {Material} from '../../shared/models/material/material.model';
import {Subscription} from 'rxjs/Subscription';
import {StoreService} from '../../shared/services/store.service';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit, OnChanges {
  folders: Folder[];
  foldersPath: { folderId: number, folderName: string }[] = [];
  editFolder: Folder;
  folderParent: number = null;
  deleteObj: { title: string, message: string };
  deleteFolderNumber: number;
  showDeleteDialog = false;
  showEditFolderDialog = false;
  showAddFolderDialog = false;
  @Input() userId: number;
  @Input() refreshFolders: boolean;
  @Output() nestedMaterials = new EventEmitter<Material[]>();
  subOnRemoveFolder: Subscription;

  constructor(private foldersService: FoldersService,
              private storeService: StoreService) {
  }

  ngOnInit() {
    if (!this.storeService.folderId) {
      this.getFolders();
    }
  }

  ngOnChanges(): void {
    if (this.refreshFolders) {
      this.folders = [];
      if (this.storeService.folderId) {
        this.openNestedFolders(this.storeService.folderId[this.storeService.folderId.length - 1].folderId);
        this.foldersPath = this.storeService.folderId;
      } else {
        this.getFolders();
      }
    }
  }

  getFolders() {
    this.foldersService.getFolders(this.userId)
      .subscribe((folders: Folder[]) => {
        this.folders = folders;
        this.foldersPath = [];
        this.folderParent = null;
        this.storeService.folderId = null;
        this.nestedMaterials.emit(null);
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
        this.folderParent = folderPage.id;
        const folderPath = {folderId: folderPage.id, folderName: folderPage.name};
        this.getNewFoldersPath(folderPath);
        this.nestedMaterials.emit(folderPage.materials);
        this.storeService.folderId = this.foldersPath;
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

  openEditFolderDialog(editFolderNumber: number) {
    this.editFolder = this.folders[editFolderNumber];
    this.showEditFolderDialog = true;
  }

  successEditFolder(folder: Folder) {
    this.getFolders();
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

  getShowButton() {
    if (this.userId === Number(localStorage.getItem('userId'))) {
      return true;
    }
    return false;
  }

}
