import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ElderData } from '../../Model/ElderData.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  validations_form: FormGroup;
  errorMessage: string = '';
  
  
  elderly = {} as ElderData;
  
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private afauth : AngularFireAuth , private formBuilder: FormBuilder , private alertCtrl: AlertController) {
  }


  ngOnInit() {

    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }
  validation_messages = {
    'email': [
      { type: 'required', message: 'الأيميل اساسي' },
      { type: 'pattern', message: 'من فضلك ادخل الايميل صحيحا' }
    ],
    'password': [
      { type: 'required', message: 'الرقم السري اساسي' },
      { type: 'minlength', message: 'الرقم السري حد اقصي ستة احرف' }
    ]
  };
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  //Register Email and Password for 1st time
  registerDone(elderly : ElderData)
  { 
        this.afauth.auth.createUserWithEmailAndPassword(elderly.email , elderly.Password).then(
          () => this.navCtrl.setRoot('ElderAddInfoPage')).catch(()=>
          {
            this.navCtrl.setRoot('LoginAsElderPage').catch(()=>{
              let alert = this.alertCtrl.create({
                message:'حضرتك اصلا مسجل قبل كدة ..قم بالدخول',
                buttons: ['اغلاق']
              });
              alert.present();
            });
          })
            
  }

  
}