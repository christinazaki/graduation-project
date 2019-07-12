import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { Medicine } from '../../Model/Medicine.interface';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ElderData } from '../../Model/ElderData.interface';

@IonicPage()
@Component({
  selector: 'page-show-my-medicine',
  templateUrl: 'show-my-medicine.html',
})
export class ShowMyMedicinePage {

  mymedicine={}as Medicine;
  myelder = {} as ElderData;
  quantityBeforeType1 ;
  sizeBeforeType2 ;
  quantityBeforeType3;
  counter:number=0;
  medicineSize =this.mymedicine.MedicineSize;// variable fih size 

  elderData: FirebaseObjectObservable<ElderData>;

  id_elder ;
  MedicineRef:FirebaseListObservable<Medicine[]>;
  elderList : ElderData[];
  elderRef:FirebaseListObservable<ElderData[]>;

  MedicineList:Medicine[];
  elderRef2 :FirebaseObjectObservable<Medicine>;
  
 constructor(public navCtrl: NavController, public navParams: NavParams
  ,public alertCtrl: AlertController,public dataBase: AngularFireDatabase,private afAuth : AngularFireAuth 
  , private afDatabase: AngularFireDatabase,public actionSheetController: ActionSheetController) {
    
     this.mymedicine=this.navParams.data;
     this.MedicineRef=this.dataBase.list(`ElderData/medicine_schedule`);
     this.afAuth.authState.subscribe(data =>{
     this.elderRef=this.afDatabase.list(`ElderData/${data.uid}/medicine_schedule`);
     this.id_elder = data.uid;
     console.log("id is ::: " + data.uid);
     this.elderRef.subscribe((Items)=>{
     this.elderList=Items
      }) ;
    }) ;
 }

 ionViewDidLoad() {
   console.log('ionViewDidLoad ShowMyMedicinePage');
 }
 
 startTimer( ){
    this.afAuth.authState.subscribe(data =>{
    this.elderRef=this.afDatabase.list(`ElderData/${data.uid}/medicine_schedule`);
    this.id_elder = data.uid;
    console.log("id is ::: " + data.uid);
   this.elderRef.subscribe((Items)=>{
     this.elderList=Items;
    });
    for(let i=0;this.elderList.length;i++) { 
     if (this.elderList[i].med.MedicineType==1 && this.elderList[i].med.MedicineQuantity < 5){
       setTimeout(function(){ alert('انتبه لديك اقل من  5 حبيات من دوا  '+this.elderList[i].MedicineName, )} ,3000 )
       
     } else if (this.elderList[i].med.MedicineType == 2 && this.elderList[i].med.MedicineQuantity == 1  ){
      
      setTimeout(function(){ alert('انتبه انت لديك ازازة  واحدة ء  '+this.elderList[i].med.MedicineName, )} ,3000 )

      console.log('');
 
  } else if (this.elderList[i].med.MedicineType==3 && this.elderList[i].med.MedicineQuantity <  2) {
       setTimeout(function(){ alert('انتبه انت لديك 2 حقن فقط من دواء  '+this.elderList[i].med.MedicineName, )} ,3000 )
     } 
     else  {
       console.log('');
     }
    
   }
  });  
 }

 minusQuantity(key:string,medicine_name:string,medicine_quantity:number,medicine_size:number,medicine_size2:number,medicine_type:number){
  this.counter=this.counter+1;
  this.afDatabase.object(`ElderData/`+this.id_elder+`/medicine_schedule/`+key).update({actual:this.counter});
  this.afAuth.authState.subscribe(data =>{
  this.elderRef2=this.afDatabase.object(`ElderData/${data.uid}/medicine_schedule/`+key);
}) ;
console.log('med'+medicine_name);

if  (medicine_type==1){
 if(medicine_quantity==1 ){
   this.elderRef2.remove();
 }else{
medicine_quantity= medicine_quantity -1;
let newQuantity = medicine_quantity;
this.afDatabase.object(`ElderData/`+this.id_elder+`/medicine_schedule/`+key).update({medicine_quantity : newQuantity});
  
 }}
 else if  (medicine_type==2){

   if(medicine_quantity==1  && medicine_size <= 15 ){
     this.elderRef2.remove();
   }else{
   if  ( medicine_size  > 15||medicine_size ==15) {
     medicine_size= medicine_size -15
     let newMedicineSize = medicine_size;
     this.afDatabase.object(`ElderData/`+this.id_elder+`/medicine_schedule/`+key).update({medicine_size : newMedicineSize});

   } else if ( medicine_size < 15){
     var  bbb  = 15- medicine_size

     medicine_quantity= medicine_quantity -1;
     let newQuantity = medicine_quantity;
     this.afDatabase.object(`ElderData/`+this.id_elder+`/medicine_schedule/`+key).update({medicine_quantity : newQuantity});

     medicine_size  =medicine_size2 - bbb ;// variable fih size
     console.log('size'+medicine_size);
     
   let newMedicineSize = medicine_size;
   this.afDatabase.object(`ElderData/`+this.id_elder+`/medicine_schedule/`+key).update({medicine_size : newMedicineSize});

   }

    else if (medicine_size ==0 && medicine_quantity >0){
     medicine_quantity= medicine_quantity -1;
     let newQuantity = medicine_quantity;
     this.afDatabase.object(`ElderData/`+this.id_elder+`/medicine_schedule/`+key).update({medicine_quantity : newQuantity});
     medicine_size  =medicine_size2;// variable fih size
     console.log('size'+medicine_size);
     medicine_size= medicine_size -15;
   let newMedicineSize = medicine_size;
   this.afDatabase.object(`ElderData/`+this.id_elder+`/medicine_schedule/`+key).update({medicine_size : newMedicineSize});

    }
    else {
     //toast
       this.navCtrl.pop();
        console.log('f minus');
      }
   }
 //}
   }
    else if  (medicine_type==3){
     if(medicine_quantity==1 ){
       this.elderRef2.remove();
     }else{
     medicine_quantity= medicine_quantity -1;
     let newQuantity = medicine_quantity;
     this.afDatabase.object(`ElderData/`+this.id_elder+`/medicine_schedule/`+key).update({medicine_quantity : newQuantity});

      }
     }
  else {
  this.navCtrl.pop();
   console.log('f minus');
 }
 }
 delete(id:string){
  
   this.afAuth.authState.subscribe(data =>{
    this.elderRef2=this.afDatabase.object(`ElderData/${data.uid}/medicine_schedule/`+id);
    this.elderRef2.remove();

  }) ;
  
 }
 changeQuantity(id:string ){
   
  this.afDatabase.object(`ElderData/`+this.id_elder+`/medicine_schedule/`+id).remove();
  
  let alert = this.alertCtrl.create({
    title: 'انتبه من فضلك!',
    subTitle: 'اختر متى تريد البدء فى هذا العلاج',
    buttons: [
      {
        text: 'الأن',
        handler: () => {
          let alert = this.alertCtrl.create({
            title: 'النظام!',
            subTitle: 'متى ستأخذ العلاج؟',
            buttons: [
              {
                text: 'يوميا',
                handler: () => {
                  const actionSheet =this.actionSheetController.create({
    
                    buttons: [{
                      text: 'مرة فى اليوم ',
                      role: 'destructive',
                      cssClass :'action-sheetbutton',
                    
                    
                      handler: () => {
                        this.navCtrl.push('AddMedicineOnePage' );
                      }
                     
                    }, {
                      text: 'مرتين فى اليوم ',
                      cssClass :'action-sheetbutton',
                    
                      handler: () => {
                        this.navCtrl.push('AddMedicineTwoPage' );
                      }
                      
                      
                    }, {
                      text: 'مرات فى اليوم  ‎۳ ',
                      cssClass :'action-sheetbutton',
                    
                      handler: () => {
                        this.navCtrl.push('AddMedicineThreePage');
                      }
                      
                     
                    }, {
                      text: 'مرات فى اليوم  ‎٤ ',
                      cssClass :'action-sheetbutton',
                    
                      handler: () => {
                        this.navCtrl.push('AddMedicineFourPage');
                      }
                      
                     
                    }, {
                      text: 'اغلاق',
                      cssClass :'action-sheetbutton',
                    
                      role: 'cancel',
                     
                    }]
                  });
                  actionSheet.present();
                }
              }, {
                text: 'تاريخ محدد',
                handler: () => {
                this.navCtrl.push('ShowNotiPage');
                }
              }
            ]
          });
          alert.present();
        
        }
      }, {
        text: 'فيما بعد',
        handler: () => {
          this.navCtrl.push('LaterSchedulePage');
        }
      }
    ]
  });
  alert.present();

   console.log(id);
 
 }
 showDetails(id :string){
  
   console.log(id);
   this.navCtrl.push('DetailsPage', {id:id}); }
                          
  checkNotTakeMedicine(){
   this.MedicineRef.subscribe((items)=>{
   this.MedicineList=items;
   for(let medicine of this.MedicineList) {
   var time1 = medicine.MedicineTime.split(':');
   var hour1=parseInt( time1[0]);
   var minute1=parseInt(time1[1]);
   var beforeMedicineMinute =  minute1 - 10 ;
   var afterMedicineMinute = minute1 +  10 ;
   console.log('before'+ beforeMedicineMinute);
   var checkDailyBefore = Number(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(),new Date().getHours(),beforeMedicineMinute,new Date().getSeconds() )) ;// higib el data bt3 elnharda sa3a 10 sob7 b millisecond
   console.log('checkDailybefore'+ checkDailyBefore);
   var checkDailyAfter = Number(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(),new Date().getHours(),afterMedicineMinute,new Date().getSeconds() )) ;// higib el data bt3 elnharda sa3a 10 sob7 b millisecond
   console.log('checkDailyAfter'+ checkDailyAfter);
   setTimeout(function(){
     
     if(medicine.MedicineType == 1){  this.quantityBeforeType1 = medicine.MedicineQuantity;
       
       console.log('kamia'+ this.quantityBeforeType1);
       alert('   كمية الدوا قبا ما يخده '+ this.quantityBeforeType1, )
     }
     else if (medicine.MedicineType == 2){  this.sizeBeforeType2 = medicine.MedicineSize;
       alert('   كمية الدوا قبا ما يخده '+ medicine.MedicineSize, ) }
     else {this.quantityBeforeType3 = medicine.MedicineQuantity;
               alert('   كمية الدوا قبا ما يخده '+ medicine.MedicineQuantity, ) }
     
    },1558824755000 )
    console.log('kamiate'+ this.quantityBeforeType1);
setTimeout(function(){
     if(medicine.MedicineType == 1 &&  medicine.MedicineQuantity == this.quantityBeforeType1 && medicine.MedicineQuantity >0 ){ 
       console.log('kamiat'+ this.quantityBeforeType1);
       alert('   انت مخدتش الدوا '+ medicine.MedicineName, )
     }
     else if (medicine.MedicineType == 2 && medicine.MedicineSize == this.quantityBeforeType2){
       alert('   انت مخدتش الدوا '+ medicine.MedicineName, ) }
     else if (medicine.MedicineType == 3 &&  medicine.MedicineQuantity == this.quantityBeforeType3 )
     {alert('   انت مخدتش الدوا '+ medicine.MedicineName, ) }
     else  {
       console.log('');
     }
     
    },1558825175000 )
    console.log('kamiab3d ma5od dawa'+ medicine.MedicineQuantity);
   }
   });

 }
 
}
