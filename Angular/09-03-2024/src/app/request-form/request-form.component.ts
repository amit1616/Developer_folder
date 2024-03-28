import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { RequestInitationService } from '../request-initation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { PeriodicElement } from '../request-initation/request-initation.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ContractDetailsService } from '../contract-details.service';
import { DatePipe } from '@angular/common';


const ELEMENT_DATA: PeriodicElement[] = [
  { ContractNo: "1234512307", od_amt: "1", od_num: "2", original_cust_name: "Ram", vehicle_model: "tata", vehicle_reg_no: "123456", },
  { ContractNo: "1234512307", od_amt: "1", od_num: "2", original_cust_name: "Ram", vehicle_model: "tata", vehicle_reg_no: "123456", },
  { ContractNo: "1234512307", od_amt: "1", od_num: "2", original_cust_name: "Ram", vehicle_model: "tata", vehicle_reg_no: "123456", },
  { ContractNo: "1234512307", od_amt: "1", od_num: "2", original_cust_name: "Ram", vehicle_model: "tata", vehicle_reg_no: "123456", },
  { ContractNo: "1234512307", od_amt: "1", od_num: "2", original_cust_name: "Ram", vehicle_model: "tata", vehicle_reg_no: "123456", },
  { ContractNo: "1234512307", od_amt: "1", od_num: "2", original_cust_name: "Ram", vehicle_model: "tata", vehicle_reg_no: "123456", },
  { ContractNo: "1234512307", od_amt: "1", od_num: "2", original_cust_name: "Ram", vehicle_model: "tata", vehicle_reg_no: "123456", },
  { ContractNo: "1234512307", od_amt: "1", od_num: "2", original_cust_name: "Ram", vehicle_model: "tata", vehicle_reg_no: "123456", }
];

interface Person {
  id: number;
  name: string;
  age: number;
}

export interface ApiResponse {
  ZCIS_SAP_PI_DETAILS: any[];
  COLLATERAL_DETAILS: any[];
  ZTERMINATION_DUES_DETAILS: any[];
  NYAYLAKSHMI_DETAILS: any[];
  DATALAKE_AND_LOCALDB_DETAILS: any[];
  LAKSHMI_DETAILS: any[];
}

interface CollateralDetail {
  vendor_NAME: string;
  initiator_BRANCH: string;
  collateral_TYPE: string;
  fan_NUMBER: string;
  purpose_NAME: string;
  amount: string;
  expiry_DATE: string;
  additional_DETAILS: string;
  owner_NAME: string;
  request_NUMBER: string;
  bp_NUMBER: string;
  // Add more properties as needed
}

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrl: './request-form.component.css'
})
export class RequestFormComponent {

  terminationDuesDetails: any[] = []; // Ensure it's initialized as an empty array
  apiResponse: ApiResponse | null = null;
  // COLLATERAL_DETAILS: CollateralDetail[] = [];
  COLLATERAL_DETAILS: any[] = [];

  nyaylakshmiDetails: any[] = [];
  lakshmiDetails: any[] = [];
  partnerData:any[] = []
  form: FormGroup;
  showDeleteButton = false;

  // form!: FormGroup; // Mark as definitely assigned
  divData: any[] = []; // Initialize with any initial data
  formGroups: FormGroup[] = [];
  items: any[] = [];
  TypefileForm: FormGroup;
  records: any[] = []; // Your data array
  formGroup: FormGroup; // Define your form group property here
  contractDetails: any;
  ApprovalMatrix: FormGroup;
  tableRows: any[] = [];
  sanfileForm: FormGroup;
  isShowDiv = true;
  isShowSpin = true;
  formGroupArray: FormGroup[] = [];

  requestForm: FormGroup;
  dataArray: any[] = []; // Array to store API response data
  detailForm: FormGroup;
  pddForm!: FormGroup;
  partnerForm!: FormGroup;
  contractForm!: FormGroup;
  analyticsForm!: FormGroup;
  formattedStartDate: string;
  formattedEndDate: string;
  groupexposureForm: FormGroup;
  mfgYearDate: string;
  disclaimerChecked: boolean = false;
  collateralRemarks: string = '';
  OtherLoanType: string = '';

  contact = {
    firstName: 'Harry',
    lastName: 'Potter',
    contacts: [{ phoneNo: '555-55-555', emailAddr: 'harry@potter.com' }]
  }


  textInputs: { userId: number, contractNumber: number, name: string }[] = []; // Initialize textInputs as an array of objects

  selectedData: string | undefined;

  selectTd(index: number) {
    this.selectedData = this.message[index];
    this.fetchData();
    //  this.consolidateData();
    this.basicDetailfetchDataAndPatchForm();
  }



  isHighlighted(contract: string): boolean {
    return this.selectedData === contract;
  }

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
  // Variable to store the selected data
  textInput: string | undefined;

  hoveredIndex: number | null = null;
  tabIndex = 0;
  activeTab: number = 0; // Default selected tab index
  requestNumber: string;
  contractNumber: string;
  subRequestNumber: string;

  toggleDisplayDiv() {

    this.isShowDiv = !this.isShowDiv;
  }
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;

  message: string[] = [];
  divData1: any[] = []; // Assuming this is your array holding the form data
  // TypefileForm: FormGroup; // Assuming this is your file form group

  csvInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
  }


  constructor(private shared: RequestInitationService, private router: Router,
    private route: ActivatedRoute, public dialog: MatDialog, private fb: FormBuilder, private formBuilder: FormBuilder,
    private http: HttpClient, private ContractDetailsService: ContractDetailsService, private datePipe: DatePipe) {

    this.mfgYearDate = '';
    this.formattedStartDate = '';
    this.formattedEndDate = '';

    this.requestNumber = ''; // Initialize with appropriate values
    this.contractNumber = ''; // Initialize with appropriate values
    this.subRequestNumber = ''; // Initialize with appropriate values
    if (this.data.length > 0) {
      // Use Object.keys() to get column names from the first item in the data array
      this.columns = Object.keys(this.data[0]);
    }
    this.ApprovalMatrix = this.formBuilder.group({
      fullName: [''], // Add initial values as needed
      role: [''],
      efforts: ['']
    });

    this.sanfileForm = this.fb.group({
      contacts: this.fb.array([]) // Make sure 'contacts' is initialized as a FormArray
    })

    this.form = this.fb.group({
      contacts: this.fb.array([]) // Initialize an empty FormArray
    });

    this.TypefileForm = this.fb.group({
      suppdoc: ['', [Validators.required, this.fileFormatValidator]], // Add validators for file selection
    });

    this.formGroup = new FormGroup({
      // Define your form controls here
    });

    this.groupexposureForm = this.formBuilder.group({
      // Initialize your form controls here
    });

    this.formGroupArray.push(this.createContactFormGroup());

    //// feedback form data .//////

    this.requestForm = this.formBuilder.group({
      vehicleRegNo: ['', Validators.required],
      vehicleModel: ['', Validators.required],
    });

    this.detailForm = this.formBuilder.group({
      model: [''],
      mfg_year: [''],
      rc_Number: [''],
      remedial_Status: [''],
    });

    this.pddForm = this.formBuilder.group({
      creditLife: [''],
      insurance_Provision: [''],
      faulty_Rc: [''],
    });

    this.COLLATERAL_DETAILS = [];

  }


  openDialog() {
    const dialogRef = this.dialog.open(ContractViewDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  displayedColumns: string[] = [
    'ContractNo',
  ];

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);




  ngOnInit(): void {

    window.scrollTo(0, 0);
    this.message = this.shared.getMessage();
    console.log(" REqeust form data is" + this.message);

    this.sanfileForm = this.formBuilder.group({
      firstName: [''], // Empty initial value
      lastName: [''], // Empty initial value
      contacts: this.formBuilder.array([])
    });

    this.fb.group({
      suppdoc: ['', [Validators.required, this.fileFormatValidator]]
    });

    this.TypefileForm = this.formBuilder.group({
      suppdoc: ['', Validators.required] // Add any other validators as needed
    });


    this.form = this.fb.group({
      contacts: this.fb.array([this.createContactFormGroup()])
    });

    // this.form = this.fb.group({
    //   contacts: this.fb.array([]),
    //   sanfileForm: this.fb.group({
    //     suppdoc: [null, [Validators.required, this.validateFileFormat.bind(this)]]
    //   })
    // });

    this.ApprovalMatrix = this.formBuilder.group({
      proposedRecoveryAmount: ['', Validators.required], // Assuming you have this control
      fullName: ['', Validators.required],
      role: ['', Validators.required],
      efforts: ['', Validators.required]
    });

    this.addDiv(); // Add initial row
    this.addContactField();
    this.initializeForm();

    this.fetchData();
    this.initForm();

    this.basicdetailForm();
    // Initialize the form
    this.detailForm = this.formBuilder.group({
      model: [''],
      mfg_year: [''],
      rc_Number: [''],
      remedial_Status: ['']
    });

    // Call the method to fetch data and patch the form
    this.basicDetailfetchDataAndPatchForm();


    // this.fetchData();
    this.requestForm = this.formBuilder.group({
      CustName: new FormControl(''),
      VehicleRegNo: new FormControl(''),
      VehicleModel: new FormControl(''),
      ProposedDate: new FormControl(''),
      SettleingContract: new FormControl(''),
      nameVisitedCust: new FormControl(''),
      TeleMobNumb: new FormControl(''),
      VehicleCondition: new FormControl(''),
      MetCustomer: new FormControl(''),
      MetGuarantor: new FormControl('', Validators.required),
      VehicleAvailable: new FormControl(''),
      ReasonForNotRepossessing: new FormControl(''),  //{value:'',disabled: false}
      PersonMetCustFromTMF: new FormControl(''),
      Designation: new FormControl(''),
      EmployeeOf: new FormControl(''),
      MobileNumber: new FormControl(''),
    });

    this.detailForm = this.formBuilder.group({
      model: new FormControl(''),
      mfg_year: new FormControl(''),
      rc_Number: new FormControl(''),
      remedial_Status: new FormControl('')
    });

    this.pddForm = this.fb.group({
      creditLife: [''], // Define form controls
      insuranceProvision: [''],
      faultyRc: ['']
    });

    this.pddInitForm(); // Initialize the form
    this.pddFetchFormData(); // Fetch data from API

    this.partnerInitForm();
    this.partnerFetchData();


    this.contractfetchFormData();

    this.contractForm = this.fb.group({
      region: [''],
      state: [''],
      branch: [''],
      zone: [''],
      contract_START_DATE: [''],
      contract_End_Date: [''],
      FinProd: [''],
      distribution_Channel: [''],
      body_Contract: [''],
      top_up_Contract: [''],
      scheme_Code: [''],
      tech_W_off: ['']
    });

    this.analyticsForm = this.fb.group({
      seasoning: [''],
      bp_DPD: [''],
      dpd_Bucket: [''],
      restructured_non_restructured: [''],
      finance_Amount: [''],
      tmc_flag: [''],
      request_Raising_Counter: [''],
      delstring: [''],
      average_Sales_Price: [''],
      provision_Amount: [''],
      pool_NUMBER: ['']
    });

     // Initialize the form
     this.groupexposureForm = this.formBuilder.group({
      CONTRACT_NUMBER: [''],
      STATUS: [''],
      CUSTOMER_NUMBER: [''],
      CUSTOMER_NAME: [''],
      FUTURE_PRINCIPAL: [''],
      CONTRACT_VALUE_GROUP_EXPO: [''],
      FUTURE_EMI: [''],
      OD_NO: [''],
      OD_AMOUNT: [''],
      ODC_DUE: [''],
      EXPOSURE: [''],
      TRACK_STATUS: [''],
      CONT_TERM_WOFF_DT: [''],
      CURRENT_MTH_MATURITY_AMT: [''],
      ODC_PERCENTAGE: [''],
      ODC_COLLECTED: [''],
      AD_LAST_12_MTH: [''],
      PD_LAST_12_MTH: [''],
      TRACK_STATUS_LAST_12_MTH: ['']
    });

    // Call the method to fetch data and populate the form
    this.groupExposure();

    this.analyticsfetchFormData();

    this.terminalFetchData();
    this.collateralSecurityfetchDataFromApi();

    ///nyay laxshmi ///
    this.fetchNyaylakshmiDetails();

    /// lakshmi details //////
    this.fetchLakshmiDetails();

  }


  /////// terminal dues //////////

  terminalFetchData() {
    const requestData = {
      request_number: "1341",
      CONTRACT_NUMBER: "5003253354",
      con_no: "5003125394",
      SUB_REQUEST_NUMBER: "10027",
      collateral_req_no: "2244"
    };

    this.http.post<any>('http://172.26.101.18:8087/TwaConsolidatedAPI/ConsolidatedAPIController', requestData)
      .subscribe(
        (data) => {
          console.log("Received Data:", data);
          if (data) {
            // Assuming termination dues details is an array within your response object
            this.terminationDuesDetails = data["ZTERMINATION DUES DETAILS"];
          } else {
            console.error('Invalid response format or missing data.');
          }
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }

  terminationPatchData() {
    this.terminationDuesDetails.forEach(item => {
      item.name_OF_COMPONENT = 'Updated Name'; // Example: Patching a value
      item.amount_OF_COMPONENT_DUES = 'Updated Dues Amount';
      item.amount_OF_COMPONENT_RECEIVABLE = 'Updated Received Amount';
      item.amount_OF_COMPONENT_NET = 'Updated Net Amount';
    });
  }
  ///// colateral security /////

  collateralSecurityfetchDataFromApi() {
    const requestData = {
      request_number: "1341",
      CONTRACT_NUMBER: "5003253354",
      con_no: "5003125394",
      SUB_REQUEST_NUMBER: "10027",
      collateral_req_no: "2244"
    };

    this.http.post<any>('http://172.26.101.18:8087/TwaConsolidatedAPI/ConsolidatedAPIController', requestData)
      .subscribe(
        (response) => {
          console.log("API Response:", response);
          if (response && response["COLLATERAL DETAILS"]) {
            this.COLLATERAL_DETAILS = response["COLLATERAL DETAILS"];
          } else {
            this.COLLATERAL_DETAILS = [];
          }
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }
  patchValueInTable() {

    this.COLLATERAL_DETAILS.forEach(item => {

      item.amount = 'New Amount';
      item.purpose_NAME = 'New Purpose';
      item.expiry_DATE = 'New Expiry Date';
      item.fan_NUMBER = 'New Fan Number';
      item.collateral_TYPE = 'New Collateral Type';
      item.owner_NAME = 'New Owner Name';
      item.created_AT = 'New Creation Date';
      item.request_NUMBER = 'New Request Number';
      item.bp_NUMBER = 'New BP Number';
      item.stored_AT_TYPE = 'New Stored at Type';
      item.additional_DETAILS = 'New Additional Details';
      item.vendor_NAME = 'New Vendor Name';
      item.initiator_BRANCH = 'New Initiator Branch';
      item.party_CODE = 'New Party Code';
    });
  }



  shouldDisplayRow(item: any): boolean {
    for (const key in item) {
      if (item.hasOwnProperty(key) && item[key] !== null) {
        return true;
      }
    }
    return false;
  }

  formatDate(date: Date): string {
    // Format date as dd/mm/yyyy
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }


  ///// feedback tab inut form data ///////

  initForm(): void {
    this.requestForm = this.formBuilder.group({
      CustName: [''],
      VehicleRegNo: [''],
      VehicleModel: [''],
      ProposedDate: [''],
      SettleingContract: [''],
      personVisitedOffice: [''],
      TeleMobNumb: [''],
      VehicleCondition: [''],
      MetCustomer: [''],
      MetGuarantor: [''],
      VehicleAvailable: [''],
      ReasonForNotRepossessing: [''],
      PersonMetCustFromTMF: [''],
      Designation: [''],
      EmployeeOf: [''],
      MobileNumber: ['']
    });
  }


  fetchData(): void {
    const requestData = {
      "REQUEST_NUMBER": 1737,
      "CONTRACT_NUMBER": 500325335809908
    };

    this.http.post<any>('http://localhost:8080/TwaFetchApiFeedbackFinal/feedbackFinalcontroller', requestData)
      .subscribe(
        (response: any[]) => {
          console.log('API Response:', response);

          // Check if response is empty
          if (response.length === 0) {
            console.log('API Response is empty.');
            return;
          }

          // Get the first item from the array
          const responseData = response[0];

          // Patch form fields with API response data
          this.requestForm.patchValue({
            CustName: responseData.CustName || '',
            VehicleRegNo: responseData.VehicleRegNo || '',
            VehicleModel: responseData.VehicleModel || '',
            ProposedDate: responseData.ProposedDate || '',
            SettleingContract: responseData.SettleingContract || '',
            personVisitedOffice: responseData.personVisitedOffice || '',
            TeleMobNumb: responseData.TeleMobNumb || '',
            VehicleCondition: responseData.VehicleCondition || '',
            MetCustomer: responseData.MetCustomer || '',
            MetGuarantor: responseData.MetGuarantor || '',
            VehicleAvailable: responseData.VehicleAvailable || '',
            ReasonForNotRepossessing: responseData.ReasonForNotRepossessing || '',
            PersonMetCustFromTMF: responseData.PersonMetCustFromTMF || '',
            Designation: responseData.Designation || '',
            EmployeeOf: responseData.EmployeeOf || '',
            MobileNumber: responseData.MobileNumber || ''
          });

          console.log('Feedback Form Patched Successfully:', this.requestForm.value);
        },
        (error) => {
          console.error('API Error:', error);
        }
      );
  }


  bindDataToForm() {
    const latestResponse = this.dataArray[this.dataArray.length - 1];
    console.log('Latest API Response:', latestResponse);

    if (latestResponse) {
      this.requestForm.patchValue({
        VehicleRegNo: latestResponse.VehicleRegNo,
        VehicleModel: latestResponse.VehicleModel,
        ProposedDate: latestResponse.ProposedDate,
        SettleingContract: latestResponse.SettleingContract,
        personVisitedOffice: latestResponse.personVisitedOffice,
        telephoneNumber: latestResponse.telephoneNumber,
        vehicleCondition: latestResponse.vehicleCondition,
        metCustomer: latestResponse.metCustomer,
        metGuarantor: latestResponse.metGuarantor,
        vehicleAvailable: latestResponse.vehicleAvailable,
        reasonNotRepossessing: latestResponse.reasonNotRepossessing,
        tmflPersonName: latestResponse.tmflPersonName,
        designation: latestResponse.designation,
        workingFor: latestResponse.workingFor,
        tmflMobileNumber: latestResponse.tmflMobileNumber
      });

      console.log('Feedback Form Patched Successfully:', this.requestForm.value);
    } else {
      console.error('Latest API Response is empty.');
    }
  }

  ///// basic detail tab form data ///////

  basicdetailForm(): void {
    this.detailForm = this.formBuilder.group({
      model: [''],
      mfg_year: [''],
      rc_Number: [''],
      remedial_Status: ['']
    });
  }

  basicDetailfetchDataAndPatchForm(): void {
    const requestData = {
      request_number: "1341",
      CONTRACT_NUMBER: "5003253354",
      con_no: "5003125394",
      SUB_REQUEST_NUMBER: "10027",
      collateral_req_no: "2244"
    };

    this.http.post<any>('http://172.26.101.18:8087/TwaConsolidatedAPI/ConsolidatedAPIController', requestData)
      .subscribe(
        (response: any) => {
          const zcisDetails = response['ZCIS SAP PI DETAILS'][0]; // Get the first item from ZCIS SAP PI DETAILS array
          this.detailForm.patchValue({
            model: zcisDetails.model,
            mfg_year: zcisDetails.contract_START_DATE.split(' ')[0], // Extracting date part only
            rc_Number: zcisDetails.rc_Number,
            remedial_Status: zcisDetails.remedial_Status
          });

          console.log('Basic Detail Form Patched Successfully:', this.detailForm.value);
        },
        (error) => {
          console.error('API Error:', error);
          // Handle error
        }
      );
  }


  basicdetailDataToForm() {
    const latestResponse = this.dataArray[this.dataArray.length - 1];
    console.log('Latest API Response:', latestResponse);

    if (latestResponse) {
      this.requestForm.patchValue({
        model: latestResponse.model,
        mfg_year: latestResponse.mfg_year,
        rc_Number: latestResponse.rc_Number,
        remedial_Status: latestResponse.remedial_Status,
      });
      console.log('Basic Detail Form Patched Successfully:', this.requestForm.value);
    } else {
      console.error('Latest API Response is empty.');
    }
  }

  ////////// PDD TAb form /////////

  pddInitForm() {
    this.pddForm = this.fb.group({
      creditLife: [''],
      insurance_Provision: [''], // Corrected control name to match HTML
      faulty_Rc: [''] // Corrected control name to match HTML
    });
  }

  pddFetchFormData(): void {
    const requestData = {
      request_number: "1341",
      CONTRACT_NUMBER: "5003253354",
      con_no: "5003125394",
      SUB_REQUEST_NUMBER: "10027",
      collateral_req_no: "2244"
    };
    this.http.post<any>('http://172.26.101.18:8087/TwaConsolidatedAPI/ConsolidatedAPIController', requestData)
      .pipe(
        catchError(error => {
          console.error('Error fetching form data:', error);
          return throwError(error);
        })
      )
      .subscribe(
        (data) => {
          console.log('Received data from API:', data);
          const pddDetails = data['DATALAKE & LOCALDB DETAILS'][0]; // Assuming you want to fetch from DATALAKE & LOCALDB DETAILS
          this.pddForm.patchValue({
            creditLife: pddDetails.creditLife,
            insurance_Provision: pddDetails.insurance_Provision,
            faulty_Rc: pddDetails.faulty_Rc,
          });
          console.log('Form value after patching:', this.pddForm.value);
        }
      );
  }


  /////////// Partner Tab form ///////

  partnerInitForm() {
    this.partnerForm = this.fb.group({
      CONTRACT_NUMBER: [''],
      PARTNER_TYPE: [''],
      PARTNER_CONTRACT_NUMBER: [''],
      PARTNER_CONTRACT_STATUS: [''],
      PARTNER_CONTRACT_OUTSTANDING: [''],
      PARTNER_CONTRACT_DPD: [''],
      CUSTOMER_TRACK: ['']
    });
  }
  

  partnerFetchData() {
    const requestData = {
      request_number: "1341",
      CONTRACT_NUMBER: "5003253354",
      con_no: "5003125394",
      SUB_REQUEST_NUMBER: "10027",
      collateral_req_no: "2244"
    };

    console.log('Request data to API:', requestData);

    this.http.post<any>('http://172.26.101.18:8087/TwaConsolidatedAPI/ConsolidatedAPIController', requestData)
      .pipe(
        catchError(error => {
          console.error('Error fetching data:', error);
          return throwError(error);
        })
      )
      .subscribe(
        (data) => {
          console.log('Partner Received data from API:', data);

          if (data && Object.keys(data).length !== 0) {
            this.partnerForm.patchValue(data);
            this.partnerData = data["PARTNER FUNCTION"];
          } else {
            console.log('Partner Response data is empty or null');
          }
        }
      );
  }

  /////// contract details ///////

  contractfetchFormData(): void {
    const requestData = {
      request_number: "1341",
      CONTRACT_NUMBER: "5003253354",
      con_no: "5003125394",
      SUB_REQUEST_NUMBER: "10027",
      collateral_req_no: "2244"
    };

    this.http.post<any>('http://172.26.101.18:8087/TwaConsolidatedAPI/ConsolidatedAPIController', requestData)
      .pipe(
        catchError(error => {
          console.error('Error fetching contract form data:', error);
          return throwError(error);
        })
      )
      .subscribe(
        (response) => {
          console.log('Contract Consolidated API Response:', response);
          const zcisDetails = response['ZCIS SAP PI DETAILS'][0]; // Assuming you want data from ZCIS SAP PI DETAILS
          // const dataLakeDetails = response['DATALAKE & LOCALDB DETAILS'][0]; // Assuming you want data from DATALAKE & LOCALDB DETAILS

          // Patching form values with data from ZCIS SAP PI DETAILS
          this.contractForm.patchValue({
            region: zcisDetails.region,
            state: zcisDetails.state,
            branch: zcisDetails.branch,
            zone: zcisDetails.zone,
            contract_START_DATE: new Date(zcisDetails.contract_START_DATE),
            contract_End_Date: new Date(zcisDetails.contract_End_Date),
            FinProd: zcisDetails.FinProd,
            distribution_Channel: zcisDetails.distribution_Channel,
            body_Contract: zcisDetails.body_Contract,
            TopUpContract: zcisDetails.TopUpContract,
            scheme_Code: zcisDetails.scheme_Code,
            tech_W_off: zcisDetails.tech_W_off,

          });

          console.log('Contract Form value after patching:', this.contractForm.value);
        },
        (error) => {
          console.error('API Error:', error);
        }
      );
  }


  ///////////// Analytics //////////////

  analyticsfetchFormData(): void {
    const requestData = {
      request_number: "1341",
      CONTRACT_NUMBER: "5003253354",
      con_no: "5003125394",
      SUB_REQUEST_NUMBER: "10027",
      collateral_req_no: "2244"
    };

    this.http.post<any>('http://172.26.101.18:8087/TwaConsolidatedAPI/ConsolidatedAPIController', requestData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            // Client-side error
            console.error('An error occurred:', error.error.message);
          } else {
            // Backend returned unsuccessful response code
            console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
          }
          // Return an observable with a user-facing error message
          return throwError('Something bad happened; please try again later.');
        })
      )
      .subscribe(
        (response: any) => {
          console.log('Analytics Consolidated API Response:', response);

          // Patch values from ZCIS SAP PI DETAILS
          if (response && response['ZCIS SAP PI DETAILS'] && response['ZCIS SAP PI DETAILS'].length > 0) {
            const analyticsItem = response['ZCIS SAP PI DETAILS'][0];
            this.analyticsForm.patchValue({
              seasoning: analyticsItem.seasoning,
              bp_DPD: analyticsItem.bp_DPD,
              dpd_Bucket: analyticsItem.dpd_Bucket,
              restructured_non_restructured: analyticsItem['restructured/non-restructured'],
              finance_Amount: analyticsItem.finance_Amount,
              tmc_flag: analyticsItem.tmc_flag,
              request_Raising_Counter: analyticsItem.request_Raising_Counter,
              delstring: analyticsItem.delstring,
              average_Sales_Price: analyticsItem.average_Sales_Price,
              provision_Amount: analyticsItem.provision_Amount,
              pool_NUMBER: analyticsItem.pool_NUMBER
            });
            console.log('Analytics Form value after patching:', this.analyticsForm.value);
          } else {
            console.error('Analytics API response is empty or invalid.');
          }
        },
        (error) => {
          console.error('API Error:', error);
        }
      );
  }


  /////////////////////////    legal tab - Nyay-lakshmi ////////////////////////

  fetchNyaylakshmiDetails() {
    const requestData = {
      "request_number": "1341",
      "CONTRACT_NUMBER": "5003253354",
      "con_no": "5003125394",
      "SUB_REQUEST_NUMBER": "10027",
      "collateral_req_no": "2244"
    };

    this.http.post<any>('http://172.26.101.18:8087/TwaConsolidatedAPI/ConsolidatedAPIController', requestData)
      .subscribe(response => {
        if (response && response['NYAYLAKSHMI DETAILS']) {
          this.nyaylakshmiDetails = response['NYAYLAKSHMI DETAILS'];
        } else {
          console.error('Response format is incorrect or data not found');
        }
      }, error => {
        console.error('Error fetching data:', error);
      });
  }

  /////////////////////////    legal tab -lakshmi ////////////////////////

  fetchLakshmiDetails() {
    const requestData = {
      "request_number": "1341",
      "CONTRACT_NUMBER": "5003253354",
      "con_no": "5003125394",
      "SUB_REQUEST_NUMBER": "10027",
      "collateral_req_no": "2244"
    };

    this.http.post<any>('http://172.26.101.18:8087/TwaConsolidatedAPI/ConsolidatedAPIController', requestData)
      .subscribe(response => {
        if (response && response['LAKSHMI DETAILS']) {
          this.lakshmiDetails = response['LAKSHMI DETAILS'];
        } else {
          console.error('Response format is incorrect or data not found');
        }
      }, error => {
        console.error('Error fetching data:', error);
      });
  }


  ////////////////// group exposure /////////


  groupExposure() {
    const requestData = {
      request_number: "1341",
      CONTRACT_NUMBER: "5003253354",
      con_no: "5003125394",
      SUB_REQUEST_NUMBER: "10027",
      collateral_req_no: "2244"
    };

    // Make HTTP POST request to fetch group exposure data
    this.http.post<any>('http://172.26.101.18:8087/TwaConsolidatedAPI/ConsolidatedAPIController', requestData)
      .subscribe(data => {
        // Log the API response to the console
        console.log('Group Exposure API Response:', data);

        // Patch the form with API response data
        this.patchFormWithData(data);
      });
  }

  patchFormWithData(data: any) {
    // Patch form controls with individual fields
    this.groupexposureForm.patchValue({
      contractNo: data.CONTRACT_NUMBER || '',
      status: data.STATUS || '',
      customer: data.CUSTOMER_NUMBER || '',
      customerName: data.CUSTOMER_NAME || '',
      futurePrincipal: data.FUTURE_PRINCIPAL || '',
      contractValue: data.CONTRACT_VALUE_GROUP_EXPO || '',
      futureEmi: data.FUTURE_EMI || '',
      odNo: data.OD_NO || '',
      odAmount: data.OD_AMOUNT || '',
      odcDue: data.ODC_DUE || '',
      exposure: data.EXPOSURE || '',
      trackStatus: data.TRACK_STATUS || '',
      terminationDate: data.CONT_TERM_WOFF_DT || '',
      maturityAmount: data.CURRENT_MTH_MATURITY_AMT || '',
      odcPercentage: data.ODC_PERCENTAGE || '',
      odcCollected: data.ODC_COLLECTED || '',
      adLast12M: data.AD_LAST_12_MTH || '',
      pdLast12M: data.PD_LAST_12_MTH || '',
      trackStatusLast12M: data.TRACK_STATUS_LAST_12_MTH || ''
    });

    // Patch the array of objects
    this.groupexposureForm.setControl('mfgYearGroupExposure', this.formBuilder.array(data['MFG YR & GRP EXPOSURE '] || []));
  }




  ////////// attachnments : type file //////////////

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

  onGoButtonClick() {
    console.log('Input value:', this.textInput);
  }

  addTextInput() {
    this.textInputs.push({ userId: 0, contractNumber: 0, name: '' }); // Add a new object to the array
  }


  buildContacts(contacts: any[]): FormGroup[] {
    return contacts.map(contact => {
      return this.formBuilder.group({
        phoneNo: [contact.phoneNo],
        emailAddr: [contact.emailAddr]
      });
    });
  }


  submit(formData: any): void {
    console.log(formData); // Handle form submission here
  }

  resetForm(): void {
    this.sanfileForm.reset(); // Reset the form
  }

  // async getContractDetails(): Promise<void> {
  //   const contractNo = "contractNo"; // Replace with your contract number
  //   (await this.contractService.getContractDetails(contractNo))
  //     .subscribe(async response => {
  //       this.contractDetails = await response;
  //       console.log("------------", this.contractDetails);
  //     });
  // }


  onSanSubmit() {
    if (this.sanfileForm.valid) {
    } else {
    }
  }

  onTypeSubmit() {
    if (this.TypefileForm.valid) {
    } else {
    }
  }

  addRow() {
    this.tableRows.push({
      type: '',
      file: null // You can add more properties as needed
    });
  }


  fileValidator(control: AbstractControl): ValidationErrors | null {
    const file = control.value;
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        return { invalidFormat: true };
      }
    }
    return null;
  }


  validateFileFormat(control: any) {
    const file = control.value;
    if (file) {
      const fileName = file.name.toLowerCase();
      if (!fileName.endsWith('.jpg') && !fileName.endsWith('.jpeg') && !fileName.endsWith('.png')) {
        return { invalidFormat: true };
      }
    }
    return null;
  }



  // initializeForm(): void {
  //   this.sanfileForm = this.formBuilder.group({
  //     contacts: this.formBuilder.array([
  //       this.createContactFormGroup()
  //     ])
  //   });
  // }


  // createContactFormGroup(): FormGroup {
  //   return this.formBuilder.group({
  //     contractNumber: [''],
  //     userId: [''],
  //     name: [''],
  //     designation: [''],
  //     currentAppropriateDesignation: [''],
  //     suppdoc: [null, [this.fileTypeValidator]]
  //   });
  // }


  // // Define the file type validator function
  // fileTypeValidator(control: AbstractControl): { [key: string]: any } | null {
  //   const file = control.value;
  //   if (file && !['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
  //     return { 'invalidFormat': true };
  //   }
  //   return null;
  // }

  populateFields() {
    const amount = (document.getElementById('amountInput') as HTMLInputElement).value;
    this.ApprovalMatrix.patchValue({
      proposedRecoveryAmount: amount,
      fullName: 'John Doe',
      role: 'Manager',
      efforts: 'Some Effort'
    });
  }

  ///   san file ////

  
  initializeForm(): void {
    this.form = this.fb.group({
      contacts: this.fb.array([this.createContactFormGroup()])
    });
  }


  createContactFormGroup(): FormGroup {
    return this.fb.group({
      contractNumber: ['', Validators.required],
      userId: ['', Validators.required],
      name: ['', Validators.required],
      designation: ['', Validators.required],
      currentAppropriateDesignation: ['', Validators.required],
      suppdoc: [null, [Validators.required, this.fileFormatValidator(['jpg', 'jpeg', 'png'])]]
    });
  }


  get contactsFormArray(): FormArray {
    return this.form.get('contacts') as FormArray;
  }

  addContactField(): void {
    this.contactsFormArray.push(this.createContactFormGroup());
    this.showDeleteButton = true;
  }

  deleteContactField(index: number): void {
    this.contactsFormArray.removeAt(index);
  }
  
  fileFormatValidator(allowedFormats: string[]) {
    return (control: AbstractControl) => {
      const file = control.value as File | null;
      if (file) {
        const fileNameParts = file.name.split('.');
        const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();
        if (!allowedFormats.includes(fileExtension)) {
          return { invalidFormat: true };
        }
      }
      return null;
    };
  }
  


  getContactsControls(): AbstractControl[] {
    const contactsControl = this.form.get('contacts');
    return contactsControl instanceof FormArray ? contactsControl.controls : [];
  }
  
  validatesanFile(event: any, index: number): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      const control = this.contactsFormArray.at(index).get('suppdoc');
      if (control) {
        if (!allowedFileTypes.includes(file.type)) {
          control.setErrors({ 'invalidFormat': true });
        } else {
          control.setErrors(null);
        }
      }
    }
  }
  

  sanvalidateFileFormat(control: any) {
    const file = control.value;
    if (file) {
      const fileName = file.name.toLowerCase();
      if (!fileName.endsWith('.jpg') && !fileName.endsWith('.jpeg') && !fileName.endsWith('.png')) {
        return { invalidFormat: true };
      }
    }
    return null;
  }


  navigateToApprovalScreen() {
    this.router.navigate(['/approval']);
  }


}

@Component({
  selector: 'contract-view-dialog',
  templateUrl: 'contract-view.html',
  styleUrl: './request-form.component.css',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule],
})
export class ContractViewDialog {
  message: string[] = [];
  selectedData: string | null = null;
  constructor(private shared: RequestInitationService) {
  }

  ngOnInit(): void {
    this.message = this.shared.getMessage();
    console.log(" REqeust form data is" + this.message);
    window.scrollTo(0, 0);
  }

}

