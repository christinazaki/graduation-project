import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { medtest } from '../../Model/medtest';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
 
@IonicPage()
@Component({
  selector: 'page-show-report',
  templateUrl: 'show-report.html',
})
export class ShowReportPage {
  MedicineRef:FirebaseListObservable<medtest[]>;
  date1;
  month1;
  monthNow2;
  actual:number;
  expected:number=0;
  dateNow2;
  dayNow2;
  day1;
  dateNow = new Date () .toISOString().split('T')[0];
  ElderID:any;
  Now=new Date().toISOString().split('T');//start of vero variables
  date_n:string=this.Now[0];
  time_n:string=this.Now[1];
  MedicineList:medtest[];
  Medicine_List:medtest[];
  i:number;
  x:number;
  hours_now:number;
  minutes_now:number;
  day:number;
  month:number;
  arr_date:string[];
  arr_time:string[];
  arr_date1:string[];
  arr_time1:string[];
  arr_date2:string[];
  arr_time2:string[];
  hr:number;
  min:number;
  D:number;
  M:number;
  pdfObj = null;
 
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public dataBase: AngularFireDatabase,private afAuth : AngularFireAuth 
    , private afDatabase : AngularFireDatabase ) {
    this.MedicineList=this.navParams.get('MedicineList');
    this.ElderID = navParams.get('id');
    this.arr_time=this.time_n.split(':');
    this.hours_now=+this.arr_time[0]+2;
    this.minutes_now=+this.arr_time[1];
    this.arr_date=this.date_n.split('-');
    this.day=+this.arr_date[2];
    this.month=+this.arr_date[1];
   // pdfMake.vfs=pdfFonts.pdfMake.vfs;
    console.log("kona hona "+this.MedicineList[0].medicine_category+" my hours "+this.hours_now+" my date "+this.date_n);
    for(this.i=0;this.i<this.MedicineList.length;this.i++){
    if(this.MedicineList[this.i].medicine_category==0){
      this.arr_date1= this.MedicineList[this.i].medicine__date;
      this.arr_time1=this.MedicineList[this.i].medicine_time;
      for(this.x=0;this.x<this.arr_date1.length&&this.x<this.arr_time1.length;this.x++){
        this.arr_time2=this.arr_time1[this.x].split(':');
        this.hr=+this.arr_time2[0];
        this.min=+this.arr_time2[1];
        this.arr_date2=this.arr_date1[this.x].split('-');
        this.D=+this.arr_date2[2];
        this.M=+this.arr_date2[1];
        console.log("month now "+this.month+" month med "+this.M+ "day now "+this.day+"day med "+this.D+"elder id is "+this.ElderID);
        if(this.month>this.M){ 

          this.expected=this.expected+1;
          this.afDatabase.object(`ElderData/`+this.ElderID+`/medicine_schedule/`+this.MedicineList[this.i].$key).update({expected:this.expected});
         
        }

      else if(this.month==this.M){ //else if el kbera
       if(this.day>this.D){ // if 1
        this.expected=this.expected+1;
        this.afDatabase.object(`ElderData/`+this.ElderID+`/medicine_schedule/`+this.MedicineList[this.i].$key).update({expected:this.expected});
      }//end 1
       else if(this.day==this.D ){//else if 1
          if(this.hours_now>=this.hr){
          this.expected=this.expected+1;
          this.afDatabase.object(`ElderData/`+this.ElderID+`/medicine_schedule/`+this.MedicineList[this.i].$key).update({expected:this.expected});
          console.log("exp"+this.MedicineList[this.i].$key);
          }
         }

       else if(this.hours_now==this.hr){ //if else el so8yra
        if(this.minutes_now>this.min){
        this.expected=this.expected+1;
          this.afDatabase.object(`ElderData/`+this.ElderID+`/medicine_schedule/`+this.MedicineList[this.i].$key).update({expected:this.expected});
         
        } } // end if else el so8yra
        // else{}

      }//end else if el kbera
        else{}
      }//end nested for
     }//end my if
    else {  //koky job   
      
      this.date1 = this.MedicineList[this.i].medicine_date.split('-');
      this.month1 = parseInt( this.date1[1]);
      this.day1=parseInt( this.date1[2]);
      this.dateNow2 = this.dateNow.split('-');
        this.monthNow2 = parseInt( this.dateNow2[1]);
        this.dayNow2=parseInt( this.dateNow2[2]);
        if (this.monthNow2 ==this.month1) {//1
         
          let subBetDays = this.dayNow2 - this.day1;
     
         this.expected = this.MedicineList[this.i].medicine_category * subBetDays;
          this.afDatabase.object(`ElderData/`+this.ElderID+`/medicine_schedule/`+this.MedicineList[this.i].$key).update({expected : this.expected});
          this.arr_time1=this.MedicineList[this.i].medicine_time;
          for(this.x=0;this.x<this.arr_time1.length;this.x++){
            this.arr_time2=this.arr_time1[this.x].split(':');
            this.hr=+this.arr_time2[0];
            this.min=+this.arr_time2[1];
            if(this.hours_now >this.hr) {
              this.expected=this.expected+1;
              this.afDatabase.object(`ElderData/`+this.ElderID+`/medicine_schedule/`+this.MedicineList[this.i].$key).update({expected:this.expected});
          }
          else  if(this.hours_now==this.hr && this.minutes_now>this.min){ 
            this.expected=this.expected+1;
            this.afDatabase.object(`ElderData/`+this.ElderID+`/medicine_schedule/`+this.MedicineList[this.i].$key).update({expected:this.expected});
           
          }else{}
        
        }
        console.log("expectedNumOfMed"+this.expected);
          console.log("actual"+ this.MedicineList[this.i].actual );
     }//1
          
            else if  (this.monthNow2 !=this.month1) {//2
          if  (this.day1 >=this.dayNow2) {
            let subBetMonths =this.monthNow2 -this.month1;
          let numOfdaysF5lalX4ahr =  subBetMonths* 30;
              let numOfdays =  this.day1-this.dayNow2;
           let  subBetDays = numOfdaysF5lalX4ahr -numOfdays;
         
          let expected_num_of_med = this.MedicineList[this.i].medicine_category * subBetDays;
          this.afDatabase.object(`ElderData/`+this.ElderID+`/medicine_schedule/`+this.MedicineList[this.i].$key).update({expected: this.expected});
           console.log("expectedNumOfMed"+this.expected);
           console.log("actual"+ this.MedicineList[this.i].actual);
           this.arr_time1=this.MedicineList[this.i].medicine_time;
           for(this.x=0;this.x<this.arr_time1.length;this.x++){
             this.arr_time2=this.arr_time1[this.x].split(':');
             this.hr=+this.arr_time2[0];
             this.min=+this.arr_time2[1];
             if(this.hours_now >this.hr) {
               this.expected=this.expected+1;
               this.afDatabase.object(`ElderData/`+this.ElderID+`/medicine_schedule/`+this.MedicineList[this.i].$key).update({expected:this.expected});
           }
           else  if(this.hours_now==this.hr && this.minutes_now>this.min){ 
             this.expected=this.expected+1;
             this.afDatabase.object(`ElderData/`+this.ElderID+`/medicine_schedule/`+this.MedicineList[this.i].$key).update({expected:this.expected});
            
           }
         }
          }
          else if (this.day1 <this.dayNow2) {
            let subBetMonths =this.monthNow2 -this.month1;
            let numOfdaysF5lalX4ahr =  subBetMonths* 30;
            let numOfdays =  this.dayNow2 -this.day1;
            let  subBetDays = numOfdaysF5lalX4ahr + numOfdays;
          
           this.expected = this.MedicineList[this.i].medicine_category * subBetDays;
            
            this.afDatabase.object(`ElderData/`+this.ElderID+`/medicine_schedule/`+this.MedicineList[this.i].$key).update({expected : this.expected});
            console.log("expectedNumOfMed"+this.expected);
            console.log("actual"+ this.MedicineList[this.i].actual);
          
            this.arr_time1=this.MedicineList[this.i].medicine_time;
            for(this.x=0;this.x<this.arr_time1.length;this.x++){
              this.arr_time2=this.arr_time1[this.x].split(':');
              this.hr=+this.arr_time2[0];
              this.min=+this.arr_time2[1];
              if(this.hours_now >this.hr) {
                this.expected=this.expected+1;
                this.afDatabase.object(`ElderData/`+this.ElderID+`/medicine_schedule/`+this.MedicineList[this.i].$key).update({expected:this.expected});
            }
            else  if(this.hours_now==this.hr && this.minutes_now>this.min){ 
              this.expected=this.expected+1;
              this.afDatabase.object(`ElderData/`+this.ElderID+`/medicine_schedule/`+this.MedicineList[this.i].$key).update({expected:this.expected});
            
            }else{}
          }}else{}
        }//2
          else{}    
}//end koky job
this.expected=0;
} //end for
this.MedicineRef = this.afDatabase.list(`ElderData/`+this.ElderID+`/medicine_schedule`);
this.MedicineRef.subscribe((Items)=>{
  this.Medicine_List=Items;
}) ;
    }
   
      Print() {
        var data = document.getElementById('contentToConvert');  
        html2canvas(data).then(canvas => {  
          // Few necessary setting options  
          var imgWidth = 500;   
          var pageHeight = 295;    
          var imgHeight = canvas.height * imgWidth / canvas.width;  
          var heightLeft = imgHeight;  
          const contentDataURL = canvas.toDataURL('image/png') 
          let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
          var position = 0;  
          pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
          pdf.save('MedicineReport.pdf'); // Generated PDF   
        });  
      }
    

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowReportPage');
  }
  
/*adem(){

console.log("koky"+ this.MedicineList[this.i].medicine_name);
    console.log("karin"+ this.MedicineList[this.i].medicine_date);
    this.date1 = this.MedicineList[this.i].medicine_date.split('-');
    this.month1 = parseInt( this.date1[1]);
    this.day1=parseInt( this.date1[2]);//fih yom el tasgil  
    console.log("bisho"+ this.dateNow );
    console.log("daybt3tasgil"+ this.day1 );
    this.dateNow2 = this.dateNow.split('-');
    this.monthNow2 = parseInt( this.dateNow2[1]);
    this.dayNow2=parseInt( this.dateNow2[2]);//fih yom el now
    console.log("daynw"+ this.dayNow2 );
    console.log("actual"+ this.MedicineList[this.i].actual);
    if (this.monthNow2 ==this.month1) {
      let subBetDays = this.dayNow2 - this.day1;
      this.expected = this.MedicineList[this.i].medicine_category * subBetDays;
      this.afDatabase.object(`ElderData/`+this.ElderID+`/medicine_schedule/`+this.MedicineList[this.i].$key).update({expected:this.expected});
      console.log("expectedNumOfMed"+this.expected);
      console.log("actual"+ this.MedicineList[this.i].actual);
      
    }  else if  (this.monthNow2 !=this.month1) {
      if  (this.day1 >= this.dayNow2) {
        let subBetMonths =this.monthNow2 -this.month1;
      let numOfdaysF5lalX4ahr =  subBetMonths* 30;
          let numOfdays =  this.day1-this.dayNow2;
       let  subBetDays = numOfdaysF5lalX4ahr -numOfdays;
      //let  subBetDays2= subBetDays + 1;
     this.expected= this.MedicineList[this.i].medicine_category * subBetDays;
      this.afDatabase.object(`ElderData/`+this.ElderID+`/medicine_schedule/`+this.MedicineList[this.i].$key).update({expected:this.expected});
       console.log("expectedNumOfMed"+this.expected);
       console.log("actual"+ this.MedicineList[this.i].actual);
      }
      else if (this.day1 <this.dayNow2) {
        let subBetMonths =this.monthNow2 -this.month1;
        let numOfdaysF5lalX4ahr =  subBetMonths* 30;
        let numOfdays =  this.dayNow2 -this.day1;
        let  subBetDays = numOfdaysF5lalX4ahr + numOfdays;
        //let  subBetDays2= subBetDays + 1;
      this. expected = this.MedicineList[this.i].medicine_category * subBetDays;
        
        this.afDatabase.object(`ElderData/`+this.ElderID+`/medicine_schedule/`+this.MedicineList[this.i].$key).update({expected: this.expected});
        console.log("expectedNumOfMed"+this.expected);
        console.log("actual"+ this.MedicineList[this.i].actual );
      }
      else { console.log("");}
                 
    }
    else {console.log("");}



}*/

}
