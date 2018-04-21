import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { PreloaderComponent } from './components/preloader/preloader.component';

@NgModule({
  imports: [FormsModule],
  exports: [FormsModule],
})
export class SharedModule {}
