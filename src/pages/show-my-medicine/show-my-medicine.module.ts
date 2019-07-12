import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowMyMedicinePage } from './show-my-medicine';

@NgModule({
  declarations: [
    ShowMyMedicinePage,
  ],
  imports: [
    IonicPageModule.forChild(ShowMyMedicinePage),
  ],
})
export class ShowMyMedicinePageModule {}
