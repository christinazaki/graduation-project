import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorAppPage } from './doctor-app';

@NgModule({
  declarations: [
    DoctorAppPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorAppPage),
  ],
})
export class DoctorAppPageModule {}
