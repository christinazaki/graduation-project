import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DoctabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctabs',
  templateUrl: 'doctabs.html',
})
export class DoctabsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  DOCTORPROFILE = 'DoctorProfilePage';
  EDITPROFILE = 'EditDoctorProfilePage';
  ANSWERQUESTIONS = 'DoctorChattingRoomPage';
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctabsPage');
  }

}
