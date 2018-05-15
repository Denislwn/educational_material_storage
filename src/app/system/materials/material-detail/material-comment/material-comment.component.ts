import {Component, Input, OnInit} from '@angular/core';
import {MaterialComment} from '../../../../shared/models/comment/material-comment.model';

@Component({
  selector: 'app-material-comment',
  templateUrl: './material-comment.component.html',
  styleUrls: ['./material-comment.component.css']
})
export class MaterialCommentComponent implements OnInit {
  @Input() comment: MaterialComment;

  constructor() { }

  ngOnInit() {
  }

}
