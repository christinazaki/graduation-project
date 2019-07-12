import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { DoctorData } from '../../Model/DoctorData.interface';
import { LoginAsDoctorPage } from '../login-as-doctor/login-as-doctor';
import { DoctorAppPage } from '../doctor-app/doctor-app';

/**
 * Generated class for the DoctorProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctor-profile',
  templateUrl: 'doctor-profile.html',
})
export class DoctorProfilePage {

doctorData: FirebaseObjectObservable<DoctorData[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private afAuth : AngularFireAuth
    ,private afDatabase: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ElderProfilePage');
  }

  ionViewWillLoad() {
  
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid)
      {
        this.doctorData = this.afDatabase.object(`DoctorData/${data.uid}`);
      }
    })
  }
  logout()
  {
    this.navCtrl.setRoot(LoginAsDoctorPage);
  }

  answerElderQuestions(){
  this.navCtrl.push('DoctorChattingRoomPage');
}
deleteAccount(){
  this.afAuth.authState.subscribe((authState) => { 
    authState.delete();
    this.navCtrl.setRoot(DoctorAppPage);
    //this.afAuth.auth.signOut();
   });
}

editDoctorData(){
  this.navCtrl.push('EditDoctorProfilePage');
}
}
