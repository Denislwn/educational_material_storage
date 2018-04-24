import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {SystemRoutingModule} from './system-routing.module';
import {SystemComponent} from './system.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {AddBookComponent} from './add-book/add-book.component';
import {BooksComponent} from './books/books.component';
import {BookComponent} from './books/book/book.component';
import {BookDetailComponent} from './books/book-detail/book-detail.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {AddCategoryComponent} from './add-category/add-category.component';
import {UserRolePipe} from '../shared/pipes/user-role.pipe';
import {DateFormatPipe} from '../shared/pipes/date-format.pipe';
import {PreloaderComponent} from '../shared/components/preloader/preloader.component';
import {DeleteDialogComponent} from '../shared/components/delete-dialog/delete-dialog.component';

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
    AddBookComponent,
    BooksComponent,
    BookComponent,
    BookDetailComponent,
    AddCategoryComponent,
    UserRolePipe,
    DateFormatPipe,
    PreloaderComponent,
    DeleteDialogComponent
  ]
})
export class SystemModule {
}
