import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DoctorData } from '../../Model/DoctorData.interface';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-register-doctor',
  templateUrl: 'register-doctor.html',
})
export class RegisterDoctorPage {
  doctor = {} as DoctorData;

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private afauth : AngularFireAuth , private alertCtrl : AlertController) {
  }


 register(doctor : DoctorData)
  {
    this.afauth.auth.createUserWithEmailAndPassword(doctor.email , doctor.Password).then(() =>

     this.navCtrl.setRoot('DoctorAddInfoPage',{email:doctor.email})).catch(()=>{
       
        this.navCtrl.setRoot('LoginAsDoctorPage').catch(()=>{
          let alert = this.alertCtrl.create({
            message:'حضرتك اصلا مسجل قبل كدة ..قم بالدخول',
            buttons: ['اغلاق']
          });
          alert.present();
       });
      })   
  }
}
