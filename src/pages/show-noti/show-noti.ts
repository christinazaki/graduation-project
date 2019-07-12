import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Medicine } from '../../Model/Medicine.interface';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-show-noti',
  templateUrl: 'show-noti.html',
})
export class ShowNotiPage {

  MedicineRef :FirebaseListObservable<any>;
  isDisabled: boolean=true;
  public mymedicine={}as Medicine;
  public date:string;
  public time:string;
  public T:string[]=[];
  public D:string[]=[];
  public hours:number[]=[];
  public minutes:number[]=[];
  public day:number[]=[];
  public month:number[]=[];
  public i:number=0;
  public x:number=0;
  public arr_time:string[]=[];
  public arr_date:string[]=[];
  public category=0;
  public counter:number=0;
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public localNotifications: LocalNotifications,public platform: Platform,
  public alertCtrl: AlertController,public db :AngularFireDatabase
  ,private afAuth : AngularFireAuth, private afDatabase: AngularFireDatabase) {

     this.MedicineRef=db.list('/medicine_schedule');
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowNotiPage');
    }

  Save_schedule(){
      if(this.time&&this.date){
      let alert = this.alertCtrl.create({
      title: 'المزيد من المواعيد!',
      subTitle: 'هل تريد اضافة معاد اخر لهذا العلاج',
      buttons: [
        {
          text: 'نعم',
          handler: () => { 
          
       this.mymedicine.MedicineTime=this.time;
       this.mymedicine.MedicineDate=this.date;
       this.set_schedule();
          
          }
        }, {
          text: 'لا',
          handler: () => {  
            this.save();    
          }     
        }]
        });     
          alert.present();   
      }   
      else{
        let alert = this.alertCtrl.create({
          title: 'تنبيه',
          subTitle: 'املى الفورم كلها ',
          buttons: ['OK']
        });
        alert.present();
      }
      }

 save(){
  this.arr_date[this.i]=this.date;
  this.arr_time[this.i]=this.time;
  console.log("kkkk"+this.mymedicine.MedicineName);
  if(this.mymedicine.MedicineName && this.mymedicine.MedicineSize>=0){
    if(this.mymedicine.MedicineQuantity&& this.mymedicine.MedicineQuantity>0){
this.afAuth.authState.subscribe(auth=>{
  //catch the auth id
  this.afDatabase.list(`ElderData/${auth.uid}/medicine_schedule`).push({
    medicine_name:this.mymedicine.MedicineName,
    medicine_quantity:this.mymedicine.MedicineQuantity,
    medicine__date:this.arr_date,
    medicine_type:this.mymedicine.MedicineType,
    medicine_time:this.arr_time,
    medicine_size:this.mymedicine.MedicineSize, 
    medicine_size2:this.mymedicine.MedicineSize2,
    medicine_category:this.category,
    actual:this.counter,
    expected:0
  });

})
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
 
 set_schedule(){
   this.arr_date[this.i]=this.date;
   this.arr_time[this.i]=this.time;
   this.date="";
   this.time="";
   this.i=this.i+1;
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
 notify(){
   this.navCtrl.pop();
  for( this.x=0;this.x<this.arr_date.length&&this.x<this.arr_time.length;this.x++){
   this.T = this.arr_time[this.x].split(':');
   this.hours[this.x]=+this.T[0]; 
   this.minutes[this.x]=+this.T[1];
   this.D = this.arr_date[this.x].split('-');
   this.day[this.x]=+this.D[2];
   this.month[this.x]=+this.D[1];
   this.T=[];
   this.D=[];
  }
  this.localNotifications.schedule([{
    id: 1,
    text:  this.mymedicine.MedicineName + ' معاد الدوا ', 
    sound: this.setSound(),
    trigger: { every:   {month:this.month[0], day:  this.day[0], hour: this.hours[0], minute: this.minutes[0]
    }, count:1440}},{
    id: 2,
    text: this.mymedicine.MedicineName + ' معاد الدوا ',
    sound: this.setSound(),
    trigger: { every:   {month:this.month[1], day:  this.day[1], hour: this.hours[1], minute: this.minutes[1]
   },count:1440}},{
    id: 3,
    text: this.mymedicine.MedicineName + ' معاد الدوا ',
    sound: this.setSound(),
    trigger: { every:   {month:this.month[2], day:  this.day[2], hour: this.hours[2], minute: this.minutes[2]
   },count:1440}},{
    id: 4,
    text: this.mymedicine.MedicineName + ' معاد الدوا ',
    sound: this.setSound(),
    trigger: { every:   {month:this.month[3], day:  this.day[3], hour: this.hours[3], minute: this.minutes[3]
    },count:1440}},{
    id: 5,
    text: this.mymedicine.MedicineName + ' معاد الدوا ',
    sound: this.setSound(),
    trigger: { every:   {month:this.month[4], day:  this.day[4], hour: this.hours[4], minute: this.minutes[4]
   },count:1440}},{
    id: 6,
    text: this.mymedicine.MedicineName + ' معاد الدوا ',
    sound: this.setSound(),
    trigger: { every:   {month:this.month[5], day:  this.day[5], hour: this.hours[5], minute: this.minutes[5]
    },count:1440}},{
    id: 7,
    text: this.mymedicine.MedicineName + ' معاد الدوا ',
    sound: this.setSound(),
    trigger: { every:   {month:this.month[6], day:  this.day[6], hour: this.hours[6], minute: this.minutes[6]
   },count:1440}},{
    id: 8,
    text: this.mymedicine.MedicineName + ' معاد الدوا ',
    sound: this.setSound(),
    trigger: { every:   {month:this.month[7], day:  this.day[7], hour: this.hours[7], minute: this.minutes[7]
    },count:1440}},{
    id: 9,
    text:this.mymedicine.MedicineName + ' معاد الدوا ',
    sound: this.setSound(),
    trigger: { every:   {month:this.month[8], day:  this.day[8], hour: this.hours[8], minute: this.minutes[8]
   },count:1440}},{
    id: 10,
    text: this.mymedicine.MedicineName + ' معاد الدوا ',
    sound: this.setSound(),
    trigger: { every:   {month:this.month[9], day:  this.day[9], hour: this.hours[9], minute: this.minutes[9]
    },count:1440}},{
    id: 11,
    text: this.mymedicine.MedicineName + ' معاد الدوا ',
    sound: this.setSound(),
    trigger: { every:   {month:this.month[10], day:  this.day[10], hour: this.hours[10], minute: this.minutes[10]
   },count:1440}},{
    id: 12,
    text:this.mymedicine.MedicineName + ' معاد الدوا ',
    sound: this.setSound(),
    trigger: { every:   {month:this.month[11], day:  this.day[11], hour: this.hours[11], minute: this.minutes[11]
    },count:1440}},{
    id: 13,
    text:this.mymedicine.MedicineName + ' معاد الدوا ',
    sound: this.setSound(),
    trigger: { every:   {month:this.month[12], day:  this.day[12], hour: this.hours[12], minute: this.minutes[12]
   },count:1440}},{
    id: 14,
    text: this.mymedicine.MedicineName + ' معاد الدوا ',
    sound: this.setSound(),
    trigger: { every:   {month:this.month[13], day:  this.day[13], hour: this.hours[13], minute: this.minutes[13]
    },count:1440}},{
    id: 15,
    text: this.mymedicine.MedicineName + ' معاد الدوا ',
    sound: this.setSound(),
    trigger: { every:   {month:this.month[14],day:  this.day[14], hour: this.hours[14], minute: this.minutes[14]
   },count:1440}}

  ]);

  this.localNotifications.on('click').subscribe(()=>{
    let alert = this.alertCtrl.create({
      title: '!تنبيه ',
    
      subTitle: 'علم على اسم الدوا ده  '+this.mymedicine.MedicineName,
      buttons: ['OK']
    });
    alert.present();
  this.navCtrl.push( 'ShowMyMedicinePage');

  })
}
setSound() {
  if (this.platform.is('android')) {
    return 'file://assets/sounds/loving-you.mp3'
  } else {
    return 'file://assets/sounds/loving-you.mp3'
  }
}

}