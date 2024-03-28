import { Component, OnInit } from '@angular/core';
import { RequestInitationService } from '../request-initation.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrl: './feedback-form.component.css'
})

export class FeedbackFormComponent {
  feedbackForm!: FormGroup;
  FirstFormData: any;
  formLength = 0;
  ContractNO = [];
  message: string[] = [];
  feedbackData: any;

  panelOpenState = false;

  isLinear = false;
  numbers: number[] = [];
  currentformarray: string[] = [];
  ngModel: any;

  EnabledVehicleCondition=false;
  EnabledReasonForNRepo=false;

  constructor(private shared: RequestInitationService, private router: Router,private _formBuilder: FormBuilder,private http: HttpClient,) {
    this.createForm();
  }

  createForm() {
    this.feedbackForm = new FormGroup({
      InsertFeedbackDetailsResponse: new FormArray([
        new FormGroup({
          CustName: new FormControl(''),
          VehicleRegNo: new FormControl(''),
          VehicleModel: new FormControl(''),
          ProposedDate: new FormControl(''),
          SettleingContract: new FormControl(''),
          nameVisitedCust: new FormControl(''),
          TeleMobNumb: new FormControl(''),
          VehicleCondition: new FormControl(''),
          MetCustomer: new FormControl(''),
          MetGuarantor: new FormControl('',Validators.required),
          VehicleAvailable: new FormControl(''),
          ReasonForNotRepossessing: new FormControl(''),  //{value:'',disabled: false}
          PersonMetCustFromTMF: new FormControl(''),
          Designation: new FormControl(''),
          EmployeeOf: new FormControl(''),
          MobileNumber: new FormControl(''),
        })
      ])
    })
  }
  ngOnInit() {

    this.message = this.shared.getMessage();
    console.log(this.shared.getMessage());
    console.log("FEEDBACK AUTO POPULATION DATA IS" + this.shared.getFeedbackData());
    //  let FeedbackAutoPopulate = JSON.parse(this.shared.getFeedbackData);
    let abc = JSON.stringify(this.shared.getFeedbackData());
    this.feedbackData = JSON.parse(this.shared.getFeedbackData());
    // console.log("sadsaddsaasdads"+this.feedbackData[1].con_no);


    this.formLength = Math.ceil(this.message.length / 4);
    const control = <FormArray>this.feedbackForm.controls['InsertFeedbackDetailsResponse'];
    //  this.numbers = Array(this.formLength).fill(4); // [4,4,4,4,4]'[1,2,3,4]
    for (let i = 0; i <= this.message.length; i = i + 4) {
      this.numbers.push(i);
      console.log(i);
      console.log("numbers " + this.message.slice(i, i + 4));
    }
    console.log("final numbers is" + this.numbers);

    for (let i = 0; i < this.message.length-1; i++) {
      control.push(
        new FormGroup({
          CustName: new FormControl(''),
          VehicleRegNo: new FormControl(''),
          VehicleModel: new FormControl(''),
          ProposedDate: new FormControl(''),
          SettleingContract: new FormControl(''),
          nameVisitedCust: new FormControl(''),
          TeleMobNumb: new FormControl(''),
          VehicleCondition: new FormControl(''),
          MetCustomer: new FormControl(''),
          MetGuarantor: new FormControl(''),
          VehicleAvailable: new FormControl(''),
          ReasonForNotRepossessing: new FormControl(''),
          PersonMetCustFromTMF: new FormControl(''),
          Designation: new FormControl(''),
          EmployeeOf: new FormControl(''),
          MobileNumber: new FormControl(''),
        })
      );
    }

    this.CopyTOAll();
    // this.formLength=this.message.length;
   
  }

   DisableQ(){
     alert("Question alert");
     this.feedbackForm.controls['InsertFeedbackDetailsResponse'].get('VehicleCondition')?.disable();
     alert("Question alert2");
     //this.feedbackForm.controls['InsertFeedbackDetailsResponse'].get('VehicleCondition')?.disable();
   }

  FeedbackSubmit() {
    const data = this.feedbackForm.value;
    console.log("response data is " + JSON.stringify(data));
    console.log("Length" + data.InsertFeedbackDetailsResponse.length);
    let count = 0;
    let CustMetCount = 0;
    for (let i = 0; i < data.InsertFeedbackDetailsResponse.length-1; i++) {

      if (data.InsertFeedbackDetailsResponse[i].SettleingContract == "" || data.InsertFeedbackDetailsResponse[i].nameVisitedCust == "" ||
        data.InsertFeedbackDetailsResponse[i].TeleMobNumb == "" || data.InsertFeedbackDetailsResponse[i].VehicleCondition == "" ||
        data.InsertFeedbackDetailsResponse[i].MetCustomer == "" || data.InsertFeedbackDetailsResponse[i].MetGuarantor == "" ||
        data.InsertFeedbackDetailsResponse[i].VehicleAvailable == "" || data.InsertFeedbackDetailsResponse[i].ReasonForNotRepossessing == "" ||
        data.InsertFeedbackDetailsResponse[i].PersonMetCustFromTMF == "" || data.InsertFeedbackDetailsResponse[i].Designation == "" ||
        data.InsertFeedbackDetailsResponse[i].EmployeeOf == "" || data.InsertFeedbackDetailsResponse[i].MobileNumber == "") {
        count++;
          //alert("Count is"+count);
      } 
    }
    if(count>0){
    alert("Some Data Missing,Please make sure to fill all the Data.");
    }else{
    //alert("All Data Properly filled");
    
    for (let i = 0; i < data.InsertFeedbackDetailsResponse.length-1; i++) {
      if (data.InsertFeedbackDetailsResponse[i].MetCustomer == "No") {
            CustMetCount++;
           } 
    }

    if(CustMetCount>0){
alert("Visit required and settlement cannot be raised. Further action not allowed");
    }else{


      this.FeedbackInsertion();



      //http://localhost:8080/TwaFetchApiFeedback2/feedbackcontroller2


    }
  
  }
      // console.log("Index" + i);
      // if (count > 0) {
      //   console.log("Count is " + count);
      //   alert("Some Data is Missing,Please Make sure to Fill all the Feedback Data.");
      // } else {
      //   if (data.InsertFeedbackDetailsResponse[i].MetCustomer == "No") {
      //     alert("Blah blah blah");
      //   } else {
      //     this.router.navigate('/RequestForm');
      //   }
      // }
   

  }

  FeedbackInsertion(){
    const body = this.feedbackForm.value;
    console.log("Welcome here");
    this.http.post("http://localhost:8080/TwaFetchApiFeedback2/feedbackcontroller2", body).subscribe((response: any) => {
  
      console.log(response);
  
      alert(response.status);
      this.router.navigate(['/RequestForm']);
    });
  }

  CopyTOAll() {
    const data = this.feedbackForm.value;
    console.log("Type of" +  data);
    console.log(data.InsertFeedbackDetailsResponse[0]);
    this.FirstFormData = data.InsertFeedbackDetailsResponse[0];
    console.log("First Name" + this.FirstFormData.CustName);
    console.log("Nikhil TCS helloresponse data is " + JSON.stringify(data));
  }
}
