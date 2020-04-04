import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import {
  PatientPersonalDetailsModel,
  PatientHealthStatusModel,
  PatientAddressModel,
  AssignMonitorModel
} from '../shared/models/shared.model';

@Component({
  selector: 'app-patient-register',
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.scss']
})
export class PatientRegisterComponent implements OnInit {
  @ViewChild('stepper', {static: false}) private myStepper: MatStepper;
  personalDetailsFormGroup: FormGroup;
  healthStatusFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  assignMonitorFormGroup: FormGroup;
  isEditable: boolean;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.isEditable = true;
    this.personalDetailsFormGroup = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      alternateMobileNumber: ['', [Validators.required]],
      governmentIdType: ['', [Validators.required]],
      governmentIdNumber: ['', [Validators.required]],
      email: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]]
    });
    this.healthStatusFormGroup = this.formBuilder.group({
      fever: ['', Validators.required],
      temperature: ['', Validators.required],
      cough: ['', Validators.required],
      fatigue: ['', Validators.required],
      breathing: ['', Validators.required],
      diarrhea: ['', Validators.required],
      runnyNose: ['', Validators.required]
    });
    this.addressFormGroup = this.formBuilder.group({
      currentAddress: [{
        houseNumber: ['', Validators.required], 
        streetName: ['', Validators.required], 
        area: ['', Validators.required], 
        city: ['', Validators.required], 
        state: ['', Validators.required], 
        pincode: ['', Validators.required]
      }],
      permanentAddress: [{
        houseNumber: ['', Validators.required], 
        streetName: ['', Validators.required], 
        area: ['', Validators.required], 
        city: ['', Validators.required], 
        state: ['', Validators.required], 
        pincode: ['', Validators.required]
      }],
      quarantineAddress: [{
        houseNumber: ['', Validators.required], 
        streetName: ['', Validators.required], 
        area: ['', Validators.required], 
        city: ['', Validators.required], 
        state: ['', Validators.required], 
        pincode: ['', Validators.required]
      }],
      quarantineType: ['', Validators.required]
    });
    this.assignMonitorFormGroup = this.formBuilder.group({
      idNumber: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      zone: ['', Validators.required],
      email: ['', Validators.required],
      userType: ['', Validators.required]
    });
  }

  savePersonalDetails(data: PatientPersonalDetailsModel): void {
    this.personalDetailsFormGroup.controls.firstName.setValue(data.firstName);
    this.personalDetailsFormGroup.controls.lastName.setValue(data.lastName);
    this.personalDetailsFormGroup.controls.mobileNumber.setValue(data.mobileNumber);
    this.personalDetailsFormGroup.controls.alternateMobileNumber.setValue(data.alternateMobileNumber);
    this.personalDetailsFormGroup.controls.governmentIdType.setValue(data.governmentIdType);
    this.personalDetailsFormGroup.controls.governmentIdNumber.setValue(data.governmentIdNumber);
    this.personalDetailsFormGroup.controls.email.setValue(data.email);
    this.personalDetailsFormGroup.controls.dateOfBirth.setValue(data.dateOfBirth);
    this.personalDetailsFormGroup.updateValueAndValidity();
    this.goForward();
  }

  saveHealthStatus(data: PatientHealthStatusModel): void {
    this.healthStatusFormGroup.controls.fever.setValue(data.fever);
    this.healthStatusFormGroup.controls.temperature.setValue(data.temperature);
    this.healthStatusFormGroup.controls.cough.setValue(data.cough);
    this.healthStatusFormGroup.controls.fatigue.setValue(data.fatigue);
    this.healthStatusFormGroup.controls.breathing.setValue(data.breathing);
    this.healthStatusFormGroup.controls.diarrhea.setValue(data.diarrhea);
    this.healthStatusFormGroup.controls.runnyNose.setValue(data.runnyNose);
    this.healthStatusFormGroup.updateValueAndValidity();
    this.goForward();
  }

  saveAddress(data: PatientAddressModel): void {
    const currentAddress = this.getCurrentAddressForm();
    currentAddress.value.houseNumber = data.currentAddress.houseNumber;
    currentAddress.value.streetName = data.currentAddress.streetName;
    currentAddress.value.area = data.currentAddress.area;
    currentAddress.value.city = data.currentAddress.city;
    currentAddress.value.state = data.currentAddress.state;
    currentAddress.value.pincode = data.currentAddress.pincode;

    const permanentAddress = this.getPermanentAddressForm();
    permanentAddress.value.houseNumber = data.permanentAddress.houseNumber;
    permanentAddress.value.streetName = data.permanentAddress.streetName;
    permanentAddress.value.area = data.permanentAddress.area;
    permanentAddress.value.city = data.permanentAddress.city;
    permanentAddress.value.state = data.permanentAddress.state;
    permanentAddress.value.pincode = data.permanentAddress.pincode;

    const quarantineAddress = this.getQuarantineAddressForm();
    quarantineAddress.value.houseNumber = data.quarantineAddress.houseNumber;
    quarantineAddress.value.streetName = data.quarantineAddress.streetName;
    quarantineAddress.value.area = data.quarantineAddress.area;
    quarantineAddress.value.city = data.quarantineAddress.city;
    quarantineAddress.value.state = data.quarantineAddress.state;
    quarantineAddress.value.pincode = data.quarantineAddress.pincode;

    this.addressFormGroup.controls.quarantineType.setValue(data.quarantineType);
    this.addressFormGroup.updateValueAndValidity();
    this.goForward();
  }

  getCurrentAddressForm(): FormGroup {
    return this.addressFormGroup.controls.currentAddress as FormGroup;
  }

  getPermanentAddressForm(): FormGroup {
    return this.addressFormGroup.controls.permanentAddress as FormGroup;
  }

  getQuarantineAddressForm(): FormGroup {
    return this.addressFormGroup.controls.quarantineAddress as FormGroup;
  }

  saveMonitor(data: AssignMonitorModel): void {
    this.assignMonitorFormGroup.controls.idNumber.setValue(data.idNumber);
    this.assignMonitorFormGroup.controls.firstName.setValue(data.firstName);
    this.assignMonitorFormGroup.controls.lastName.setValue(data.lastName);
    this.assignMonitorFormGroup.controls.mobileNumber.setValue(data.mobileNumber);
    this.assignMonitorFormGroup.controls.zone.setValue(data.zone);
    this.assignMonitorFormGroup.controls.email.setValue(data.email);
    this.assignMonitorFormGroup.controls.userType.setValue(data.userType);
    this.assignMonitorFormGroup.updateValueAndValidity();
    this.savePatientDetails();
  }

  savePatientDetails(): void {
    //hit api to save patient details
  }

  goBack(){
    this.myStepper.previous();
  }

  goForward(){
    this.myStepper.next();
  }

}
