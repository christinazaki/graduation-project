import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-doctor-add-chatting-room',
  templateUrl: 'doctor-add-chatting-room.html',
})
export class DoctorAddChattingRoomPage {
  data = { docroomname:'' };
  newData :string;
  constructor(public navCtrl: NavController, public navParams: NavParams
    , private afDatabase: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddchattingRoomPage');
  }

  addRoom() {
    this.afDatabase.list('dchatrooms/').push({
      docroomname:this.data.docroomname
    });
    this.navCtrl.pop();
  }

  back(){
    this.navCtrl.setRoot('DoctorChattingRoomPage');
  }

}
