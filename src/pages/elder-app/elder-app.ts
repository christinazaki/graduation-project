import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ElderAppPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-elder-app',
  templateUrl: 'elder-app.html',
})
export class ElderAppPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ElderAppPage');
  }

  //Login as Elder
  login()
  {
    this.navCtrl.push('LoginAsElderPage');
  }
  signup()
  {
      this.navCtrl.push('RegisterPage');
  }

  

}
