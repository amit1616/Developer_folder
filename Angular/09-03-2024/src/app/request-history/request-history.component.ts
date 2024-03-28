import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-history',
  templateUrl: './request-history.component.html',
  styleUrl: './request-history.component.css'
})
export class RequestHistoryComponent implements OnInit{
  title = 'datatables';
  dtOptions: DataTables.Settings = {};
  posts: any;
  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      ordering: false
    };
  }

  isShowDiv = true;

  ShowHistory(){
    this.isShowDiv = !this.isShowDiv;
  }
}
