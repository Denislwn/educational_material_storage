import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm} from '@angular/forms';

@Component({
  selector: 'app-comment-field',
  templateUrl: './comment-field.component.html',
  styleUrls: ['./comment-field.component.css']
})
export class CommentFieldComponent implements OnInit {
  @Output() comment = new EventEmitter<string>();
  commentArea;
  text = '';

  constructor() {
  }

  ngOnInit() {
  }

  buttonComment(event) {
    if (event.shiftKey && event.keyCode === 13) {
      this.text += '\n';
    } else if (event.keyCode === 13) {
      this.sendComment();
      this.text = '';
    }
  }

  sendComment() {
    if (this.text !== '') {
      this.comment.emit(this.text);
      this.text = '';
    }
  }

}
