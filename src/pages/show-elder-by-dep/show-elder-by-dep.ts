
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase , FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ElderData } from '../../Model/ElderData.interface';

/**
 * Generated class for the ShowElderByDepPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-elder-by-dep',
  templateUrl: 'show-elder-by-dep.html',
})
export class ShowElderByDepPage {
  ElderID:any;

  myElder ={}as ElderData;


  constructor(public navCtrl: NavController, public navParams: NavParams
    , public db: AngularFireDatabase , public afAuth : AngularFireAuth,
       private afDatabase: AngularFireDatabase) {
        this.ElderID = navParams.get('id');
        this.myElder=this.navParams.data;
  }
  elderData: FirebaseObjectObservable<ElderData>;

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowElderByDepPage');
    
    this.afAuth.authState.subscribe(data => {
      
      this.elderData = this.afDatabase.object(`ElderData/`+this.ElderID);
     /* this.dependentData = this.afDatabase.object(`ElderData/${data.uid}`);*/
    
  })
  }
  EditElderByDep(id:string){
    this.navCtrl.push('EditElderByDepPage',{id:id});

  }

}


