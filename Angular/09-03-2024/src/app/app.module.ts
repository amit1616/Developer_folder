import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RequestInitationComponent } from './request-initation/request-initation.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import {MatStepperModule} from '@angular/material/stepper';
import { RequestFormComponent } from './request-form/request-form.component';
import {MatTabsModule} from '@angular/material/tabs';
import { SettlementLetterComponent } from './settlement-letter/settlement-letter.component';
import { UploadComponent } from './upload/upload.component';
import { MasterComponent } from './master/master.component';
import { AdminComponent } from './admin/admin.component';
import { ReportsComponent } from './reports/reports.component';
import { ApplicationReviewComponent } from './application-review/application-review.component';
import { DataTablesModule } from 'angular-datatables';
import { RequestHistoryComponent } from './request-history/request-history.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ContractViewComponent } from './contract-view/contract-view.component';
import { ApprovalComponent } from './approval/approval.component';

@NgModule({
  declarations: [
    AppComponent,
    RequestInitationComponent,
    FeedbackFormComponent,
    RequestFormComponent,
    SettlementLetterComponent,
    UploadComponent,
    MasterComponent,
    AdminComponent,
    ReportsComponent,
    ApplicationReviewComponent,
    RequestHistoryComponent,
    ContractViewComponent,
    ApprovalComponent
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    CommonModule,
    RouterOutlet,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatStepperModule,
    MatTabsModule,BrowserModule, FormsModule, BrowserAnimationsModule,DataTablesModule,MatRadioModule,MatDialogModule,
  ],
  providers: [
    provideClientHydration(),
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
