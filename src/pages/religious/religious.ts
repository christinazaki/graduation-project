import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Religious } from '../../Model/Religious.interface';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { ElderData } from '../../Model/ElderData.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import { CHReligious } from '../../Model/CHReligious.interface';

/**
 * Generated class for the ReligiousPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-religious',
  templateUrl: 'religious.html',
})
export class ReligiousPage {

  dataList:Religious[];
  dataChristian:CHReligious[];
  
  dataRef:FirebaseListObservable<Religious[]>;
  dataChris:FirebaseListObservable<CHReligious[]>;
  

  elderData: FirebaseObjectObservable<ElderData[]>;
  elderly = {} as ElderData;

  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private database:AngularFireDatabase,
    private afAuth : AngularFireAuth
    ,private afDatabase: AngularFireDatabase
    ) {
      this.dataRef=this.database.list('Religious');
          this.dataRef.subscribe((Items)=>{
            this.dataList=Items;
          });


         /*  this.dataChris=this.database.list('ChristianReligious');
          this.dataChris.subscribe((Items)=>{
            this.dataChristian=Items;
          });
 */
          this.afAuth.authState.subscribe(data => {
            if(data && data.email && data.uid)
            {
              this.elderData = this.afDatabase.object(`ElderData/${data.uid}`);
      
            }
          })

/* 
      const result =  this.elderly.Religion;

        if(result == "Moslim")
        {
          this.dataRef=this.database.list('Religious');
          this.dataRef.subscribe((Items)=>{
            this.dataList=Items;
          });
        }
        else if(result == "Christ")
        {

        } */

    }
  

    ionViewWillLoad() {
      
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReligiousPage');
  }

  Day(id){
    this.afDatabase.object(`Religious`).update({current:id});
    console.log("the key is :::::"+id);
    this.navCtrl.push('DayPage',{id:id});
    
  }

  DayCh(id){
    this.afDatabase.object(`ChristianReligious`).update({current:id});
    console.log("the key is :::::"+id);
    this.navCtrl.push('DayChristianPage',{id:id});
  }

  back(){
    this.navCtrl.setRoot('TabsPage');
  }
}

