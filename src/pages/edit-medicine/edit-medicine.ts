import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { Medicine } from '../../Model/Medicine.interface';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the EditMedicinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-medicine',
  templateUrl: 'edit-medicine.html',
})
export class EditMedicinePage {

  key:string;
  mymedicine={}as Medicine;
  MedicineRef:FirebaseListObservable<Medicine[]>;
  MedicineList:Medicine[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetController: ActionSheetController,
    public alertCtrl: AlertController
    ,public dataBase: AngularFireDatabase) {
      this.mymedicine=this.navParams.data;
      this.MedicineRef=this.dataBase.list('/medicine_schedule');
      this.MedicineRef.subscribe((items)=>{
        this.MedicineList=items;
       });
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditMedicinePage');
  }
 
  editRecordMedicine(){
    //this.deleteMedicineTime();
    console.log(this.mymedicine.MedicineName);
    const actionSheet =this.actionSheetController.create({
     
      
      buttons: [{
        text: 'مرة فى اليوم ',
        role: 'destructive',
        cssClass :'action-sheetbutton',
      
      
        handler: () => {
this.key=this.mymedicine.$key;
let id =this.mymedicine.$key;
          this.navCtrl.push('EditMedicineOnePage',id);
          console.log(''+ this.mymedicine.$key)
        }
       
      }, {
        text: 'مرتين فى اليوم ',
        cssClass :'action-sheetbutton',
      
        handler: () => {
          this.navCtrl.push( 'EditMedicineTwoPage');
        }
        
        
      }, {
        text: 'مرات فى اليوم  ‎۳ ',
        cssClass :'action-sheetbutton',
      
        handler: () => {
          this.navCtrl.push('EditMedicineThreePage');
        }
        
       
      }, {
        text: 'مرات فى اليوم  ‎٤ ',
        cssClass :'action-sheetbutton',
      
        handler: () => {
          this.navCtrl.push('EditMedicineFourPage');
        }
        
       
      }, {
        text: 'اغلاق',
        cssClass :'action-sheetbutton',
      
        role: 'cancel',
       
      }]
    });
    actionSheet.present();
   }

}

