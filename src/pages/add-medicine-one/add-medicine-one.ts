import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { Medicine } from '../../Model/Medicine.interface';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AngularFireAuth } from 'angularfire2/auth';
import { ElderData } from '../../Model/ElderData.interface';

@IonicPage()
@Component({
  selector: 'page-add-medicine-one',
  templateUrl: 'add-medicine-one.html',
})
export class AddMedicineOnePage {

  quantityCheck ;//hyob2a fiha el quantity 2abl wb3d 
  date = new Date ().toISOString() .split('T')[0];
  mymedicine={}as Medicine;
  public arr_time:string[]=[];
  hour1;
  minute1;
  time1;
  public time;//for saving in db and ng_model
  isDisabled: boolean=true;
  MedicineRef:FirebaseListObservable<Medicine[]>;
  MedicineRef2:FirebaseObjectObservable<Medicine>;
  MedicineList:Medicine[];
  category=1;

  elderly:FirebaseObjectObservable<ElderData>;
  elderList:FirebaseListObservable<Medicine[]>;
  elder = {} as ElderData;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private localNotifications: LocalNotifications,private platform: Platform,public alertCtrl: AlertController
    ,public db: AngularFireDatabase , private afAuth : AngularFireAuth 
    , private afDatabase: AngularFireDatabase) {
      this.platform.ready().then(()=>{

        this.localNotifications.on('click').subscribe(()=>{
          let alert = this.alertCtrl.create({
            title: '!تنبيه ',
          
            subTitle: 'علم على اسم الدوا ده  '+this.mymedicine.MedicineName,
            buttons: ['OK']
          });
          alert.present();
        this.navCtrl.push( 'ShowMyMedicinePage');

        })
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMedicineOnePage');
  }
  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid)
      {
        this.elderly = this.afDatabase.object(`ElderData/${data.uid}/medicine_schedule`);
      }
    })
  }
  check (){
    try{
       this.mymedicine.MedicineTime=this.time;
       this.time1 = this.mymedicine.MedicineTime.split(':');
       this.hour1=parseInt( this.time1[0]);
        this.minute1=parseInt(this.time1[1]);
      }  
   catch( error){
    let alert = this.alertCtrl.create({
      title: '!تنبيه!',
      subTitle: 'املى الفورم كلها ',
      buttons: ['OK']
    });
    alert.present();
  }
}
focus(value){
  if (value==2){
     this.isDisabled = false;
     }
    
     else if (value==1){
      this.isDisabled = true;
      this.mymedicine.MedicineSize=0;
      this.mymedicine.MedicineSize2=0;
    }
    else{
      this.isDisabled = true;
      this.mymedicine.MedicineSize=0;
      this.mymedicine.MedicineSize2=0;
    }
  }
Save(){
  this.arr_time[0]=this.time;
  this.check (); 
  try{
  this.localNotifications.schedule([{
    id: 1,
    title: 'معاد الدواء ', 
    text: ' خد الداو و علم عليه  ' +this.mymedicine.MedicineName,
    trigger: { every:   {hour:this.hour1, minute:this.minute1
    }, count:1440
     }
   }
   
 ]); 
 //save to db
 if(this.mymedicine.MedicineName && this.mymedicine.MedicineSize>=0){
  if(this.mymedicine.MedicineQuantity&& this.mymedicine.MedicineQuantity>0){
 this.afAuth.authState.subscribe(auth=>{
  //catch the auth id
  this.afDatabase.list(`ElderData/${auth.uid}/medicine_schedule`).push({
    medicine_name:this.mymedicine.MedicineName,
    medicine_quantity:this.mymedicine.MedicineQuantity,
    medicine_date:this.mymedicine.MedicineDate,
    medicine_type:this.mymedicine.MedicineType,
    medicine_time:this.arr_time,
    medicine_size:this.mymedicine.MedicineSize, 
    medicine_size2:this.mymedicine.MedicineSize2,
    medicine_category:this.category,
    actual:0,
    expected:0,
  });

 this.mymedicine= {}as Medicine;

})
this.navCtrl.pop();
}
else{
  let alert = this.alertCtrl.create({
    title: '!!',
    subTitle: 'ادخل كمية صحيحة',
    buttons: ['OK']
  });
  alert.present();
}
}

else{
let alert = this.alertCtrl.create({
  title: '!!',
  subTitle: 'املى الفورم كلها ',
  buttons: ['OK']
});
alert.present();
}
 }
 catch( error){

}  
  
}

}
