import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AskDoctorHomePage } from './ask-doctor-home';

@NgModule({
  declarations: [
    AskDoctorHomePage,
  ],
  imports: [
    IonicPageModule.forChild(AskDoctorHomePage),
  ],
})
export class AskDoctorHomePageModule {}
