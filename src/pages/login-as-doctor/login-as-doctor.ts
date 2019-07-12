import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DoctorData } from '../../Model/DoctorData.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-login-as-doctor',
  templateUrl: 'login-as-doctor.html',
})
export class LoginAsDoctorPage {

  doctor = {} as DoctorData;
  docList: DoctorData[];
  docRef:FirebaseListObservable<DoctorData[]>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private afauth : AngularFireAuth , private database:AngularFireDatabase , private alertCtrl:AlertController
    
     ) {
      this.docRef=this.database.list('DoctorData');
       this.docRef.subscribe((Items)=>{
         this.docList=Items
        }) ;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginAsDoctorPage');
  }

  Login(doctor : DoctorData)
  {
    this.afauth.auth.signInWithEmailAndPassword(doctor.email , doctor.Password).then(()=>  
            this.navCtrl.setRoot('DoctorProfilePage')).catch(()=>
            {
              let alert = this.alertCtrl.create({
                 message:'حضرتك مش متسجل اصلا في التطبيق من فضلك قم بالتسجيل أولا',
                 buttons: ['اغلاق']
               });
               alert.present();
            });




     
  }


}
