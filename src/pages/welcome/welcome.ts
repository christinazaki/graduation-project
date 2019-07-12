import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  //Open App as ELder Person
  openasElder()
  {
    this.navCtrl.push('ElderAppPage');
  }

  //Open App as Dependent Person
  openasDependent()
  {
    this.navCtrl.push('LoginDependentPage');
  }
  openasDoctor()
  {
    this.navCtrl.push('DoctorAppPage');
  }
}
