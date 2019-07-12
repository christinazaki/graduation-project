import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { Dependent } from '../../Model/DependentData.interface';
import { LocalNotifications } from '@ionic-native/local-notifications';



@IonicPage()
@Component({
  selector: 'page-login-dependent',
  templateUrl: 'login-dependent.html',
})
export class LoginDependentPage {
  emailDep: string = "";
  passDep: string = "";
  email: string = "";
  pass: string = "";
  dependentList : Dependent[];
  dependentsRef:FirebaseListObservable<Dependent[]>;
  Zahymar: any;

  
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private afDatabase: AngularFireDatabase,
     private database:AngularFireDatabase,
     private localNotifications: LocalNotifications) {
      this.dependentsRef=this.database.list('Dependent');
       this.dependentsRef.subscribe((Items)=>{
         this.dependentList=Items
        }) ;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginDependentPage');
  }

  LoginDependent(id:string){
    if(this.Zahymar){
      this.afDatabase.object(`Dependent/`+id).update({Zahymar:this.Zahymar});
      this.afDatabase.object(`ElderData/`+id).update({Zahymar:this.Zahymar});

    }
    this.navCtrl.push('DependentProfilePage',{id:id});

    /// goz2 bt3 koki noti 
    this.localNotifications.schedule([{
      id: 1,
      title: 'تذكير ', 
      text: ' كلم والدك  ' ,
      trigger: { every:   { hour: 18, minute: 0
      }, count:1440}}     
     
   ]);
  }



}