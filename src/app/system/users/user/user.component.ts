import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from '../../../shared/models/user/user.model';
import {UtilsService} from '../../../shared/services/utils.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  @Input() user: User;
  @Output() clickOnUser = new EventEmitter<string>();

  constructor(private utilsService: UtilsService) { }

  userClick() {
    this.clickOnUser.emit(this.user.username);
  }

  getUserImage() {
    return this.utilsService.getUserImage(this.user.role);
  }

}
