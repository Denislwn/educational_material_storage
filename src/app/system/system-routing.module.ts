import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SystemComponent} from './system.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {AddBookComponent} from './add-book/add-book.component';
import {BooksComponent} from './books/books.component';
import {BookDetailComponent} from './books/book-detail/book-detail.component';

const routes: Routes = [
    {
      path: 'system', component: SystemComponent, children: [
        {path: 'user_info', component: UserInfoComponent},
        {path: 'add_book', component: AddBookComponent},
        {path: 'books', component: BooksComponent},
        {path: 'books/:book_id', component: BookDetailComponent}
      ]
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {
}
