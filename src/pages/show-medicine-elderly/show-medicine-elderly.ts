import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Medicine } from '../../Model/Medicine.interface';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ElderData } from '../../Model/ElderData.interface';

   


@IonicPage()
@Component({
  selector: 'page-show-medicine-elderly',
  templateUrl: 'show-medicine-elderly.html',
})
export class ShowMedicineElderlyPage {
  MedicineList:Medicine[];
  elderList : ElderData[];
  elderRef:FirebaseListObservable<ElderData[]>;
  ElderID:any;
  elderRef2:FirebaseObjectObservable<Medicine>;
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public dataBase: AngularFireDatabase,private afAuth : AngularFireAuth 
    , private afDatabase: AngularFireDatabase,) {
      

      this.ElderID = navParams.get('id');
      console.log('IDk'+this.ElderID);
      this.afAuth.authState.subscribe(data =>{
        //this.elderRef2 = this.afDatabase.object(`ElderData/`+this.ElderID +`/medicine_schedule`);
        this.elderRef=this.afDatabase.list(`ElderData/`+this.ElderID +`/medicine_schedule`);
  
       this.elderRef.subscribe((Items)=>{
         this.elderList=Items
        }) ;
      }) ;
  
   //this.startTimer( ) ;
   }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowMedicineElderlyPage');
  }
  showDetails(id :string){

    this.navCtrl.push('ShowDetailsDepPage', {id:id});
  }
}
