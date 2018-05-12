import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {SystemRoutingModule} from './system-routing.module';
import {SystemComponent} from './system.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {AddMaterialComponent} from './add-material/add-material.component';
import {MaterialsComponent} from './materials/materials.component';
import {BookComponent} from './materials/material/material.component';
import {MaterialDetailComponent} from './materials/material-detail/material-detail.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {CategoriesComponent} from './categories/categories.component';
import {UserRolePipe} from '../shared/pipes/user-role.pipe';
import {DateFormatPipe} from '../shared/pipes/date-format.pipe';
import {PreloaderComponent} from '../shared/components/preloader/preloader.component';
import {DeleteDialogComponent} from '../shared/components/delete-dialog/delete-dialog.component';
import {AdminRegistrationComponent} from './admin/admin-registration/admin-registration.component';
import {RegisterUserDialogComponent} from './admin/admin-registration/register-user-dialog/register-user-dialog.component';
import {MyMaterialsComponent} from './my-materials/my-materials.component';
import {UsersComponent} from './users/users.component';
import {UserComponent} from './users/user/user.component';
import {UserBlockedPipe} from '../shared/pipes/user-blocked.pipe';
import {UserBlockDialogComponent} from './users/user-block-dialog/user-block-dialog.component';
import {AddMaterialButtonComponent} from '../shared/components/add-material-button/add-material-button.component';
import {BlockedUsersComponent} from './admin/blocked-users/blocked-users.component';
import {UserUnblockDialogComponent} from './admin/blocked-users/user-unblock-dialog/user-unblock-dialog.component';
import {AddCategoryComponent} from './categories/add-category/add-category.component';
import {EditCategoryDialogComponent} from './categories/edit-category-dialog/edit-category-dialog.component';


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
    CategoriesComponent,
    UserRolePipe,
    DateFormatPipe,
    PreloaderComponent,
    DeleteDialogComponent,
    AdminRegistrationComponent,
    RegisterUserDialogComponent,
    MyMaterialsComponent,
    UsersComponent,
    UserComponent,
    UserBlockedPipe,
    UserBlockDialogComponent,
    AddMaterialButtonComponent,
    BlockedUsersComponent,
    UserUnblockDialogComponent,
    AddCategoryComponent,
    EditCategoryDialogComponent,
  ]
})
export class SystemModule {
}
