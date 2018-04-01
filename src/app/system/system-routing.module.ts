import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SystemComponent} from './system.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {AddBookComponent} from './add-book/add-book.component';

const routes: Routes = [
    {
      path: 'system', component: SystemComponent, children: [
        {path: 'user_info', component: UserInfoComponent},
        {path: 'add_book', component: AddBookComponent}
      ]
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {
}
