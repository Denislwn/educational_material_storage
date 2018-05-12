import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SystemComponent} from './system.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {AddMaterialComponent} from './add-material/add-material.component';
import {MaterialsComponent} from './books/materials.component';
import {MaterialDetailComponent} from './books/material-detail/material-detail.component';
import {AddCategoryComponent} from './add-category/add-category.component';
import {AdminRegistrationComponent} from './admin-registration/admin-registration.component';
import {MyMaterialsComponent} from './my-materials/my-materials.component';
import {UsersComponent} from './users/users.component';

const routes: Routes = [
    {
      path: 'system', component: SystemComponent, children: [
        {path: 'user_info', component: UserInfoComponent},
        {path: 'user_info/:materialId', component: MaterialDetailComponent},
        {path: 'add_category', component: AddCategoryComponent},
        {path: 'materials', component: MaterialsComponent},
        {path: 'materials/add_material', component: AddMaterialComponent},
        {path: 'materials/:materialId', component: MaterialDetailComponent},
        {path: 'admin_registration', component: AdminRegistrationComponent},
        {path: 'my_materials', component: MyMaterialsComponent},
        {path: 'my_materials/add_material', component: AddMaterialComponent},
        {path: 'my_materials/:materialId', component: MaterialDetailComponent},
        {path: 'users', component: UsersComponent},
        {path: 'users/:userId', component: MyMaterialsComponent},
        {path: 'users/:userId/:materialId', component: MaterialDetailComponent},
      ]
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {
}
