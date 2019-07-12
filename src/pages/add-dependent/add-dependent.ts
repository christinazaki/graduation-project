import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, App } from 'ionic-angular';
import { ElderData } from '../../Model/ElderData.interface';
import { Dependent } from '../../Model/DependentData.interface';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import {EmailComposer } from '@ionic-native/email-composer';

/**
 * Generated class for the AddDependentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-dependent',
  templateUrl: 'add-dependent.html',
})
export class AddDependentPage {

  name:string;
  elderly = {} as ElderData;
  myDependent={}as Dependent;

  DependentRef:FirebaseListObservable<Dependent[]>; //da eli hay5leni add w a delete w hakza

  elderData: FirebaseObjectObservable<ElderData>;

  
  constructor(public navCtrl: NavController, public navParams: NavParams
   , private afAuth : AngularFireAuth 
    , private afDatabase: AngularFireDatabase
    , private emailComposer: EmailComposer , private app : App) {
      
      this.afAuth.authState.subscribe(auth=>{
        //catch the auth id
       this.elderData= this.afDatabase.object(`ElderData/${auth.uid}`);
       
      })
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddDependentPage');
  }
  
  addDependent(){
    this.afAuth.authState.subscribe(auth=>{
      //catch the auth id
      this.afDatabase.object(`Dependent/${auth.uid}/`).set(this.myDependent)
      .then(() => this.myDependent.email_elder=this.elderly.email);

      this.myDependent={}as Dependent; 
    })
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
      
      }
    });
    
    let email = {
      to: this.myDependent.dependent_email,
      subject: 'طلب اضافة كتابع من'+ this.name,
      body: ' اهلا بك في موقعنا ... لقد قام والدك/تك: باضافتك كتابع شخصي له ...'+
      'قم بتحميل التطبيق '+
      ' قم بتسجيل الدخول بالايميل الشخصي الخاص بك و هذا الرقم السري 123456',
      isHtml: true
    };
    this.emailComposer.open(email);
  }
  

  back(){
    this.app.getRootNav().setRoot('TabsPage');
  }

}
