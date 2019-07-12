import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { info } from '../../Model/info.interface';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the AddRememberInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-remember-info',
  templateUrl: 'add-remember-info.html',
})
export class AddRememberInfoPage {

  ElderID : any;
  info = {} as info;
  constructor(public navCtrl: NavController, public navParams: NavParams 
    , private afDatabase : AngularFireDatabase) {

      this.ElderID = navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRememberInfoPage');
  }

  add(){
    this.afDatabase.object(`ElderData/`+this.ElderID+`/info`).set(this.info).then(()=>
    this.navCtrl.setRoot('DependentProfilePage', {id:this.ElderID}));
  }
}
