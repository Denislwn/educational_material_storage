import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {NgForm} from '@angular/forms';
import {FoldersService} from '../../../shared/services/folders.service';
import {Folder} from '../../../shared/models/folder/folder.name';

@Component({
  selector: 'app-add-new-folder-dialog',
  templateUrl: './add-new-folder-dialog.component.html',
  styleUrls: ['./add-new-folder-dialog.component.css']
})
export class AddNewFolderDialogComponent {
  @Input() visible: boolean;
  @Input() folderParent: number;
  @Output() newFolder = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('myForm') form: NgForm;
  subOnAddFolder: Subscription;

  constructor(private foldersService: FoldersService) {
  }

  close() {
    this.visible = !this.visible;
    this.visibleChange.emit();
  }

  addFolder() {
    let url = `folders/`;
    if (this.folderParent) {
      url += `?parent=${this.folderParent.toString()}`;
    }
    const userFolder = this.checkUserFolder();
    this.subOnAddFolder = this.foldersService.addNewFolder(url, userFolder)
      .subscribe((folder: Folder) => {
        this.form.reset();
        this.close();
        this.newFolder.emit(folder);
      }, (err) => {
        console.log(err);
      }, () => {
        this.subOnAddFolder.unsubscribe();
      });
  }

  checkUserFolder() {
    const folderName = this.form.form.value.folderName;
    const folderIsOpen = Boolean(this.form.form.value.isOpen);
    if (this.folderParent) {
      return {name: folderName, is_open: folderIsOpen, parent: this.folderParent};
    } else {
      return {name: folderName, is_open: folderIsOpen};
    }
  }

}
