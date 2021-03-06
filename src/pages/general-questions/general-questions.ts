import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Questions } from '../../Model/Questions';

/**
 * Generated class for the GeneralQuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-general-questions',
  templateUrl: 'general-questions.html',
})
export class GeneralQuestionsPage {

  variable =Math.floor(Math.random() * 25);
 
  
  Questions:Questions[];
  QuRef:FirebaseListObservable<Questions[]>;

   constructor(public navCtrl: NavController, public navParams: NavParams
     ,private database:AngularFireDatabase
     ,private alertCtrl: AlertController ) {

  this.QuRef=this.database.list('GeneralQuestions');
      this.QuRef.subscribe((Item)=>{
        this.Questions=Item; 
      });

  }



next(){
  
  this.variable=Math.floor(Math.random() * 25);
  console.log("the variable is >>>>> "+this.variable);
}

    
finish()
{
  this.navCtrl.setRoot('QuizzesPage');

}

toggle1(ques,answer:any,Ans:any){
  if(answer==true){
    ques.mp3 = new Audio('Correct Answer Sound Effect.mp3');
    ques.mp3.play();
  let alert = this.alertCtrl.create({
    //title: 'Answer',
    subTitle: 'الاجابه صحيحه',
    buttons: ['اغلاق']
  });
  alert.present();
  }
else{
    ques.mp3 = new Audio('Wrong-answer-sound-effect.mp3');
    ques.mp3.play();
    let alert = this.alertCtrl.create({
     // title: 'Answer',
      subTitle: 'الاجابه خاطئه',
      message:'الاجابة الصحيحة هي '+ Ans,
      buttons: ['اغلاق']
    });
    alert.present();
    }
this.navCtrl.setRoot('GeneralQuestionsPage');

}

toggle2(ques,answer:any,Ans:any){
  if(answer==true){
    ques.mp3 = new Audio('Correct Answer Sound Effect.mp3');
    ques.mp3.play();
  let alert = this.alertCtrl.create({
   // title: 'Answer',
    subTitle: 'الاجابه صحيحه',
    buttons: ['اغلاق']
  });
  alert.present();
  }
else{
    ques.mp3 = new Audio('Wrong-answer-sound-effect.mp3');
    ques.mp3.play();
    let alert = this.alertCtrl.create({
     // title: 'Answer',
      subTitle: 'الاجابه خاطئه',
      message:'الاجابة الصحيحة هي '+ Ans,
      buttons: ['اغلاق']
    });
    alert.present();
    }
this.navCtrl.setRoot('GeneralQuestionsPage');

}


toggle3(ques,answer:any,Ans:any){
  if(answer==true){
    ques.mp3 = new Audio('Correct Answer Sound Effect.mp3');
    ques.mp3.play();
    let alert = this.alertCtrl.create({
    // title: 'Answer',
      subTitle: 'الاجابه صحبحه',
      buttons: ['اغلاق']
    });
  alert.present();
  }
else{
    ques.mp3 = new Audio('Wrong-answer-sound-effect.mp3');
    ques.mp3.play();
    let alert = this.alertCtrl.create({
     // title: 'Answer',
      subTitle: 'الاجابه خاطئه',
      message:'الاجابة الصحيحة هي '+ Ans,
      buttons: ['اغلاق']
    });
    alert.present();
    }
this.navCtrl.setRoot('GeneralQuestionsPage');

}



}
 