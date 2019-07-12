import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorChattingHomePage } from './doctor-chatting-home';

@NgModule({
  declarations: [
    DoctorChattingHomePage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorChattingHomePage),
  ],
})
export class DoctorChattingHomePageModule {}
