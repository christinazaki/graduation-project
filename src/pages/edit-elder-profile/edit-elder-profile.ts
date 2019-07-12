import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { ElderData } from '../../Model/ElderData.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import { Dependent } from '../../Model/DependentData.interface';

/**
 * Generated class for the EditElderProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-elder-profile',
  templateUrl: 'edit-elder-profile.html',
})
export class EditElderProfilePage {

  myDep ={}as Dependent;

  depData: FirebaseObjectObservable<Dependent>;

  elders : FirebaseListObservable<any>;
  elderData: FirebaseObjectObservable<ElderData>;

  elderly = {
    id : '',
    Name: '',
    Age : '', 
    Address : '',
    PhoneNumber : ''
  }
  

  myElder ={}as ElderData;

  
  constructor(public navCtrl: NavController, public navParams: NavParams
   ,public afAuth : AngularFireAuth,
    private afDatabase: AngularFireDatabase) {
      this.myElder=this.navParams.data;
      //this.myDep=this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditElderProfilePage');
  }

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid)
      {
        this.elderData = this.afDatabase.object(`ElderData/${data.uid}`);
      }
    })
  }

  editData()
  {
      this.afAuth.authState.subscribe(auth=>{
        //catch the auth id
        this.afDatabase.object(`ElderData/${auth.uid}`).update(this.myElder)
        .then(() => this.navCtrl.setRoot('ElderProfilePage')); 
    })
  }
}




