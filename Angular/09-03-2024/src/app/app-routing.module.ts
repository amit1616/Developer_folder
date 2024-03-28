import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestInitationComponent } from './request-initation/request-initation.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { SettlementLetterComponent } from './settlement-letter/settlement-letter.component';
import { UploadComponent } from './upload/upload.component';
import { MasterComponent } from './master/master.component';
import { AdminComponent } from './admin/admin.component';
import { ReportsComponent } from './reports/reports.component';
import { ApplicationReviewComponent } from './application-review/application-review.component';
import { RequestHistoryComponent } from './request-history/request-history.component';
import { ApprovalComponent } from './approval/approval.component';


const routes: Routes = [
  {path:'RequestInitation', component:RequestInitationComponent},
  {path:'FeedbackForm', component:FeedbackFormComponent},
  {path:'RequestForm', component:RequestFormComponent},
  {path:'SettlementLetter', component:SettlementLetterComponent},
  {path:'Upload', component:UploadComponent},
  {path:'Master', component:MasterComponent},
  {path:'Admin', component:AdminComponent},
  {path:'Reports', component:ReportsComponent},
  {path:'ApplicationReview', component:ApplicationReviewComponent},
  {path:'RequestHistory', component:RequestHistoryComponent},
  {path: 'approval', component: ApprovalComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
