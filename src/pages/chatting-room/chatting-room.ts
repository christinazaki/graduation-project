import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { ElderData } from '../../Model/ElderData.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-chatting-room',
  templateUrl: 'chatting-room.html',

})
export class ChattingRoomPage {
  rooms = [];
  name: string;
  elderData : FirebaseObjectObservable<ElderData>;

 

  constructor(public navCtrl: NavController, public navParams: NavParams
    , public afAuth : AngularFireAuth,
  private afDatabase: AngularFireDatabase , public app : App) {

    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid)
      {
        this.elderData = this.afDatabase.object( `ElderData/${data.uid}`);
      }
    })

   this.afDatabase.list('chatrooms/').subscribe(x=>{
    this.rooms = x;  
     });
  }


  addRoom() {
    this.navCtrl.push("AddchattingRoomPage");
  }


  joinRoom($key) {
    
    this.navCtrl.setRoot("ChattingHomePage", {
      key:$key,
      nickname: this.name
    });
  }

  back(){
    this.navCtrl.setRoot('TabsPage')
  }


}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};

