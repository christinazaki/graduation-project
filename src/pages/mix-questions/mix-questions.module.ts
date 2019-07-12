import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MixQuestionsPage } from './mix-questions';

@NgModule({
  declarations: [
    MixQuestionsPage,
  ],
  imports: [
    IonicPageModule.forChild(MixQuestionsPage),
  ],
})
export class MixQuestionsPageModule {}
