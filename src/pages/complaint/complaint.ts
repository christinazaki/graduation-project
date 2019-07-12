import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Complaint } from '../../Model/Complaint.interface';

/**
 * Generated class for the ComplaintPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-complaint',
  templateUrl: 'complaint.html',
})
export class ComplaintPage {
  ElderID : any;

  /* description : string;
  descriptionType : string; */

  complaint= {} as Complaint;

  constructor(public navCtrl: NavController, public navParams: NavParams
    , private afDatabase: AngularFireDatabase) {
    this.ElderID = navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MakeComplianPage');
  }



   saveComplain(id:string){
    this.afDatabase.object(`Complain/`+this.ElderID).update({description:this.complaint.description})
    this.afDatabase.object(`Complain/`+this.ElderID).update({type:this.complaint.descriptionType})
    this.navCtrl.push('ElderProfilePage',{id:id});
   }

   back(){
     this.navCtrl.setRoot('TabsPage');
   }
  }