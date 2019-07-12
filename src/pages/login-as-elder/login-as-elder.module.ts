import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginAsElderPage } from './login-as-elder';

@NgModule({
  declarations: [
    LoginAsElderPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginAsElderPage),
  ],
})
export class LoginAsElderPageModule {}
