import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { ElderData } from '../../Model/ElderData.interface';

/**
 * Generated class for the ShowRemeberInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-remeber-info',
  templateUrl: 'show-remeber-info.html',
})
export class ShowRemeberInfoPage {

  elderData : FirebaseObjectObservable<ElderData>;
  constructor(public navCtrl: NavController, public navParams: NavParams ,
    private afAuth : AngularFireAuth , private afDatabase : AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowRemeberInfoPage');
  }
  ionViewWillLoad(){
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid)
      {
        this.elderData = this.afDatabase.object(`ElderData/${data.uid}/info`);
      
      }
    })
  }

  back(){
    this.navCtrl.setRoot('TabsPage');
  }

}
