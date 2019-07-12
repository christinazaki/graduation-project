import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LaterSchedulePage } from './later-schedule';

@NgModule({
  declarations: [
    LaterSchedulePage,
  ],
  imports: [
    IonicPageModule.forChild(LaterSchedulePage),
  ],
})
export class LaterSchedulePageModule {}
