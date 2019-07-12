import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddDependentPage } from './add-dependent';

@NgModule({
  declarations: [
    AddDependentPage,
  ],
  imports: [
    IonicPageModule.forChild(AddDependentPage),
  ],
})
export class AddDependentPageModule {}
