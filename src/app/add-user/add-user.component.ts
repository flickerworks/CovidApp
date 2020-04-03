import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { 
  MobileNumberValidationPattern,
  EmailValidationPattern,
  UserTypes,
  UserRegisterModel,
  GovernmentIdTypes,
  PersonalDetails
} from '../shared/models/shared.model';
import { RestfullServices } from '../shared/services/restfull.services';
import { Subscription } from 'rxjs';
import { GlobalServices } from '../shared/services/global.services';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userRegisterForm: FormGroup;
  isEdit:boolean = false;
  // userTypes: string[] = UserTypes;
  governmentIdTypes: string[] = GovernmentIdTypes;
  userSubscription: Subscription;
  registrationAs: string = "quarantine_manager";
  showPopup:boolean = false;
  profileName: string;
  userType = 'quarantine_manager';
  constructor(
    private readonly formBuilder: FormBuilder,
    private restfullServices: RestfullServices,
    private globalService: GlobalServices,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userRegisterForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(MobileNumberValidationPattern)]],
      email: ['', [Validators.required, Validators.pattern(EmailValidationPattern)]],
      designation: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      department: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      zone: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      governmentIdType: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      governmentIdImage: [''],
      governmentIdImageName: ['', [Validators.required]],
      houseNumber: ['', [Validators.minLength(1), Validators.maxLength(30)]],
      street: ['', [Validators.minLength(1), Validators.maxLength(100)]],
      area: ['', [Validators.minLength(1), Validators.maxLength(100)]],
      city: ['', [Validators.minLength(1), Validators.maxLength(30)]],
      state: ['', [Validators.minLength(1), Validators.maxLength(30)]],
      pincode: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      loginName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]]
    });
    this.checkParams();
  }

  checkParams():void {
    this.route.paramMap.subscribe(params => {
      const _param = params['params'];
      this.isEdit = _param.isEdit === "true"; 
      if(this.isEdit){
        const personalDetails: PersonalDetails = this.globalService.personalDetal;
        if(!personalDetails){
          this.router.navigate(['/view-user']);
          return;
        }
        this.userType = (personalDetails.type=='Quarantine Manager') ? 'quarantine_manager' : 'monitor';
        this.userRegisterForm.patchValue({
          firstName: personalDetails.firstName,
          lastName: personalDetails.lastName,
          mobileNumber: personalDetails.phone,
          email: personalDetails.email,
          designation: personalDetails.designation,
          department: personalDetails.department,
          zone: personalDetails.zone,
          governmentIdType: personalDetails.idCardType,
          governmentIdImage: '',
          governmentIdImageName: '',
          houseNumber: personalDetails.houseNo,
          street: personalDetails.street,
          area: personalDetails.area,
          city: personalDetails.city,
          state: personalDetails.state,
          pincode: personalDetails.pincode,
          loginName: personalDetails.loginName,
          password: ''
        })
      }
    })
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64String = this.arrayBufferToBase64(e.target.result);
        this.userRegisterForm.controls.governmentIdImage.setValue(base64String);
      };
      this.userRegisterForm.controls.governmentIdImageName = inputNode.files[0].name;
      this.userRegisterForm.updateValueAndValidity();
      reader.readAsArrayBuffer(inputNode.files[0]);
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
      const _form: UserRegisterModel = this.userRegisterForm.value;
      const userRegisterModel = {
        FIRSTNAME: _form.firstName,
        LASTNAME: _form.lastName,
        PHONE: _form.mobileNumber,
        EMAIL: _form.email,
        DESIGNATION: _form.designation,
        DEPARTMENT: _form.department,
        IDCARDTYPE: _form.governmentIdType,
        IDCARDNUMBER: "",
        IDCARDIMAGE: _form.governmentIdImage,
        HNO: _form.houseNumber,
        STREETNAME: _form.street,
        AREA: _form.area,
        CITY: _form.city,
        STATE: _form.state,
        PINCODE: _form.pincode,
        LOGINNAME: _form.loginName,
        PASSWORD: _form.password
      };

      if(this.registrationAs === "monitor"){
        this.registerMonitor(userRegisterModel);
      }else {
        this.registerQManager(userRegisterModel);
      }      
    }
  }

  registerMonitor(userRegisterModel){
    this.userSubscription = this.restfullServices.post(userRegisterModel, "ADDMONITOR").subscribe(response => {
      //validation here
      console.log(response);
      this.profileName = this.globalService.firstLetterUppercase(userRegisterModel.FIRSTNAME);
      this.showPopup = true;
    })   
  }
  

  registerQManager(userRegisterModel){
    this.userSubscription = this.restfullServices.post(userRegisterModel, "ADDQURANTINEMGR").subscribe(response => {
      //validation here
      console.log(response);
      this.profileName = this.globalService.firstLetterUppercase(userRegisterModel.FIRSTNAME);
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

}
