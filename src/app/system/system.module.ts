import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {SystemRoutingModule} from './system-routing.module';
import {SystemComponent} from './system.component';
import {UserInfoComponent} from './user-info/user-info.component';
import { AddBookComponent } from './add-book/add-book.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule,
  ],
  declarations: [
    SystemComponent,
    UserInfoComponent,
    AddBookComponent
  ]
})
export class SystemModule {
}
