import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorAddInfoPage } from './doctor-add-info';

@NgModule({
  declarations: [
    DoctorAddInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorAddInfoPage),
  ],
})
export class DoctorAddInfoPageModule {}
