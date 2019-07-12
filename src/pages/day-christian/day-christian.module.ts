import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DayChristianPage } from './day-christian';

@NgModule({
  declarations: [
    DayChristianPage,
  ],
  imports: [
    IonicPageModule.forChild(DayChristianPage),
  ],
})
export class DayChristianPageModule {}
