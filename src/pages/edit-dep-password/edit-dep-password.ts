import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase , FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Dependent } from '../../Model/DependentData.interface';
import { CameraOptions, Camera } from '@ionic-native/camera';
/**
 * Generated class for the EditDepPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-dep-password',
  templateUrl: 'edit-dep-password.html',
})
export class EditDepPasswordPage {
  DependentID:any;
  dependentData: FirebaseObjectObservable<Dependent>;
 pass : string;
 captureDataUrl: string;

  constructor(public navCtrl: NavController, public navParams: NavParams
    , public db: AngularFireDatabase , public afAuth : AngularFireAuth,
       private afDatabase: AngularFireDatabase , private camera : Camera) {
    this.DependentID = navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditDepPasswordPage');

    
    this.afAuth.authState.subscribe(data => {
      
      this.dependentData = this.afDatabase.object(`Dependent/`+this.DependentID);
     /* this.dependentData = this.afDatabase.object(`ElderData/${data.uid}`);*/
    
  })
  }


  editData(id:string)
  {
    this.afDatabase.object(`Dependent/`+this.DependentID).update({Password:this.pass});
    //this.afDatabase.object(`Dependent/`+ this.DependentID).update({image:this.captureDataUrl});
    
    this.navCtrl.push('DependentProfilePage',{id:id});
  }
/* 
  getProfilePic(sourceType){
    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType
    };
  
    this.camera.getPicture(cameraOptions)
     .then((captureDataUrl) => {
       this.captureDataUrl = 'data:image/jpeg;base64,' + captureDataUrl;
       //this.testimg = this.captureDataUrl;
    }, (err) => {
        console.log(err);
    }); 
  } */
}
