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
import {SearchFieldComponent} from '../shared/components/search-field/search-field.component';
import {CategoriesListComponent} from '../shared/components/categories-list/categories-list.component';
import {FileTypeListComponent} from '../shared/components/file-type-list/file-type-list.component';
import {UserRoleListComponent} from '../shared/components/user-role-list/user-role-list.component';
import {ChangePassworDialogComponent} from './user-info/change-passwor-dialog/change-passwor-dialog.component';
import { FoldersComponent } from './folders/folders.component';
import { AddNewFolderDialogComponent } from './folders/add-new-folder-dialog/add-new-folder-dialog.component';
import { EditFolderDialogComponent } from './folders/edit-folder-dialog/edit-folder-dialog.component';
import { AddFolderPathComponent } from './materials/material-detail/add-folder-path/add-folder-path.component';
import {FolderPathMenuComponent} from '../shared/components/folder-path-menu/folder-path-menu.component';
import { RejectRegistrationDialogComponent } from './admin/admin-registration/reject-registration-dialog/reject-registration-dialog.component';
import { CommentFieldComponent } from './materials/material-detail/comment-field/comment-field.component';
import { MaterialCommentComponent } from './materials/material-detail/material-comment/material-comment.component';


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
    SearchFieldComponent,
    CategoriesListComponent,
    FileTypeListComponent,
    UserRoleListComponent,
    ChangePassworDialogComponent,
    FoldersComponent,
    AddNewFolderDialogComponent,
    EditFolderDialogComponent,
    AddFolderPathComponent,
    FolderPathMenuComponent,
    RejectRegistrationDialogComponent,
    CommentFieldComponent,
    MaterialCommentComponent
  ]
})
export class SystemModule {
}
