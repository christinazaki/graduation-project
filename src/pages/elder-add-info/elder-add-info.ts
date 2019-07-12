import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ElderData } from '../../Model/ElderData.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
/**
 * Generated class for the ElderAddInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-elder-add-info',
  templateUrl: 'elder-add-info.html',
})
export class ElderAddInfoPage {

  elderly = {} as ElderData;
  captureDataUrl: string;

  validations_form: FormGroup;
  errorMessage: string = '';


  constructor(public navCtrl: NavController, public navParams: NavParams
    , private afAuth : AngularFireAuth , private formBuilder: FormBuilder
    , private afDatabase: AngularFireDatabase , private camera : Camera) {

  }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      age: new FormControl('', Validators.compose([
        Validators.required,
        Validators.min(45),
        Validators.max(90)
      ])),
      mob: new FormControl('', Validators.compose([
        Validators.pattern('[01]{9}'),
        Validators.maxLength(11)
      ])),
      address: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }
  
  validation_messages = {
    'name': [
      { type: 'required', message: 'قم بادخال الاسم ... هذا اساسي' }
    ],
    'age': [
      { type: 'required', message: 'قم بادخال العمر ... هذا اساسي' },
      { type: 'min', message: 'لا تستطيع التسجيل..يلزم ان يكون العمر اكبر من 45 سنة' },
      { type: 'max', message: 'لا تستطيع التسجيل..يلزم ان يكون العمر اقل من 90 سنة' },
    ],
    'mob': [
      { type: 'pattern', message: 'قم بادخال الرقم صحيحا' },
      { type: 'maxLength', message: 'قم بادخال الرقم صحيحا' },
    ]
  };
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ElderAddInfoPage');
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

//To save Data of Elder

saveElderData()
{
  this.afAuth.authState.subscribe(auth=>{
    //catch the auth id
    this.afDatabase.object(`ElderData/${auth.uid}`).set(this.elderly)
    .then(() => this.navCtrl.setRoot('TabsPage'));
    //this.afDatabase.object(`ElderData/${auth.uid}`).update({zahymar:'ليس لديه'});
    this.afDatabase.object(`ElderData/${auth.uid}`).update({image:this.captureDataUrl});
  })
}

/* this.afDatabase.object(ElderData/${auth.uid}).set(this.elderly);
    
    this.afDatabase.object(ElderData/${auth.uid}/).update({image:this.captureDataUrl}).then(() => this.navCtrl.setRoot('TabsPage'));
 */



}

