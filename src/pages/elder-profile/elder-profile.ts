import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, ActionSheetController, Nav } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { ElderData } from '../../Model/ElderData.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import { Dependent } from '../../Model/DependentData.interface';
import { Medicine } from '../../Model/Medicine.interface';
import { LoginAsElderPage } from '../login-as-elder/login-as-elder';
import { ElderAppPage } from '../elder-app/elder-app';
import { WelcomePage } from '../welcome/welcome';
import { ReligiousPage } from '../religious/religious';
import { QuizzesPage } from '../quizzes/quizzes';
import { ComplaintPage } from '../complaint/complaint';
import { ChattingRoomPage } from '../chatting-room/chatting-room';
import { AskDoctorRoomPage } from '../ask-doctor-room/ask-doctor-room';
import { HelpPage } from '../help/help';


@IonicPage()
@Component({
  selector: 'page-elder-profile',
  templateUrl: 'elder-profile.html',
})
export class ElderProfilePage {
  rootPage:any = WelcomePage;

  @ViewChild(Nav) nav : Nav;

  pages : Array<{title: string , component : any , icon:string}>;

  
  elderly = {} as ElderData;
  myMedicine={}as Medicine;
  id:string;

  DependentList:ElderData[];
  DependentRef:FirebaseListObservable<ElderData[]>;

  elderData: FirebaseObjectObservable<ElderData>;
  dependentData : FirebaseObjectObservable<Dependent>;

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private afAuth : AngularFireAuth
    ,private afDatabase: AngularFireDatabase , public alertCtrl: AlertController
    ,public app : App,public actionSheetController: ActionSheetController) {


      this.pages=[
        {title:'الديني' , component : ReligiousPage , icon: 'book'},
        {title:'التسلية' , component : QuizzesPage , icon : 'help'},
        {title:'لأجراء شكوي' , component : ComplaintPage , icon:'create'},
        {title:'للمحادثة مع الاخرين' , component : ChattingRoomPage , icon:'chatboxes'},
        {title:'أسأل طبيبك' , component : AskDoctorRoomPage , icon:'medkit'},        
      ];


      this.DependentRef=this.afDatabase.list('Dependent');

      this.DependentRef.subscribe((Item)=>{
        this.DependentList=Item;
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ElderProfilePage');
  }
  openPage(p){
    this.app.getRootNav().setRoot(p.component);
  }
  //Logout and Hide tabs from the page
  logout(){
    this.app.getRootNav().setRoot(LoginAsElderPage);

  }
  
  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid)
      {
        this.elderData = this.afDatabase.object(`ElderData/${data.uid}`);
        this.id=data.uid;
        
        this.dependentData = this.afDatabase.object(`Dependent/${data.uid}`);
      }
    })
  }

    updateDepedent()
    {
      this.navCtrl.push('EditDependentPage');
    }


   //Add medications Time Table.
   addMedicine()
    {
        let alert = this.alertCtrl.create({
          title: 'انتبه من فضلك!',
          subTitle: 'اختر متى تريد البدء فى هذا العلاج',
          buttons: [
            {
              text: 'الأن',
              handler: () => {
                let alert = this.alertCtrl.create({
                  title: 'النظام!',
                  subTitle: 'هل ستكرر هذا العلاج؟',
                  buttons: [
                    {
                      text: 'يوميا',
                      handler: () => {
                        const actionSheet =this.actionSheetController.create({
    
     
                          buttons: [{
                            text: 'مرة فى اليوم ',
                            role: 'destructive',
                            cssClass :'action-sheetbutton',
                          
                          
                            handler: () => {
                              this.navCtrl.push('AddMedicineOnePage' );
                            }
                           
                          }, {
                            text: 'مرتين فى اليوم ',
                            cssClass :'action-sheetbutton',
                          
                            handler: () => {
                              this.navCtrl.push('AddMedicineTwoPage' );
                            }
                            
                            
                          }, {
                            text: 'مرات فى اليوم  ‎۳ ',
                            cssClass :'action-sheetbutton',
                          
                            handler: () => {
                              this.navCtrl.push('AddMedicineThreePage');
                            }
                            
                           
                          }, {
                            text: 'مرات فى اليوم  ‎٤ ',
                            cssClass :'action-sheetbutton',
                          
                            handler: () => {
                              this.navCtrl.push('AddMedicineFourPage');
                            }
                            
                           
                          }, {
                            text: 'اغلاق',
                            cssClass :'action-sheetbutton',
                          
                            role: 'cancel',
                           
                          }]
                        });
                        actionSheet.present();
                      }
                    }, {
                      text: 'تواريخ محدد',
                      handler: () => {
                      this.navCtrl.push('ShowNotiPage');
                      }
                    }
                  ]
                });
                alert.present();
              
              }
            }, {
              text: 'فيما بعد',
              handler: () => {
                this.navCtrl.push('LaterSchedulePage');
              }
            }
          ]
        });
        alert.present();
      
      //this.navCtrl.pop();
   
  }


//To Show all Doctor's Chat and Chatting with each one
  /* askDoctor(){
     this.navCtrl.push('AskDoctorRoomPage');
   }

   chatting()
   {
    this.navCtrl.push('ChattingRoomPage');
   } */

  deleteAccount(){
    this.afAuth.authState.subscribe((authState) => { 
      authState.delete();
      this.app.getRootNav().setRoot(ElderAppPage);
      //this.afAuth.auth.signOut();
     });
  }
  showAllMedicines(){
    this.navCtrl.push('ShowMyMedicinePage' );
  }

  addDependent(){
    this.navCtrl.push('AddDependentPage');
  }

  showRemeberInfo(){
    this.navCtrl.push('ShowRemeberInfoPage');
  }

  addNotes(){
    this.navCtrl.push('SpecificSchedulePage');
  }
 
}
