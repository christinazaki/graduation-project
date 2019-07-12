import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ElderData } from '../../Model/ElderData.interface';
import { TabsPage } from '../tabs/tabs';


@IonicPage()
@Component({
  selector: 'page-ask-doctor-room',
  templateUrl: 'ask-doctor-room.html',
})
export class AskDoctorRoomPage {
  docrooms = [];
  name: string;

  elderData : FirebaseObjectObservable<ElderData>;

  
  constructor(public navCtrl: NavController, public navParams: NavParams
    , public afAuth : AngularFireAuth,
  private afDatabase: AngularFireDatabase , public app : App) {

    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid)
      {
        this.elderData = this.afDatabase.object(`ElderData/${data.uid}`);
      }
    })

   this.afDatabase.list('dchatrooms/').subscribe(x=>{
    this.docrooms = x;     
     });

  }


  joinRoom(key) {
    this.navCtrl.setRoot("AskDoctorHomePage", {
      key:key,
     nickname: this.name
    });
  }

  back(){
    this.navCtrl.setRoot('TabsPage');
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
