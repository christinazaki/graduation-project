import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DoctorAppPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctor-app',
  templateUrl: 'doctor-app.html',
})
export class DoctorAppPage {

  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorAppPage');
  }

  login()
  {
    this.navCtrl.push('LoginAsDoctorPage');
    
  }
  signup()
  {
      this.navCtrl.push('RegisterDoctorPage');
  }


}
