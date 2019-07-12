import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-addchatting-room',
  templateUrl: 'addchatting-room.html',
})
export class AddchattingRoomPage {
  data = { roomname:'' ,};
  newData :string;
  //ref = firebase.database().ref('chatrooms/');
  constructor(public navCtrl: NavController, public navParams: NavParams
    , private afDatabase: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddchattingRoomPage');
  }

  addRoom() {
    this.afDatabase.list('chatrooms/').push({
      roomname:this.data.roomname
    });
    this.navCtrl.pop();
  }

  back(){
    this.navCtrl.setRoot('TabsPage');
  }

}
