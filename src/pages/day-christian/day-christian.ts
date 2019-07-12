import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CHReligious } from '../../Model/CHReligious.interface';
import { FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the DayChristianPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-day-christian',
  templateUrl: 'day-christian.html',
})
export class DayChristianPage {

  myrel ={}as CHReligious;
  RelRef:FirebaseObjectObservable<CHReligious[]>;
  relData: FirebaseObjectObservable<CHReligious>;
  aya : string;
  snap : string;
  cur : any;
  constructor(public navCtrl: NavController, public navParams: NavParams
    , public db: AngularFireDatabase , public afAuth : AngularFireAuth,
    private database:AngularFireDatabase,
       private afDatabase: AngularFireDatabase) {
       this.afDatabase.object(`ChristianReligious/current`).set(this.myrel);
         this.myrel =this.navParams.data;
         this.cur = navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DayPage');
  }


  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if(data)
      {
        this.relData = this.afDatabase.object(`ChristianReligious/`+this.cur);
        
        
        console.log("cur >>>>>>>>>>>> "+ this.cur);


  /*       
         var ref =database().ref('Religious/current');
         ref.on("value", function(snapshot) {
          this.snap = snapshot.val();
           }, function (error) {
           console.log("Error: " + error.code);
         });
         database().ref('Religious/current').once('value', (snapshot) => {
          console.log("aloooooo "+snapshot.val().current)
       })
         console.log("current now issssss:" +this.snap );
*/
      }
      
    })
    
  }


  Back(){
    this.navCtrl.setRoot('ReligiousPage');
  }

}



