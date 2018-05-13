import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {NgForm} from '@angular/forms';
import {Folder} from '../../../shared/models/folder/folder.name';
import {FoldersService} from '../../../shared/services/folders.service';

@Component({
  selector: 'app-edit-folder-dialog',
  templateUrl: './edit-folder-dialog.component.html',
  styleUrls: ['./edit-folder-dialog.component.css']
})
export class EditFolderDialogComponent implements OnInit {
  @Input() folder: Folder;
  @Input() visible: boolean;
  @Output() newFolder = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('myForm') form: NgForm;
  subOnEditFolder: Subscription;

  constructor(private foldersService: FoldersService) { }

  ngOnInit() {
  }

  close() {
    this.visible = !this.visible;
    this.visibleChange.emit();
  }

  editFolder() {
    const folderName = this.form.form.value.folderName;
    const folderIsOpen = Boolean(this.form.form.value.isOpen);
    const userFolder = {name: folderName, is_open: folderIsOpen};
    this.subOnEditFolder = this.foldersService.editFolder(this.folder.id, userFolder)
      .subscribe((editFolder: Folder) => {
        this.form.reset();
        this.close();
        this.newFolder.emit(editFolder);
      }, (err) => {
        console.log(err);
      }, () => {
        this.subOnEditFolder.unsubscribe();
      });
  }

}
