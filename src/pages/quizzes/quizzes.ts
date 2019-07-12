import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeneralQuestionsPage } from '../general-questions/general-questions';
import { HealthAndScienceQuestionsPage } from '../health-and-science-questions/health-and-science-questions';
import { MixQuestionsPage } from '../mix-questions/mix-questions';
import { WhoWhereWhatQuestionsPage } from '../who-where-what-questions/who-where-what-questions';




@IonicPage()
@Component({
  selector: 'page-quizzes',
  templateUrl: 'quizzes.html',
})
export class QuizzesPage {


   constructor(public navCtrl: NavController, public navParams: NavParams) {

    }

    generalQuestions(){
      this.navCtrl.push(GeneralQuestionsPage);
    }

    healthAndScienceQuestions(){
      this.navCtrl.push(HealthAndScienceQuestionsPage);
    }


    mixQuestions(){
      this.navCtrl.push(MixQuestionsPage);
    }

    whoWhereWhatQuestions(){
      this.navCtrl.push(WhoWhereWhatQuestionsPage);
    }

    back(){
      this.navCtrl.setRoot('TabsPage');
    }
}
 