import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { Medicine } from '../../Model/Medicine.interface';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-add-medicine-three',
  templateUrl: 'add-medicine-three.html',
})
export class AddMedicineThreePage {
  category=3;
  mymedicine={}as Medicine;
  public arr_time:string[]=[];
  date= new Date().toISOString().split('T')[0];
  hour1;
  hour2;
  hour3;
  minute1;
  minute2;
  minute3;
  time1;
  time2;
  time3;
  isDisabled: boolean=true;
  MedicineRef:FirebaseListObservable<Medicine[]>;
  MedicineRef2:FirebaseObjectObservable<Medicine>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private localNotifications: LocalNotifications,private platform: Platform
    ,public alertCtrl: AlertController,public dataBase: AngularFireDatabase ,
    private afAuth : AngularFireAuth 
    , private afDatabase: AngularFireDatabase) {
      
      this.MedicineRef= this.dataBase.list('medicine_schedule');
      this.MedicineRef2=this.dataBase.object('medicine_schedule/'+ this.mymedicine.$key);
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
    console.log('ionViewDidLoad AddMedicinethreePage');
  }
  check (){
    try{
       this.time1 = this.arr_time[0].split(':');
       this.hour1=parseInt( this.time1[0]);
        this.minute1=parseInt(this.time1[1]);
        this.time2 = this.arr_time[1].split(':');
        this.hour2=parseInt( this.time2[0]);
        this.minute2=parseInt(this.time2[1]);
        this.time3 = this.arr_time[2].split(':');
        this.hour3=parseInt( this.time2[0]);
        this.minute3=parseInt(this.time2[1]);
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
  
  this.check (); 
  try{
  this.localNotifications.schedule([{
    id: 1,
    title: 'معاد الدواء ', 
    text: ' خد الداو و علم عليه  ' +this.mymedicine.MedicineName,
    trigger: { every:   {hour:this.hour1, minute:this.minute1
    }, count:1440
     }
   },{
    id: 2,
   
    title: 'معاد الدواء ', 
    text: ' خد الداو و علم عليه  '+this.mymedicine.MedicineName, 
    trigger: { every:   {hour:this.hour2, minute:this.minute2
    },count:1440
   }
  },{
    id: 3,
   
    title: 'معاد الدواء ', 
    text: ' خد الداو و علم عليه  '+this.mymedicine.MedicineName, 
    trigger: { every:   {hour:this.hour3, minute:this.minute3
    },count:1440
   }
  }
   
 ]); 
 if(this.mymedicine.MedicineName && this.mymedicine.MedicineSize>=0){
  if(this.mymedicine.MedicineQuantity&& this.mymedicine.MedicineQuantity>0){
this.afAuth.authState.subscribe(auth=>{
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
            
}}
}
