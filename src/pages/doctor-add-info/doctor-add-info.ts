import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { DoctorData } from '../../Model/DoctorData.interface';
import { Camera, CameraOptions } from '@ionic-native/camera';


/**
 * Generated class for the DoctorAddInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctor-add-info',
  templateUrl: 'doctor-add-info.html',
})
export class DoctorAddInfoPage {

  captureDataUrl: string;
  captureDataUrlDoc: string;
  doctor  = {} as DoctorData;
  email :string;

  constructor(public navCtrl: NavController, public navParams: NavParams
    , private afAuth : AngularFireAuth 
    , private afDatabase: AngularFireDatabase
    , private camera : Camera
    , private camera1 : Camera 
    , private alert : AlertController) {
      this.email =navParams.get('email');
      console.log("emal is : " + this.email);

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorAddInfoPage');
  }
  
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
  }

  saveDoctorData()
    {
      /* this.afAuth.authState.subscribe(auth=>{
        //catch the auth id
        this.afDatabase.object(`DoctorData/${auth.uid}`).set(this.doctor)
        .then(() => this.navCtrl.setRoot('DoctorProfilePage'));
      }) */

      this.afAuth.authState.subscribe(auth=>{
        //catch the auth id
        this.afDatabase.object(`DoctorData/${auth.uid}`).set(this.doctor)
        .then(() => this.navCtrl.setRoot('LoginAsDoctorPage'));

      
        this.afDatabase.object(`DoctorData/${auth.uid}`).update({image:this.captureDataUrl});
        this.afDatabase.object(`DoctorData/${auth.uid}`).update({requestImage:this.captureDataUrlDoc});

      })
    }


    getRequestPic(sourceType){
      const cameraOptions: CameraOptions = {
        quality: 50,
        destinationType: this.camera1.DestinationType.DATA_URL,
        encodingType:this.camera1.EncodingType.JPEG,
        mediaType: this.camera1.MediaType.PICTURE,
        sourceType: sourceType
      };
    
      this.camera1.getPicture(cameraOptions)
       .then((captureDataUrlDoc) => {
         this.captureDataUrlDoc = 'data:image/jpeg;base64,' + captureDataUrlDoc;
         //this.testimg = this.captureDataUrl;
      }, (err) => {
          console.log(err);
      }); 
    }
}
