import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DependentAppPage } from './dependent-app';

@NgModule({
  declarations: [
    DependentAppPage,
  ],
  imports: [
    IonicPageModule.forChild(DependentAppPage),
  ],
})
export class DependentAppPageModule {}
