import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Medicine } from '../../Model/Medicine.interface';
/**
 * Generated class for the ShowDetailsDepPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-details-dep',
  templateUrl: 'show-details-dep.html',
})
export class ShowDetailsDepPage {
  public key;
  medData : FirebaseObjectObservable<Medicine>;  
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private afAuth : AngularFireAuth 
    , private afDatabase : AngularFireDatabase) {
    this.key=this.navParams.get('id');
    this.afAuth.authState.subscribe(auth=>{
      this.medData = this.afDatabase.object(`ElderData/${auth.uid}/medicine_schedule/`+this.key);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowDetailsDepPage');
  }

}
