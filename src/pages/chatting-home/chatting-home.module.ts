import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChattingHomePage } from './chatting-home';

@NgModule({
  declarations: [
    ChattingHomePage,
  ],
  imports: [
    IonicPageModule.forChild(ChattingHomePage),
  ],
})
export class ChattingHomePageModule {}
