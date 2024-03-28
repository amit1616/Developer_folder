import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
   
@Component({
  selector: 'app-application-review',
  templateUrl: './application-review.component.html',
  styleUrl: './application-review.component.css'
})
export class ApplicationReviewComponent implements OnInit{
  title = 'datatables';
  dtOptions: DataTables.Settings = {};
  posts: any;
  
  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
  
    this.http.get('http://jsonplaceholder.typicode.com/posts')
      .subscribe(posts => {
        this.posts = posts;
    });
  
  }
  
}
