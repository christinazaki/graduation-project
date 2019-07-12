import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase , FirebaseObjectObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {Religious } from '../../Model/Religious.interface';


/**
 * Generated class for the DayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-day',
  templateUrl: 'day.html',
})
export class DayPage {
  myrel ={}as Religious;
  RelRef:FirebaseObjectObservable<Religious[]>;
  relData: FirebaseObjectObservable<Religious>;
  aya : string;
  snap : string;
  cur : any;
  constructor(public navCtrl: NavController, public navParams: NavParams
    , public db: AngularFireDatabase , public afAuth : AngularFireAuth,
    private database:AngularFireDatabase,
       private afDatabase: AngularFireDatabase) {
       this.afDatabase.object(`Religious/current`).set(this.myrel);
         this.myrel =this.navParams.data;
         this.cur = navParams.get('id');
         this.RelRef=this.database.object('Religious/'+this.cur);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DayPage');
  }

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if(data)
      {
        this.relData = this.afDatabase.object(`Religious/`+this.cur);
        
        
        console.log("cur >>>>>>>>>>>> "+ this.cur);
      }
      
    })
    
  }


  Back(){
    this.navCtrl.setRoot('ReligiousPage');
  }

}
