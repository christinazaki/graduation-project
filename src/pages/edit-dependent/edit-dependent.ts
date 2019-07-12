import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Dependent } from '../../Model/DependentData.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

/**
 * Generated class for the EditDependentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-dependent',
  templateUrl: 'edit-dependent.html',
})
export class EditDependentPage {

  myDep ={}as Dependent;

  depData: FirebaseObjectObservable<Dependent>;

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public afAuth : AngularFireAuth,
    private afDatabase: AngularFireDatabase) {
    this.myDep=this.navParams.data;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EditDependentPage');
  }


  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid)
      {
        this.depData = this.afDatabase.object(`ElderData/${data.uid}`);
       /* this.dependentData = this.afDatabase.object(`ElderData/${data.uid}`);*/
      }
    })
  }

  editDependent()
  {
    
      this.afAuth.authState.subscribe(auth=>{
        //catch the auth id
        this.afDatabase.object(`Dependent/${auth.uid}`).update(this.myDep)
        .then(() => this.navCtrl.setRoot('ElderProfilePage'));
  
        
    })
    
  }

}
