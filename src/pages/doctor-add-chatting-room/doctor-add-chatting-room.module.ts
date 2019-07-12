import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorAddChattingRoomPage } from './doctor-add-chatting-room';

@NgModule({
  declarations: [
    DoctorAddChattingRoomPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorAddChattingRoomPage),
  ],
})
export class DoctorAddChattingRoomPageModule {}
