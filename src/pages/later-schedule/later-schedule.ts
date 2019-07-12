import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ActionSheetController } from 'ionic-angular';
import { Medicine } from '../../Model/Medicine.interface';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ShowNotiPage } from '../show-noti/show-noti';


@IonicPage()
@Component({
  selector: 'page-later-schedule',
  templateUrl: 'later-schedule.html',
})
export class LaterSchedulePage {

  mymedicine={}as Medicine;
  
  


  constructor(public navCtrl: NavController, public navParams: NavParams,public localNotifications: LocalNotifications,public alertCtrl: AlertController,public actionSheetController: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LaterSchedulePage');
  }

  startNoti(){
   
    this.localNotifications.schedule({
      text:this.mymedicine.MedicineName +' نذكرك بانك ستبدأ بأخذ العلاج منذ اليوم ',
      trigger: {at: new Date(this.mymedicine.MedicineDate)},
      led: 'FF0000',
      sound: null,
      actions: [
        { id: 'yes', title: 'Yes' },
        { id: 'no',  title: 'No' }
      ]
   });

   this.localNotifications.on('click').subscribe(notification => {
    // Logic here
  /*  console.log("Notification Clicked");
    this.navCtrl.push(ShowNotiPage);*/
    
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
  });
  }

}
