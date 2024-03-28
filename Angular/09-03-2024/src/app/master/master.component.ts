import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrl: './master.component.css'
})
export class MasterComponent {



  router: any;


  constructor(private http: HttpClient) { }


  onSubmit(data: any) {
    console.warn(data);
    this.http.post('http://localhost:3000/masters', data)
      .subscribe((result) => {
        console.warn("result", result);
        this.goToMasterList();
      },

      )
  }

  goToMasterList() {
    this.router.navigate(['/MasterList']);
  }
}
