import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditDoctorProfilePage } from './edit-doctor-profile';

@NgModule({
  declarations: [
    EditDoctorProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(EditDoctorProfilePage),
  ],
})
export class EditDoctorProfilePageModule {}
