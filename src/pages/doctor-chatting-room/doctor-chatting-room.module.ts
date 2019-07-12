import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorChattingRoomPage } from './doctor-chatting-room';

@NgModule({
  declarations: [
    DoctorChattingRoomPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorChattingRoomPage),
  ],
})
export class DoctorChattingRoomPageModule {}
