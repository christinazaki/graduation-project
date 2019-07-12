import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { DoctorData } from '../../Model/DoctorData.interface';



@IonicPage()
@Component({
  selector: 'page-doctor-chatting-room',
  templateUrl: 'doctor-chatting-room.html',
})
export class DoctorChattingRoomPage {
  docrooms = [];
  name: string;

  drData : FirebaseObjectObservable<DoctorData>;

  
  constructor(public navCtrl: NavController, public navParams: NavParams
    , public afAuth : AngularFireAuth,
  private afDatabase: AngularFireDatabase) {

    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid)
      {
        this.drData = this.afDatabase.object(`DoctorData/${data.uid}`);
      }
    })

   this.afDatabase.list('dchatrooms/').subscribe(x=>{
    this.docrooms = x;     
     });


  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChattingRoomPage');
  }

  addRoom() {
    this.navCtrl.push("DoctorAddChattingRoomPage");
  }


  joinRoom(key) {
    this.navCtrl.setRoot("DoctorChattingHomePage", {
      key:key,
     nickname: this.name
    });
  }


  back(){
    this.navCtrl.setRoot('DoctorProfilePage');
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
