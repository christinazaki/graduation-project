import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { MyApp } from './app.component';
import { WelcomePage } from '../pages/welcome/welcome';
import { QuizzesPage } from '../pages/quizzes/quizzes';

import {EmailComposer } from '@ionic-native/email-composer';
import { Camera } from '@ionic-native/camera';
import { ReligiousPage } from '../pages/religious/religious';
import { ComplaintPage } from '../pages/complaint/complaint';
import { ReligiousPageModule } from '../pages/religious/religious.module';
import { QuizzesPageModule } from '../pages/quizzes/quizzes.module';
import { ChattingRoomPage } from '../pages/chatting-room/chatting-room';
import { AskDoctorRoomPage } from '../pages/ask-doctor-room/ask-doctor-room';
import { ChattingRoomPageModule } from '../pages/chatting-room/chatting-room.module';
import { AskDoctorRoomPageModule } from '../pages/ask-doctor-room/ask-doctor-room.module';
import { GeneralQuestionsPageModule } from '../pages/general-questions/general-questions.module';
import { HealthAndScienceQuestionsPageModule } from '../pages/health-and-science-questions/health-and-science-questions.module';
import { MixQuestionsPageModule } from '../pages/mix-questions/mix-questions.module';
import { WhoWhereWhatQuestionsPageModule } from '../pages/who-where-what-questions/who-where-what-questions.module';
import { GeneralQuestionsPage } from '../pages/general-questions/general-questions';
import { MixQuestionsPage } from '../pages/mix-questions/mix-questions';
import { HealthAndScienceQuestionsPage } from '../pages/health-and-science-questions/health-and-science-questions';
import { WhoWhereWhatQuestionsPage } from '../pages/who-where-what-questions/who-where-what-questions';


@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    ComplaintPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp
    ({
        apiKey: "AIzaSyDZyLA2OIbLxZKZr3UXAIF4saPL6qO7Kp4",
        authDomain: "elderly-project-f8c95.firebaseapp.com",
        databaseURL: "https://elderly-project-f8c95.firebaseio.com",
        projectId: "elderly-project-f8c95",
        storageBucket: "elderly-project-f8c95.appspot.com",
        messagingSenderId: "343779263934"
      }),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReligiousPageModule,
    QuizzesPageModule,
    ChattingRoomPageModule,
    AskDoctorRoomPageModule,
    GeneralQuestionsPageModule,
    HealthAndScienceQuestionsPageModule,
    MixQuestionsPageModule,
    WhoWhereWhatQuestionsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    QuizzesPage,
    ReligiousPage,
    ComplaintPage,
    ChattingRoomPage,
    AskDoctorRoomPage,
    GeneralQuestionsPage,
    MixQuestionsPage,
    HealthAndScienceQuestionsPage,
    WhoWhereWhatQuestionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalNotifications,
    EmailComposer,
    Camera
  ]
})
export class AppModule {}
