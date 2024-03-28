import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent implements OnInit {

  isShowAHSDIV = true;
  isShowASPDIV = true;
  isShowCOEDIV = true;
  constructor(private router: Router) {

  }
  ngOnInit(): void {
    // this.isShowASHDIV=true;
    // this.isShowASPDIV = true;
    // this.isShowCOEDIV = true;
  }

  AHSUpload() {
    if (this.isShowASPDIV == false) {
      this.isShowASPDIV = !this.isShowASPDIV;
    }

    if (this.isShowCOEDIV == false) {
      this.isShowCOEDIV = !this.isShowCOEDIV;
    }

    this.isShowAHSDIV = !this.isShowAHSDIV;
  }

  ASPUpload() {
    if (this.isShowAHSDIV == false) {
      this.isShowAHSDIV = !this.isShowAHSDIV;
    }

    if (this.isShowCOEDIV == false) {
      this.isShowCOEDIV = !this.isShowCOEDIV;
    }
    this.isShowASPDIV = !this.isShowASPDIV;
  }
  COEUpload() {
    if (this.isShowAHSDIV == false) {
      this.isShowAHSDIV = !this.isShowAHSDIV;
    }

    if (this.isShowASPDIV == false) {
      this.isShowASPDIV = !this.isShowASPDIV;
    }

    //  window.location.reload();

    this.isShowCOEDIV = !this.isShowCOEDIV;
  }



  arrayBuffer: any;
  file!: File;
  incomingfile(event) {
    this.file = event.target.files[0];
  }

  UploadAHS() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join('');
      var workbook = XLSX.read(bstr, { type: 'binary' });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];

      // console.log("DAta"+data);
      // console.log("arr"+arr);
      // console.log("bstr"+bstr);
      // console.log("workbook"+JSON.stringify(workbook));
      // console.log("first_sheet_name"+first_sheet_name);
      // console.log("worksheet"+JSON.stringify(worksheet));
      console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));

      const Repsonse = XLSX.utils.sheet_to_json(worksheet, { raw: true });

      // console.log(Repsonse.hasOwnProperty("__rowNum__"));
      const ABC = JSON.stringify(Repsonse);
      console.log(Object.keys(Repsonse)[0]);
      console.log("ABC" + ABC);
      const ABC2 = JSON.parse(ABC);
      // console.log(Object.values(ABC2));

      // const FinalResponse =Object.values(ABC2);
      // console.log(FinalResponse[1]);
      // console.log(Object.values(FinalResponse)[0]);
      var DataError = 0;
      const jsonData: string = ABC;
      try {
        const data: { [key: string]: number }[] = JSON.parse(jsonData);

        data.forEach((obj, index) => {
          const keys = Object.keys(obj);
          if (keys.length === 1 && keys[0] === "Contract No") {
            console.log('Contract no found in object ${index+i}', obj["Contract No"]);

          }
          else {
            console.log('Contract no not foundin object ${index+i}', obj["Contract No"]);
            DataError++;
          }
        })

        if (DataError == 0) {
          alert("File Uploaded Successfully");
        }
        else {
          alert("Please upload the correct AHS file to upload");
        }

      } catch (error) {
        console.error("Invalid JSON format");
      }

    };
    fileReader.readAsArrayBuffer(this.file);
  }


  UploadASPnCOE() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join('');
      var workbook = XLSX.read(bstr, { type: 'binary' });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];

      // console.log("DAta"+data);
      // console.log("arr"+arr);
      // console.log("bstr"+bstr);
      // console.log("workbook"+JSON.stringify(workbook));
      // console.log("first_sheet_name"+first_sheet_name);
      // console.log("worksheet"+JSON.stringify(worksheet));
      console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));

      const Repsonse = XLSX.utils.sheet_to_json(worksheet, { raw: true });

      // console.log(Repsonse.hasOwnProperty("__rowNum__"));
      const ABC = JSON.stringify(Repsonse);
      console.log(Object.keys(Repsonse)[0]);
      console.log("ABC" + ABC);
      const ABC2 = JSON.parse(ABC);
      // console.log(Object.values(ABC2));

      // const FinalResponse =Object.values(ABC2);
      // console.log(FinalResponse[1]);
      // console.log(Object.values(FinalResponse)[0]);
      var DataError = 0;
      const jsonData: string = ABC;
      try {
        const data: { [key: string]: number }[] = JSON.parse(jsonData);

        data.forEach((obj, index) => {
          const keys = Object.keys(obj);
          if (keys.length === 2 && keys.includes("Contract No") && keys.includes("Amount")) {
            console.log('Valid object');

          }
          else {
            console.log('Invalid object', obj);
            DataError++;
          }
        })

        if (DataError == 0) {
          alert("File Uploaded Successfully");
        }
        else {
          alert("Please upload the correct ASP or COE file to upload");
        }

      } catch (error) {
        console.error("Invalid JSON format");
      }

    };
    fileReader.readAsArrayBuffer(this.file);
  }


}
