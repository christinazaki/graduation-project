import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddRememberInfoPage } from './add-remember-info';

@NgModule({
  declarations: [
    AddRememberInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddRememberInfoPage),
  ],
})
export class AddRememberInfoPageModule {}
