import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginDependentPage } from './login-dependent';

@NgModule({
  declarations: [
    LoginDependentPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginDependentPage),
  ],
})
export class LoginDependentPageModule {}
