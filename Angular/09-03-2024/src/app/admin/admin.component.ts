import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {



  // thisIsMyForm: FormGroup = new FormGroup({
  //   name: new FormControl({ value: '', disabled: true }),
  //   type: new FormControl({ value: '', disabled: true })
  // })
  thisIsMyForm: FormGroup;

  data = [
    { name: "one", type: "one" },
    { name: "two", type: "two" },
    { name: "three", type: "three" }
  ];

  constructor(private formBuilder: FormBuilder) {
    this.thisIsMyForm = new FormGroup({
      formArrayName: this.formBuilder.array([])
    })

    this.buildForm();
  }

  buildForm() {
    const controlArray = this.thisIsMyForm.get('formArrayName') as FormArray;
    Object.keys(this.data).forEach((i): void => {
      controlArray.push(
        this.formBuilder.group({
          name: new FormControl({ value: this.data[<any>i].name, disabled: false }),
          type: new FormControl({ value: this.data[<any>i].type, disabled: false })
        })
      )
    })

    console.log(controlArray.controls)
  }

  onSubmit() {
    // Here I would like to be able to access the values of the 'forms'
    console.log(this.thisIsMyForm.value)
  }

}
