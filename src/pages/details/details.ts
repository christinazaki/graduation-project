import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Medicine } from '../../Model/Medicine.interface';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ElderData } from '../../Model/ElderData.interface';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  mymedicine={}as Medicine;
  MedicineRef:FirebaseListObservable<Medicine[]>;
  medicineR : FirebaseObjectObservable<Medicine>;
  MedicineList:Medicine[];
 
  public key;
medData : FirebaseObjectObservable<Medicine>;
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public dataBase: AngularFireDatabase
    ,private afAuth : AngularFireAuth 
    , private afDatabase : AngularFireDatabase) {

      this.key=this.navParams.get('id');
      console.log('my id ' + this.key );
      //this.navParams.get('medicineid');
   /*    this.afAuth.authState.subscribe(auth=>{
      this.MedicineRef= this.dataBase.list(`ElderData/${auth.uid}/medicine_schedule/${this.key}`);
      console.log(this.key);
      this.MedicineRef.subscribe((items)=>{
        this.MedicineList=items;
       });
      }); */
      this.afAuth.authState.subscribe(auth=>{
      this.medData = this.afDatabase.object(`ElderData/${auth.uid}/medicine_schedule/`+this.key);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

}
