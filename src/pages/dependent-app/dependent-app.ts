import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Dependent } from '../../Model/DependentData.interface';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the DependentAppPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dependent-app',
  templateUrl: 'dependent-app.html',
})
export class DependentAppPage {

  dependent = {} as Dependent;

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private afauth : AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DependentAppPage');
  }

  Login(dependent : Dependent)
  {
    
  }

}
