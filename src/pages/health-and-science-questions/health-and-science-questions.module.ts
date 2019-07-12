import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthAndScienceQuestionsPage } from './health-and-science-questions';

@NgModule({
  declarations: [
    HealthAndScienceQuestionsPage,
  ],
  imports: [
    IonicPageModule.forChild(HealthAndScienceQuestionsPage),
  ],
})
export class HealthAndScienceQuestionsPageModule {}
