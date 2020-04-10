import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import {
  PatientPersonalDetailsModel,
  PatientHealthStatusModel,
  PatientAddressModel,
  AssignMonitorModel,
  AddressModel
} from '../shared/models/shared.model';
import { GlobalServices } from '../shared/services/global.services';
import { RestfullServices } from '../shared/services/restfull.services';

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
  isSuccess: boolean;
  isEditable: boolean;
  MID: string;
  showPopup: boolean = false;
  popupMessage = "The user phone number is already registered";
  constructor(
    private formBuilder: FormBuilder,
    private globalService: GlobalServices,
    private restAPI: RestfullServices,
    private router: Router,
    private datePipe: DatePipe,
    private location: Location
  ) { }

  ngOnInit() {
    this.globalService.QMDashboardIndex = 0;
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
      temperature: [''],
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
        pincode: ['', Validators.required],
        zone: ['', Validators.required]
      }],
      permanentAddress: [{
        houseNumber: ['', Validators.required], 
        streetName: ['', Validators.required], 
        area: ['', Validators.required], 
        city: ['', Validators.required], 
        state: ['', Validators.required], 
        pincode: ['', Validators.required],
        zone: ['', Validators.required]
      }],
      quarantineAddress: [{
        houseNumber: ['', Validators.required], 
        streetName: ['', Validators.required], 
        area: ['', Validators.required], 
        city: ['', Validators.required], 
        state: ['', Validators.required], 
        pincode: ['', Validators.required],
        zone: ['', Validators.required]
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
    currentAddress.value.zone = data.currentAddress.zone;

    const permanentAddress = this.getPermanentAddressForm();
    permanentAddress.value.houseNumber = data.permanentAddress.houseNumber;
    permanentAddress.value.streetName = data.permanentAddress.streetName;
    permanentAddress.value.area = data.permanentAddress.area;
    permanentAddress.value.city = data.permanentAddress.city;
    permanentAddress.value.state = data.permanentAddress.state;
    permanentAddress.value.pincode = data.permanentAddress.pincode;
    permanentAddress.value.zone = data.permanentAddress.zone;

    const quarantineAddress = this.getQuarantineAddressForm();
    quarantineAddress.value.houseNumber = data.quarantineAddress.houseNumber;
    quarantineAddress.value.streetName = data.quarantineAddress.streetName;
    quarantineAddress.value.area = data.quarantineAddress.area;
    quarantineAddress.value.city = data.quarantineAddress.city;
    quarantineAddress.value.state = data.quarantineAddress.state;
    quarantineAddress.value.pincode = data.quarantineAddress.pincode;
    quarantineAddress.value.zone = data.quarantineAddress.zone;

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
    this.MID = data.idNumber;
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
    const personalDetails:PatientPersonalDetailsModel = this.personalDetailsFormGroup.value;
    const permanentAddress:AddressModel = this.getPermanentAddressForm().value;
    const quarantineAddress:AddressModel = this.getQuarantineAddressForm().value;
    const presentAddress: AddressModel = this.getCurrentAddressForm().value;
    
    const request = {
        PERMANENTSTATE:permanentAddress.state,
        PERMANENTSTREETNAME:permanentAddress.streetName,
        PERMANENTCITY:permanentAddress.city,        
        PERMANENTAREA:permanentAddress.area,
        PERMANENTHNO:permanentAddress.houseNumber,
        PERMANENTPINCODE:permanentAddress.pincode,

        QUARANTINEHNO:quarantineAddress.houseNumber,
        QUARANTINESTREETNAME:quarantineAddress.streetName,
        QUARANTINECITY:quarantineAddress.city,
        QUARANTINESTATE:quarantineAddress.state,  
        QUARANTINEAREA:quarantineAddress.area,
        PINCODE:quarantineAddress.pincode,
        ZONE: quarantineAddress.zone,

        PRESENTCITY:presentAddress.city,
        PRESENTSTATE:presentAddress.state,
        PRESENTHNO:presentAddress.houseNumber,        
        PRESENTSTREETNAME:presentAddress.streetName,
        PRESENTAREA:presentAddress.area,  
        PRESENTPINCODE:presentAddress.pincode,
        
        FIRSTNAME: personalDetails.firstName,
        LONGITUDE: this.globalService.longitude,
        LATITUDE: this.globalService.latitude,
        MOBILENUMBER:personalDetails.mobileNumber,        
        ALTERNATEPHONE:personalDetails.alternateMobileNumber,

        PASSWORD:'',
        LOGINNAME:'',
        GOVTIDIMAGE:'',
        
        GOVTIDNUMBER:personalDetails.governmentIdNumber,
        LASTNAME:personalDetails.lastName,        
        EMAIL:personalDetails.email,        
        GOVTIDTYPE:personalDetails.governmentIdType,
        DOB:this.datePipe.transform(personalDetails.dateOfBirth, 'dd/MM/yyyy'),
        QUARANTINETYPE:this.addressFormGroup.getRawValue().quarantineType,      
    }
    this.restAPI.post(request, "ADDENDUSER").subscribe(response => {
      const QID = response[0].PAYLOAD.ADDENDUSER.QID;
      if(QID){
        this.popupMessage = "Monitor assigned successfully";
        this.isSuccess = true;
        this.callStatusAPI(QID);
      }else{
        this.isSuccess = false;
        this.popupMessage = "The user phone number is already registered";
        this.showPopup = true;
        setTimeout(_ => {
          this.showPopup = false;
        }, 3000)
      }
    })
  }

  callStatusAPI(id){
    const healthStatus: PatientHealthStatusModel = this.healthStatusFormGroup.getRawValue();
    const request = {
      QID: id,
      MID: this.MID,
      FEVER: healthStatus.fever.toString(),
      STATUS: "",
      TEMPERATURE: healthStatus.temperature+'',
      COUGHING: healthStatus.cough.toString(),
      DIARRHEA: healthStatus.diarrhea.toString(),
      RUNNYNOSE: healthStatus.runnyNose.toString(),
      REVIEWTIME: this.getTime(),
      BREATHING: healthStatus.breathing.toString(),
      UNUSUALFATIQUE: healthStatus.fatigue.toString(),
      UPDATETYPE: "",
      LATITUDE: this.globalService.latitude+'',
      LONGITUDE: this.globalService.longitude+''
    }
    this.restAPI.post(request, "ADDHEALTHSTATUS").subscribe(response => {
      //condition
      this.showPopup = true;
      setTimeout(_ => {
        this.showPopup = false;
        this.router.navigate(['/quarantine-dashboard']);
      }, 3000)
    })

  }

  getTime(): number{
    const _date  = new Date();
    return _date.getHours();
  }

  goBack(){
    this.myStepper.previous();
  }

  goForward(){
    this.myStepper.next();
  }

  cancelFlow() {
    this.location.back();
  }

}
