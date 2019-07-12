import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowReportPage } from './show-report';
import * as jspdf from 'jspdf';   
import html2canvas from 'html2canvas';  
@NgModule({
  declarations: [
    ShowReportPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowReportPage),
  ],
})
export class ShowReportPageModule {}
