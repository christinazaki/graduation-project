import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ElderData } from '../../Model/ElderData.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import { medtest } from '../../Model/medtest';

@IonicPage()
@Component({
  selector: 'page-dependent-profile',
  templateUrl: 'dependent-profile.html',
})
export class DependentProfilePage {
    Zhaymar : any;
    ElderID : any;
    DependentID:any;
    DependentEmail :any;
    elderName:string;
    dependentImage : any;
    elderList : ElderData[];
    MedicineList:medtest[];
    key:string; 
    MedicineRef:FirebaseListObservable<medtest[]>;
    eldersRef:FirebaseListObservable<ElderData[]>;
    object_medicine:medtest;
  

    elderData: FirebaseObjectObservable<ElderData>;

    
  constructor(public navCtrl: NavController,
    private database:AngularFireDatabase, public navParams: NavParams,private afAuth : AngularFireAuth ,
    public alertCtrl: AlertController ,public actionSheetController: ActionSheetController) {
  
           
      this.ElderID = navParams.get('id');
      this.DependentID= navParams.get('id');
      this.DependentEmail =navParams.get('email');
      this.eldersRef=this.database.list('ElderData');
      this.eldersRef.subscribe((Items)=>{
        this.elderList=Items
      }) ;
     console.log('ID>>>>'+this.ElderID);


  }

  ShowElderMedicineNotZahymar(id:string){ 
    this.navCtrl.push('ShowMedicineElderlyPage',{id:id});
  }


  ShowElderMedicineZahymar(id:string){
    this.navCtrl.push('ShowMyMedicinePage',{id:id});
  }


  AddElderMedicineZahymar(id:string){
    let alert = this.alertCtrl.create({
      title: 'انتبه من فضلك!',
      subTitle: 'اختر متى تريد البدء فى هذا العلاج',
      buttons: [
        {
          text: 'الأن',
          handler: () => {
            let alert = this.alertCtrl.create({
              title: 'النظام!',
              subTitle: 'هل ستكرر هذا العلاج؟',
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
                  text: 'تواريخ محدد',
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
  
  
  }
  

  EditDepPass(id:string){
    this.navCtrl.push('EditDepPasswordPage',{id:id});
  }



  ShowElderData(id:string){
    this.navCtrl.push('ShowElderByDepPage',{id:id});
  }

  ShowReport(id:string){
    console.log("kkkk"+id);
      this.MedicineRef = this.database.list(`ElderData/`+id+`/medicine_schedule`);
      this.MedicineRef.subscribe((Items)=>{
        this.MedicineList=Items;
      }) ;
   console.log("vero"+this.MedicineList[0].medicine_name);
   this.navCtrl.push('ShowReportPage',{MedicineList:this.MedicineList,id:id});
  }

  
  addRememberInfo(id:string){
    this.navCtrl.push('AddRememberInfoPage',{id:id});
  }

}





