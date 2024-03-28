import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validator, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, timer } from 'rxjs';
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { RequestInitationService } from '../request-initation.service';

export interface PeriodicElement {
  ContractNo: string;
  od_amt:string;
  od_num:string;
  original_cust_name:string;
  vehicle_model:string;
  vehicle_reg_no:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
 ];


//  {ContractNo:"5003253358",od_amt:"1",od_num:"2",original_cust_name:"nikhil",vehicle_model:"tata",vehicle_reg_no:"1212132"},
//  {ContractNo:"5003253360",od_amt:"1",od_num:"2",original_cust_name:"nikhil",vehicle_model:"tata",vehicle_reg_no:"1212132"},
//  {ContractNo:"5003253362",od_amt:"1",od_num:"2",original_cust_name:"nikhil",vehicle_model:"tata",vehicle_reg_no:"1212132"},
//  {ContractNo:"5003253364",od_amt:"1",od_num:"2",original_cust_name:"nikhil",vehicle_model:"tata",vehicle_reg_no:"1212132"},
//  {ContractNo:"5003253366",od_amt:"1",od_num:"2",original_cust_name:"nikhil",vehicle_model:"tata",vehicle_reg_no:"1212132"},
//  {ContractNo:"5003253368",od_amt:"1",od_num:"2",original_cust_name:"nikhil",vehicle_model:"tata",vehicle_reg_no:"1212132"},
//  {ContractNo:"5003253370",od_amt:"1",od_num:"2",original_cust_name:"nikhil",vehicle_model:"tata",vehicle_reg_no:"1212132"},
//  {ContractNo:"5003253372",od_amt:"1",od_num:"2",original_cust_name:"nikhil",vehicle_model:"tata",vehicle_reg_no:"1212132"},

/**
 * @title Table with selection
 */

@Component({
  selector: 'app-request-initation',
  templateUrl: './request-initation.component.html',
  styleUrl: './request-initation.component.css'
})

export class RequestInitationComponent {


  minDate: Date;
  maxDate: Date;
message: string[]=[];
feedbackData: string="";

  constructor(private router: Router,private formBuilder: FormBuilder, private http: HttpClient, private _snackBar: MatSnackBar, private shared : RequestInitationService) {
    const currentYear = new Date().getFullYear();
    const currentdate = new Date().getDate();
    this.minDate = new Date(Date());
    this.maxDate = new Date(currentYear + 0, 0, currentdate+121);
   }

  RequestForm = this.formBuilder.group({
    Wavier_flag: ["", Validators.required],
    Contract_no: [""],
    Bp_no: [""],
    Group_code: [""],
    Pr_date: ["", Validators.required]
  });



  isShowDiv = true;
  isShowSpin = true;


  displayedColumns: string[] = [
    'select',
    'ContractNo',
    'od_amt',
    'od_num',
    'original_cust_name',
    'vehicle_model',
    'vehicle_reg_no'
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  RequestInit() {
    if (this.RequestForm.value.Wavier_flag === "" && this.RequestForm.value.Pr_date === "") {
      this._snackBar.open("Please select the Mandatory Value", "Close", { duration: 3000, horizontalPosition: "end", verticalPosition: "bottom", panelClass: 'my-custom-snackbar' });
    }
    else if (this.RequestForm.value.Wavier_flag === "") {
      this._snackBar.open("Please select Wavier or Non-Wavier", "Close", { duration: 3000, panelClass: 'my-custom-snackbar' });
    }
      else if(this.RequestForm.value.Pr_date===""){
          this._snackBar.open("Please select Proposed Recovery Date", "Close",{duration:3000,panelClass: 'my-custom-snackbar'});
        }
   // else if(this.RequestForm.value.Bp_name==="" || this.RequestForm.value.Contract_no==="" || this.RequestForm.value.Group_code===""){
    //  this._snackBar.open("Please enter BP number, Contract Number or Group Code", "Close",{duration:3000,panelClass: 'my-custom-snackbar'});
    //}
    else {
      this.isShowSpin = !this.isShowSpin;
      console.log("Request initiation form data", this.RequestForm.value);
      const Apirequest = this.RequestForm.value;
      console.log("API REQUEST"+JSON.stringify(Apirequest));
      let responseString;
      const body = { title: 'Angular Post', content: 'Sending data to API' };
      this.http.post('http://localhost:8080/TwaFetchApiN/controller', Apirequest).subscribe(data => {
        console.log("main response" + JSON.stringify(data));
        responseString = JSON.stringify(data);
        console.log("nikhil" + responseString);
//2003172841
//2002959548
//OMSWACHATA
        //const resposne = { "contract_no": "5003253358,5003253360,5003253362,5003253364,5003253366,5003253368,5003253370,5003253372,5003253374,5003638177,5003638187,5003638193" };
        const response=JSON.parse(responseString);

        for(let i=0;i<response.length;i++){
          console.log(i);
          ELEMENT_DATA.push({
            ContractNo:response[i].contract_no,od_amt:response[i].od_amt,od_num:response[i].od_num,original_cust_name:response[i].original_cust_name,vehicle_model:response[i].vehicle_model,vehicle_reg_no:response[i].vehicle_reg_no});
        }
        this.dataSource =new MatTableDataSource(ELEMENT_DATA);
        console.log("final response of new response"+response);


        this.isShowDiv = !this.isShowDiv;
        this.isShowSpin = !this.isShowSpin;

      });


    }
    //move this to one loop above
   

  }

  abc() {
    this.isShowSpin = !this.isShowSpin;
    console.log(this.selection.selected);
    const SelectedContract = this.selection.selected;
    const finalSelection = [];
    for(let i=0;i<SelectedContract.length;i++){
      finalSelection.push(SelectedContract[i].ContractNo);
    }
    console.log("final selection is"+finalSelection);
    this.shared.setMessage(finalSelection);
    const Apirequest=finalSelection;
    let Apirequest1={};
    let responseString: string="A";
    // for(let i=0;i<finalSelection.length;i++){
    //   console.log("concatination"+finalSelection[i]);
      Apirequest1={Contract_no: finalSelection.toString()}
    //}
    console.log("APi request in string  Apirequest1"+Apirequest1);

    // API call       http://localhost:8080/TwaFetchApiN/controller'
    const body = { title: 'Angular Post', content: 'Sending data to API' };
      this.http.post('http://localhost:8080/TwaFetchApiFeedback1/feedbackcontroller', Apirequest1,{
        headers:{
          'Content-Type': 'application/json'
        }
      }).subscribe(data => {
        console.log("main response" + JSON.stringify(data));
        responseString = JSON.stringify(data);
        console.log("nikhil" + responseString);
        this.shared.setFeedbackData(responseString);
     });

    // let FeedbackAuto1=JSON.parse(responseString);

    
     
     timer(10000).subscribe(i=>{this.router.navigate(['/FeedbackForm']);})
    
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    
  }



}
