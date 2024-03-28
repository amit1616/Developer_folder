import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestInitationService {


  message: string[]=[];
  feedbackData: string="";

  constructor() {
  }

  setMessage(data: string[]){
    this.message= data;
  }

  getMessage(){
return this.message;
  }


  setFeedbackData(data:string){
    this.feedbackData=data;
  }

  getFeedbackData(){
    return this.feedbackData;
  }
}
