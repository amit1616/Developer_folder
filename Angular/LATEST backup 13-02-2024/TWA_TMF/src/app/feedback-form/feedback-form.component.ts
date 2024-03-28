import { Component, OnInit } from '@angular/core';
import { RequestInitationService } from '../request-initation.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrl: './feedback-form.component.css'
})

export class FeedbackFormComponent {
  feedbackForm!: FormGroup;

  formLength=0;

  ContractNO =[];
  message: string[]=[];
  feedbackData:any;

  panelOpenState = false;
  router: any;

  isLinear = false;
  numbers: number[] = [];
currentformarray: string[]=[];

constructor(private shared : RequestInitationService,private _formBuilder: FormBuilder){
this.createForm();
}

createForm(){

  this.feedbackForm = new FormGroup({
   FeedbackDetails:new FormArray([
    //   new FormGroup({
    //   CustName: new FormControl(''),
    //   VehicleRegNo: new FormControl(''),
    //   VehicleModel: new FormControl(''),
    //   ProposedDate: new FormControl(''),
    //   SettleingContract: new FormControl(''),
    //   nameVisitedCust: new FormControl(''),
    //   TeleMobNumb: new FormControl(''),
    //   VehicleCondition: new FormControl(''),
    //   MetCustomer: new FormControl(''),
    //   MetGuarantor: new FormControl(''),
    //   VehicleAvailable: new FormControl(''),
    //   ReasonForNotRepossessing: new FormControl(''),
    //   PersonMetCustFromTMF: new FormControl(''),
    //   Designation: new FormControl(''),
    //   EmployeeOf: new FormControl(''),
    //   MobileNumber: new FormControl(''),

    // })
   ])
  })
}
  ngOnInit() {

    this.message = this.shared.getMessage();
    console.log(this.shared.getMessage());
    console.log("FEEDBACK AUTO POPULATION DATA IS"+this.shared.getFeedbackData());
  //  let FeedbackAutoPopulate = JSON.parse(this.shared.getFeedbackData);
    let abc =JSON.stringify(this.shared.getFeedbackData());
    this.feedbackData=JSON.parse(this.shared.getFeedbackData());
   // console.log("sadsaddsaasdads"+this.feedbackData[1].con_no);


    this.formLength=Math.ceil(this.message.length/4);
const control =<FormArray>this.feedbackForm.controls['FeedbackDetails'];
  //  this.numbers = Array(this.formLength).fill(4); // [4,4,4,4,4]'[1,2,3,4]
    for(let i=0;i<=this.message.length;i=i+4){
      this.numbers.push(i);
      console.log(i);

      console.log("numbers "+this.message.slice(i,i+4));

    }
    console.log("final numbers is"+this.numbers);

    for(let i=0;i<this.message.length;i++){
      control.push(
        new FormGroup({
          CustName: new FormControl('') ,
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
   // this.formLength=this.message.length;
    }


    FeedbackSubmit(){
    const data = this.feedbackForm.value;
    console.log("response data is "+JSON.stringify(data));
    this.router.navigate('/RequestForm');
    }

    fetchNextData(){

    }

}
