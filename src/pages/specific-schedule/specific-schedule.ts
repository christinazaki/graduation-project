import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

/**
 * Generated class for the SpecificSchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-specific-schedule',
  templateUrl: 'specific-schedule.html',
})
export class SpecificSchedulePage {

  Note:string;
  date:string;
  time:string;
  arr_time:string[];
  arr_date:string[];
  day:number;
  month:number;
  hour:number;
  minutes:number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public localNotifications: LocalNotifications,public platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpecificSchedulePage');
  }
  Save_schedule(){
   this.arr_time=this.time.split(':');
   this.hour=+this.arr_time[0];
   this.minutes=+this.arr_time[1];
   this.arr_date=this.date.split('-');
   this.day=+this.arr_date[2];
   this.month=+this.arr_date[1];
   this.localNotifications.schedule([{
    id: 1, 
    text: this.Note,
    sound:this.setSound(),
    trigger:{ every:   {month:this.month, day:  this.day, hour: this.hour, minute: this.minutes
    }, count:1440} 
  
     }]); 
  }
  setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/sounds/loving-you.mp3'
    } else {
      return 'file://assets/sounds/loving-you.mp3'
    }
  }

}
