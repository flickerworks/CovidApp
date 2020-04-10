import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { 
  MobileNumberValidationPattern,
  EmailValidationPattern,
  UserRegisterModel,
  GovernmentIdTypes,
  PersonalDetails,
  FileExtension,
  PincodeValidationPattern,
  StringValidationPattern
} from '../shared/models/shared.model';
import { RestfullServices } from '../shared/services/restfull.services';
import { Subscription } from 'rxjs';
import { GlobalServices } from '../shared/services/global.services';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertDialogComponent } from '../shared/components/alert-dialog/alert-dialog.component';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userRegisterForm: FormGroup;
  isEdit:boolean = false;
  popupMessage: string;
  inputType: string = "password";
  // userTypes: string[] = UserTypes;
  governmentIdTypes: string[] = GovernmentIdTypes;
  userSubscription: Subscription;
  registrationAs: string = "quarantine_manager";
  showPopup:boolean = false;
  profileName: string;
  userType = 'quarantine_manager';
  personalDetails: PersonalDetails;
  constructor(
    private readonly formBuilder: FormBuilder,
    private restfullServices: RestfullServices,
    private globalService: GlobalServices,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.userRegisterForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), Validators.pattern(StringValidationPattern), this.globalService.noWhitespaceValidator]],
      lastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), Validators.pattern(StringValidationPattern), this.globalService.noWhitespaceValidator]],
      mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(MobileNumberValidationPattern)]],
      email: ['', [Validators.required, Validators.pattern(EmailValidationPattern)]],
      designation: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), Validators.pattern(StringValidationPattern), this.globalService.noWhitespaceValidator]],
      department: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), Validators.pattern(StringValidationPattern), this.globalService.noWhitespaceValidator]],
      zone: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), this.globalService.noWhitespaceValidator]],
      governmentIdType: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), this.globalService.noWhitespaceValidator]],
      governmentIdImage: [''],
      governmentIdImageName: ['', [Validators.required]],
      houseNumber: ['', [Validators.minLength(1), Validators.maxLength(30)]],
      street: ['', [Validators.minLength(1), Validators.maxLength(100)]],
      area: ['', [Validators.minLength(1), Validators.maxLength(100)]],
      city: ['', [Validators.minLength(1), Validators.maxLength(30), Validators.pattern(StringValidationPattern)]],
      state: ['', [Validators.minLength(1), Validators.maxLength(30), Validators.pattern(StringValidationPattern)]],
      pincode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern(PincodeValidationPattern), this.globalService.noWhitespaceValidator]],
      loginName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30), this.globalService.noWhitespaceValidator]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30), this.globalService.noWhitespaceValidator]]
    });
    this.checkParams();
  }

  checkParams():void {
    this.route.paramMap.subscribe(params => {
      const _param = params['params'];
      this.isEdit = _param.isEdit === "true"; 
      
      if(this.isEdit){
        this.userRegisterForm.controls.loginName.disable();
        this.userRegisterForm.get('governmentIdImageName').clearValidators();
        this.personalDetails = this.globalService.personalDetal;
        if(!this.personalDetails){
          this.router.navigate(['/view-user']);
          return;
        }
        this.userType = (this.personalDetails.type=='Quarantine Manager') ? 'quarantine_manager' : 'monitor';
        this.userRegisterForm.patchValue({
          firstName: this.personalDetails.firstName,
          lastName: this.personalDetails.lastName,
          mobileNumber: this.personalDetails.phone,
          email: this.personalDetails.email,
          designation: this.personalDetails.designation,
          department: this.personalDetails.department,
          zone: this.personalDetails.zone,
          governmentIdType: this.personalDetails.idCardType,
          governmentIdImage: '',
          governmentIdImageName: '',
          houseNumber: this.personalDetails.houseNo,
          street: this.personalDetails.street,
          area: this.personalDetails.area,
          city: this.personalDetails.city,
          state: this.personalDetails.state,
          pincode: this.personalDetails.pincode,
          loginName: this.personalDetails.loginName,
          password: this.personalDetails.password
        });
        this.userRegisterForm.updateValueAndValidity();
        this.userRegisterForm.markAllAsTouched();
      } else {
        this.userRegisterForm.controls.loginName.enable();
        this.userRegisterForm.reset();
        this.userRegisterForm.updateValueAndValidity();
      }
    })
  }

  onFileSelected(event) {
    const inputNode: any = document.querySelector('#file');
    const fileExtension: string = inputNode.files[0].name.split('.')[1].toLowerCase();
    if (typeof (FileReader) !== 'undefined' && FileExtension.includes(fileExtension)) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64String = this.arrayBufferToBase64(e.target.result);
        this.userRegisterForm.controls.governmentIdImage.setValue(base64String);
      };
      this.userRegisterForm.controls.governmentIdImageName = inputNode.files[0].name;
      this.userRegisterForm.updateValueAndValidity();
      reader.readAsArrayBuffer(inputNode.files[0]);
    } else {
      this.dialog.open(AlertDialogComponent, {
        width: '400px',
        data: {
          message: 'Invalid file extension. Please upload jpg/png file only'
        }
      });
    }
  }

  arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

  changeUser(event){
    this.registrationAs = event.value;
  }

  registerUser(): void {
    if (!this.userRegisterForm.invalid) {
      let _form: UserRegisterModel;
      if(this.isEdit){
        _form = this.userRegisterForm.getRawValue();
      }else{
        _form = this.userRegisterForm.value;
      }
      
      const userRegisterModel = {
        FIRSTNAME: _form.firstName.trim(),
        LASTNAME: _form.lastName.trim(),
        PHONE: _form.mobileNumber,
        EMAIL: _form.email.trim(),
        DESIGNATION: _form.designation.trim(),
        DEPARTMENT: _form.department.trim(),
        DEVICE_TOKEN:"",
        IDCARDTYPE: _form.governmentIdType.trim(),
        IDCARDNUMBER: "",
        IDCARDIMAGE: _form.governmentIdImage,
        HNO: _form.houseNumber.trim(),
        STREETNAME: _form.street.trim(),
        AREA: _form.area.trim(),
        ZONE: _form.zone.trim(),
        CITY: _form.city.trim(),
        STATE: _form.state.trim(),
        PINCODE: _form.pincode.trim(),
        LOGINNAME: _form.loginName.trim(),
        PASSWORD: _form.password.trim()
      };

      const condition = this.isEdit ? this.personalDetails.type : this.userType;
      if(condition.toLowerCase() === "monitor"){
        this.registerMonitor(userRegisterModel);
      }else {
        this.registerQManager(userRegisterModel);
      }      
    }
  }

  registerMonitor(userRegisterModel){    
    let payloadType = "ADDMONITOR";
    let _userRegisterModel = userRegisterModel;
    this.profileName = this.globalService.firstLetterUppercase(_userRegisterModel.FIRSTNAME);
    this.popupMessage = `${this.profileName}'s profile has been created as a Monitor successfully`;
    if(this.isEdit){      
      this.popupMessage = `${this.profileName}'s profile has been updated successfully`;
      _userRegisterModel.MID = this.personalDetails.id;
      delete _userRegisterModel.LOGINNAME;
      payloadType = "EDITMONITORBYMID";
    }
    this.userSubscription = this.restfullServices.post(_userRegisterModel, payloadType).subscribe(response => {
      //validation here
      console.log(response);      
      this.showPopup = true;
    })   
  }
  

  registerQManager(userRegisterModel){
    let _userRegisterModel = userRegisterModel;    
    let payloadType = "ADDQURANTINEMGR";
    this.profileName = this.globalService.firstLetterUppercase(_userRegisterModel.FIRSTNAME);
    this.popupMessage = `${this.profileName}'s profile has been created as a Quarantine Manager successfully`;
    if(this.isEdit){
      this.popupMessage = `${this.profileName}'s profile has been updated successfully`;
      _userRegisterModel.QMID = this.personalDetails.id;
      delete _userRegisterModel.LOGINNAME;
      payloadType = "EDITQUARANTINEMGR";
    }
    this.userSubscription = this.restfullServices.post(_userRegisterModel, payloadType).subscribe(response => {
      //validation here
      console.log(response);
      this.showPopup = true;
    }) 
  }

  

  resetFormData(): void {
    this.userRegisterForm.reset();
  }

  popupDone(){
    // this.resetFormData();
    this.globalService.showPopup.next(false);
    this.router.navigate(['/view-user']);
  }

  showPass(){
   if(this.inputType === 'text'){
     this.inputType = 'password';
   }else{
    this.inputType = 'text';
   } 
  }

}
