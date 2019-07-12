import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ElderAppPage } from './elder-app';

@NgModule({
  declarations: [
    ElderAppPage,
  ],
  imports: [
    IonicPageModule.forChild(ElderAppPage),
  ],
})
export class ElderAppPageModule {}
