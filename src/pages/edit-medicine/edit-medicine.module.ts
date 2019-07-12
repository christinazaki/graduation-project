import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditMedicinePage } from './edit-medicine';

@NgModule({
  declarations: [
    EditMedicinePage,
  ],
  imports: [
    IonicPageModule.forChild(EditMedicinePage),
  ],
})
export class EditMedicinePageModule {}
