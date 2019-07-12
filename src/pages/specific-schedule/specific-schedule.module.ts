import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpecificSchedulePage } from './specific-schedule';

@NgModule({
  declarations: [
    SpecificSchedulePage,
  ],
  imports: [
    IonicPageModule.forChild(SpecificSchedulePage),
  ],
})
export class SpecificSchedulePageModule {}
