import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferServiceService {

  proposedRecoveryAmount: number = 0; // Initialize the property with a default value
  // proposedRecoveryAmount!: number; // Add '!' to indicate definite assignment

  constructor() { }
}
