import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginAsDoctorPage } from './login-as-doctor';

@NgModule({
  declarations: [
    LoginAsDoctorPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginAsDoctorPage),
  ],
})
export class LoginAsDoctorPageModule {}
