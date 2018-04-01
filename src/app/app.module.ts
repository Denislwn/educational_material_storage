import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AuthModule} from './auth/auth.module';
import {HttpClientModule} from '@angular/common/http';


import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {UsersService} from './shared/services/users.service';
import {SystemModule} from './system/system.module';
import {CategoryService} from './shared/services/category.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    AppRoutingModule,
    SystemModule,
  ],
  providers: [
    UsersService,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
