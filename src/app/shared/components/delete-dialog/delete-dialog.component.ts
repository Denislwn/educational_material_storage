import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {
  @Input() visible: boolean;
  @Input() deleteObj: {title: string, message: string};
  @Output() remove = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  close() {
    this.visible = !this.visible;
    this.visibleChange.emit();
  }

  removeElement() {
    this.visible = !this.visible;
    this.visibleChange.emit();
    this.remove.emit();
  }

}
