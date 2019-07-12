import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterDoctorPage } from './register-doctor';

@NgModule({
  declarations: [
    RegisterDoctorPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterDoctorPage),
  ],
})
export class RegisterDoctorPageModule {}
