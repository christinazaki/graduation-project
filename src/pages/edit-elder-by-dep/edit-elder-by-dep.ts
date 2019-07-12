import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase , FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ElderData } from '../../Model/ElderData.interface';
/**
 * Generated class for the EditElderByDepPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-elder-by-dep',
  templateUrl: 'edit-elder-by-dep.html',
})
export class EditElderByDepPage {
ElderID:any;



elders : FirebaseListObservable<any>;

elderly = {
  id : '',
  Name: '',
  Age : '', 
  Address : '',
  PhoneNumber : '',
  Religion : ''
} 

myElder ={}as ElderData;


  constructor(public navCtrl: NavController, public navParams: NavParams
    , public db: AngularFireDatabase , public afAuth : AngularFireAuth,
       private afDatabase: AngularFireDatabase) {
    this.ElderID = navParams.get('id');
    this.myElder=this.navParams.data;

  }
  elderData: FirebaseObjectObservable<ElderData>;


  ionViewDidLoad() {
    console.log(' ElderID>>>>>>'+ this.ElderID);

    console.log('ionViewDidLoad EditElderByDepPage');

    this.afAuth.authState.subscribe(data => {
      
        this.elderData = this.afDatabase.object(`ElderData/`+this.ElderID);
       /* this.dependentData = this.afDatabase.object(`ElderData/${data.uid}`);*/
      
    })
  }

  editElderData(id:string)
  {
    {
      this.afAuth.authState.subscribe(auth=>{
        //catch the auth id
        this.afDatabase.object(`ElderData/`+this.ElderID).update(this.elderly)
        .then(() => this.navCtrl.push('DependentProfilePage',{id:id}));
  
        
    })
    }
  }


}


