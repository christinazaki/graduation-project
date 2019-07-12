import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DependentProfilePage } from './dependent-profile';

@NgModule({
  declarations: [
    DependentProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(DependentProfilePage),
  ],
})
export class DependentProfilePageModule {}
