import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctabsPage } from './doctabs';

@NgModule({
  declarations: [
    DoctabsPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctabsPage),
  ],
})
export class DoctabsPageModule {}
