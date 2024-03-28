import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { RequestInitationService } from '../request-initation.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

  selectedData:any;

  isShowDiv = false;

toggleDisplayDiv() {

  this.isShowDiv = !this.isShowDiv;
}
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;

  message: string[] =[];

  csvInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
  }
  constructor(private shared : RequestInitationService){
  }

  ngOnInit(): void {
    this.message = this.shared.getMessage();
    console.log(" REqeust form data is"+this.message);

  }
}
