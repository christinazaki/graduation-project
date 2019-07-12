import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AskDoctorRoomPage } from './ask-doctor-room';

@NgModule({
  declarations: [
    AskDoctorRoomPage,
  ],
  imports: [
    IonicPageModule.forChild(AskDoctorRoomPage),
  ],
})
export class AskDoctorRoomPageModule {}
