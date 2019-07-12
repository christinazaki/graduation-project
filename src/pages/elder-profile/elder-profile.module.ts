import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ElderProfilePage } from './elder-profile';

@NgModule({
  declarations: [
    ElderProfilePage
  ],
  imports: [
    IonicPageModule.forChild(ElderProfilePage)
  ],
})
export class ElderProfilePageModule {}
