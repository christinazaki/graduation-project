import { Component , ViewChild} from '@angular/core';
import { Nav , Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WelcomePage } from '../pages/welcome/welcome';
import { QuizzesPage } from '../pages/quizzes/quizzes';
import { ReligiousPage } from '../pages/religious/religious';
import { ComplaintPage } from '../pages/complaint/complaint';
import { LoginAsElderPage } from '../pages/login-as-elder/login-as-elder';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = WelcomePage;

  @ViewChild(Nav) nav : Nav;

  pages : Array<{title: string , component : any , icon:string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    this.pages=[
      {title:'الديني' , component : ReligiousPage , icon: 'book'},
      {title:'التسلية' , component : QuizzesPage , icon : 'help'},
      {title:'لأجراء شكوي' , component : ComplaintPage , icon:'create'}
    ]
    
  }

  initializeApp(){
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(p){
    this.nav.setRoot(p.component);
  }

  
  logout(){
    this.nav.setRoot(LoginAsElderPage);
  }
}

