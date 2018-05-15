import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MaterialComment} from '../../../../shared/models/comment/material-comment.model';
import {UtilsService} from '../../../../shared/services/utils.service';

@Component({
  selector: 'app-material-comment',
  templateUrl: './material-comment.component.html',
  styleUrls: ['./material-comment.component.css']
})
export class MaterialCommentComponent {
  @Input() comment: MaterialComment;
  @Output() remove = new EventEmitter();

  constructor(private utilsService: UtilsService) {
  }

  getUserImage() {
    return this.utilsService.getUserImage(this.comment.user.role);
  }

  getUserRights() {
    const userRole = Number(localStorage.getItem('userRole'));
    if (userRole === 3 || userRole === 4) {
      return true;
    }
    return false;
  }

  removeComment() {
    this.remove.emit(this.comment.id);
  }
}
