import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseObjectObservable, FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { DoctorData } from '../../Model/DoctorData.interface';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the EditDoctorProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-doctor-profile',
  templateUrl: 'edit-doctor-profile.html',
})
export class EditDoctorProfilePage {
  doctors : FirebaseListObservable<any>;
  docData: FirebaseObjectObservable<DoctorData>;

  doc = {
    id : '',
    Name: '',
    Specialty:'',
    PhoneNumber : ''
  }
  

  myDoctor ={}as DoctorData;

  constructor(public navCtrl: NavController, public navParams: NavParams,public afAuth : AngularFireAuth,
    private afDatabase: AngularFireDatabase) {
      this.doc=this.navParams.data; 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditDoctorProfilePage');
  }

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid)
      {
        this.docData = this.afDatabase.object(`DoctorData/${data.uid}`);
        //this.depData = this.afDatabase.object(`ElderData/${data.uid}/Dependent`);
      }
    })
  }

  editData()
  {
    
      this.afAuth.authState.subscribe(auth=>{
        //catch the auth id
        this.afDatabase.object(`DoctorData/${auth.uid}`).update(this.doc)
        .then(() => this.navCtrl.setRoot('DoctorProfilePage')); 
    })
  }


}
