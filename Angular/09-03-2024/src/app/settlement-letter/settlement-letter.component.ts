import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';


export interface settlement {
  ContractNo: string;
  doc: Date;
}

@Component({
  selector: 'app-settlement-letter',
  templateUrl: './settlement-letter.component.html',
  styleUrl: './settlement-letter.component.css'
})
export class SettlementLetterComponent {

  router: any;

  private url = 'https://my-json-server.typicode.com/JSGund/XHR-Fetch-Request-JavaScript/posts';

  constructor(private http: HttpClient) { }


  onSubmit(data: any) {
    console.warn(data);
    this.http.get<settlement>('http://localhost:3000/masters', data)
      .subscribe((result) => {
        console.warn("result", result);

      },

      )
  }

}



