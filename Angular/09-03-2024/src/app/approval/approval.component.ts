
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrl: './approval.component.css'
})
export class ApprovalComponent {

  formGroups: FormGroup[] = []; // Array to hold form groups

  items = [
    {
      contractNo: '5003042708',
      hirerName: 'SVT LOGISTICS PRIVATE LIMITED c/o',
      model: 'SIGNA 4018',
      vehicleStatus: 'Repossessed',
      seasoning: '',
      contractValue: '2234820',
      odc: '1702790.67',
      pmt: '0',
      expenses: '0',
      totalDue: '3937610.67',
      proposedRecovery: '50000',
      waiver: '3887610.67',
      provisionAmt: '',
      netLoss: '3887610.67',
      avgSalesPrice: '',
      techWO: '',
      restructured: '',
      finalAppAuth: 'Chief Collection Officer'
    },
    {
      contractNo: '5003042708',
      hirerName: 'SVT LOGISTICS PRIVATE LIMITED c/o',
      model: 'SIGNA 4018',
      vehicleStatus: 'Repossessed',
      seasoning: '',
      contractValue: '2234820',
      odc: '1702790.67',
      pmt: '0',
      expenses: '0',
      totalDue: '3937610.67',
      proposedRecovery: '50000',
      waiver: '3887610.67',
      provisionAmt: '',
      netLoss: '3887610.67',
      avgSalesPrice: '',
      techWO: '',
      restructured: '',
      finalAppAuth: 'Chief Collection Officer'
    }
    // Add more items similarly
  ];

  tableData = [
    { 
      sanctioningAuthority: 'Authority 1',
      contractNumber: '12345',
      userID: 'user123',
      userName: 'John Doe',
      creditDesignation: 'Manager',
      equivalentAuthority: 'Equivalent Authority 1',
      attachment: 'Attachment 1'
    },
    { 
      sanctioningAuthority: 'Authority 2',
      contractNumber: '67890',
      userID: 'user456',
      userName: 'Jane Smith',
      creditDesignation: 'Supervisor',
      equivalentAuthority: 'Equivalent Authority 2',
      attachment: 'Attachment 2'
    }
    // Add more data objects as needed
  ];

  form!: FormGroup; // Mark as definitely assigned
  formGroup: FormGroup; // Define your form group property here
  contractDetails: any;
  tableRows: any[] = [];
  isShowDiv = true;
  isShowSpin = true;
  formGroupArray: FormGroup[] = [];
  minDate: Date;
  maxDate: Date;
  TypefileForm: FormGroup;
  // formGroups: FormGroup[];

  // Define column headers
  columns = ['ID', 'Name', 'Age'];

 
  constructor(private datePipe: DatePipe, private formBuilder: FormBuilder,private fb: FormBuilder) {

    const currentYear = new Date().getFullYear();
    const currentdate = new Date().getDate();
    this.minDate = new Date(Date());
    this.maxDate = new Date(currentYear + 0, 0, currentdate + 121);

    this.TypefileForm = this.fb.group({
      suppdoc: ['', [Validators.required, this.fileFormatValidator]], // Add validators for file selection
    });

    this.formGroup = new FormGroup({
      // Define your form controls here
    });

    this.formGroups = [this.createFormGroup()];

  }

  ngOnInit() {

    this.TypefileForm = this.formBuilder.group({
      suppdoc: ['', Validators.required] // Add any other validators as needed
    });

    this.addDiv();
  }

  //    // Custom validator function for file format
     fileFormatValidator(allowedFormats: string[]) {
      return (control: any) => {
        if (control.value) {
          const fileExtension = control.value.split('.').pop().toLowerCase();
          if (!allowedFormats.includes(fileExtension)) {
            return { invalidFormat: true };
          }
        }
        return null;
      };
    }
  
    addDiv(): void {
      const formGroup = this.createTypefileForm();
      this.formGroups.push(formGroup);
    }
  
    createTypefileForm(): FormGroup {
      return this.formBuilder.group({
        suppdoc: ['', Validators.required] // Add any other validators as needed
      });
    }
  
    validateFile(event: Event, index: number): void {
      const inputElement = event.target as HTMLInputElement;
      const files = inputElement.files;
      if (files && files.length > 0) {
        const file = files[0];
        const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedFileTypes.includes(file.type)) {
          this.formGroups[index].get('suppdoc')?.setErrors({ 'invalidFormat': true });
        } else {
          this.formGroups[index].get('suppdoc')?.setErrors(null);
        }
      }
    }
  
    deleteTypeField(index: number): void {
      this.formGroups.splice(index, 1);
    }
  

  onTypeSubmit() {
    if (this.TypefileForm.valid) {
    } else {
    }
  }

  onFileSelected(event: any, index: number): void {
    const file = event.target.files[0];
    const fileType = file.type;
    const validFormats = ['image/jpeg', 'image/jpg', 'image/png'];
  
    const control = this.formGroups[index].get('suppdoc');
    if (control) {
      if (!validFormats.includes(fileType)) {
        control.setErrors({ invalidFormat: true });
      } else {
        control.setValue(file);
      }
    }
  }
  

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      type: ['', Validators.required],
      suppdoc: [null, Validators.required]
    });
  }



  submitbutton() {

  }

}
