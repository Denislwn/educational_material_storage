import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
  @Input() visible: boolean;
  @Output() remove = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
  }

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
