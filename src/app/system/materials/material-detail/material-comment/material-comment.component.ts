import {Component, Input} from '@angular/core';
import {MaterialComment} from '../../../../shared/models/comment/material-comment.model';
import {UtilsService} from '../../../../shared/services/utils.service';

@Component({
  selector: 'app-material-comment',
  templateUrl: './material-comment.component.html',
  styleUrls: ['./material-comment.component.css']
})
export class MaterialCommentComponent {
  @Input() comment: MaterialComment;

  constructor(private utilsService: UtilsService) {
  }

  getUserImage() {
    return this.utilsService.getUserImage(this.comment.user.role);
  }
}
