import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SystemComponent} from './system.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {AddMaterialComponent} from './add-material/add-material.component';
import {MaterialsComponent} from './books/materials.component';
import {MaterialDetailComponent} from './books/material-detail/material-detail.component';
import {AddCategoryComponent} from './add-category/add-category.component';

const routes: Routes = [
    {
      path: 'system', component: SystemComponent, children: [
        {path: 'user_info', component: UserInfoComponent},
        {path: 'user_info/:book_id', component: MaterialDetailComponent},
        {path: 'add_book', component: AddMaterialComponent},
        {path: 'add_category', component: AddCategoryComponent},
        {path: 'books', component: MaterialsComponent},
        {path: 'books/:book_id', component: MaterialDetailComponent}
      ]
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {
}
