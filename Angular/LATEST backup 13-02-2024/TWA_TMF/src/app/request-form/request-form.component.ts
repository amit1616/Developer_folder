import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { RequestInitationService } from '../request-initation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { PeriodicElement } from '../request-initation/request-initation.component';

const ELEMENT_DATA: PeriodicElement[] = [
  {ContractNo:"1234512307",od_amt:"1",od_num:"2",original_cust_name:"Ram",vehicle_model:"tata",vehicle_reg_no:"123456",},
  {ContractNo:"1234512307",od_amt:"1",od_num:"2",original_cust_name:"Ram",vehicle_model:"tata",vehicle_reg_no:"123456",},
  {ContractNo:"1234512307",od_amt:"1",od_num:"2",original_cust_name:"Ram",vehicle_model:"tata",vehicle_reg_no:"123456",},
  {ContractNo:"1234512307",od_amt:"1",od_num:"2",original_cust_name:"Ram",vehicle_model:"tata",vehicle_reg_no:"123456",},
  {ContractNo:"1234512307",od_amt:"1",od_num:"2",original_cust_name:"Ram",vehicle_model:"tata",vehicle_reg_no:"123456",},
  {ContractNo:"1234512307",od_amt:"1",od_num:"2",original_cust_name:"Ram",vehicle_model:"tata",vehicle_reg_no:"123456",},
  {ContractNo:"1234512307",od_amt:"1",od_num:"2",original_cust_name:"Ram",vehicle_model:"tata",vehicle_reg_no:"123456",},
  {ContractNo:"1234512307",od_amt:"1",od_num:"2",original_cust_name:"Ram",vehicle_model:"tata",vehicle_reg_no:"123456",}
];

interface Person {
  id: number;
  name: string;
  age: number;
}

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrl: './request-form.component.css'
})
export class RequestFormComponent {
// Use the defined interface for your data array
data: Person[] = [
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Jane', age: 25 },
  { id: 3, name: 'Doe', age: 40 }
];
columns: string[] = [];

selectedColumn: string | null = null;

  collateralDataAvailable: boolean = false;

  selectedTdIndex: number | null = null; // Variable to store the index of the selected td element
  selectTd(index: number) {
    this.selectedTdIndex = index;
  }
  selectedData: string | null = null; // Variable to store the selected data

  hoveredIndex: number | null = null;
  tabIndex = 0;
  activeTab: number = 0; // Default selected tab index
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
  constructor(private shared : RequestInitationService,private router: Router,
    private route: ActivatedRoute,){
      if (this.data.length > 0) {
        // Use Object.keys() to get column names from the first item in the data array
        this.columns = Object.keys(this.data[0]);
      }
  }
  
  displayedColumns: string[] = [
    'ContractNo',
  ];

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);


  ngOnInit(): void {
    this.message = this.shared.getMessage();
    console.log(" REqeust form data is"+this.message);
    window.scrollTo(0, 0);
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }
  onTabChange(event: any) {
    console.log('Selected tab index:', event.index);
  }
}

