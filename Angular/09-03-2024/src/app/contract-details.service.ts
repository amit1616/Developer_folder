import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractDetailsService {

  constructor(private http: HttpClient) { }

  // http://localhost:/TwaFetchApiFeedback1/feedbackcontroller
   async getContractDetails(contractNo: string): Promise<Observable<any>> {
    const url = 'https://uatcrs.tmf.co.in:8096/api/LakshmiContractInfo/GetContractDetails';
    return this.http.post<any>(url, { ContractNo: contractNo });
  }


  getterminationfetchData(requestData: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/TwaConsolidatedAPI/ConsolidatedAPIController', requestData);
  }

}
