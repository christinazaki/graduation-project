import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-chatting-home',
  templateUrl: 'chatting-home.html',
})
export class ChattingHomePage {
  
  @ViewChild(Content) content: Content;

  data = { type:'', nickname:'', message:'' };
  chats = [];
  roomkey:string;
  nickname:string;
  offStatus:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams
    , private afDatabase: AngularFireDatabase) {
      
    this.roomkey = this.navParams.get("key") as string;
    this.nickname = this.navParams.get("nickname") as string;
    this.data.type = 'message';
    this.data.nickname = this.nickname;

    this.afDatabase.list('chatrooms/'+this.roomkey+'/chats').push({
   
      type:'join',
      user:this.nickname,
      message:'قام'+this.nickname+'بالدخول الي المحادثة',
      sendDate:Date()
    });
    this.data.message = '';
  
    this.afDatabase.list('chatrooms/'+this.roomkey+'/chats').subscribe(x=>{
      this.chats = x;
      setTimeout(() => {
        if(this.offStatus === false) {
          this.content.scrollToBottom(300);
        }
      }, 1000);
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ChattingHomePage');
  }

  sendMessage() {
    this.afDatabase.list('chatrooms/'+this.roomkey+'/chats').push({
    
      type:this.data.type,
      user:this.data.nickname,
      message:this.data.message,
      sendDate:Date()
    });
    this.data.message = '';
  }

  exitChat() {
  this.afDatabase.list('chatrooms/'+this.roomkey+'/chats').push({
  
    type:'exit',
    user:this.nickname,
    message:'قام'+this.nickname+'بالخروج من المحادثة',
    sendDate:Date()
  });

  this.offStatus = true;

  this.navCtrl.setRoot("ChattingRoomPage", {
    nickname:this.nickname
  });

}

}
export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
}
