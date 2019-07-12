import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMedicineOnePage } from './add-medicine-one';

@NgModule({
  declarations: [
    AddMedicineOnePage,
  ],
  imports: [
    IonicPageModule.forChild(AddMedicineOnePage),
  ],
})
export class AddMedicineOnePageModule {}
