import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from '../../../shared/models/user/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  @Input() user: User;
  @Output() clickOnUser = new EventEmitter<string>();

  constructor() { }

  userClick() {
    this.clickOnUser.emit(this.user.username);
  }

}
