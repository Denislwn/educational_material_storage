import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {SystemRoutingModule} from './system-routing.module';
import {SystemComponent} from './system.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {AddMaterialComponent} from './add-material/add-material.component';
import {MaterialsComponent} from './books/materials.component';
import {BookComponent} from './books/material/material.component';
import {MaterialDetailComponent} from './books/material-detail/material-detail.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {AddCategoryComponent} from './add-category/add-category.component';
import {UserRolePipe} from '../shared/pipes/user-role.pipe';
import {DateFormatPipe} from '../shared/pipes/date-format.pipe';
import {PreloaderComponent} from '../shared/components/preloader/preloader.component';
import {DeleteDialogComponent} from '../shared/components/delete-dialog/delete-dialog.component';
import { AdminRegistrationComponent } from './admin-registration/admin-registration.component';
import { RegisterUserDialogComponent } from './admin-registration/register-user-dialog/register-user-dialog.component';
import { MyMaterialsComponent } from './my-materials/my-materials.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule,
    InfiniteScrollModule,
  ],
  declarations: [
    SystemComponent,
    UserInfoComponent,
    AddMaterialComponent,
    MaterialsComponent,
    BookComponent,
    MaterialDetailComponent,
    AddCategoryComponent,
    UserRolePipe,
    DateFormatPipe,
    PreloaderComponent,
    DeleteDialogComponent,
    AdminRegistrationComponent,
    RegisterUserDialogComponent,
    MyMaterialsComponent
  ]
})
export class SystemModule {
}
