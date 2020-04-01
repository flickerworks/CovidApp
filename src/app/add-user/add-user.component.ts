import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { 
  MobileNumberValidationPattern,
  EmailValidationPattern,
  PasswordValidationPattern,
  UserTypes,
  UserRegisterModel,
  DefaultErrorMessage,
  UserNameValidationPattern,
  GovernmentIdTypes
} from '../shared/models/shared.model';
import { RestfullServices } from '../shared/services/restfull.services';
import { AlertDialogComponent } from '../shared/components/alert-dialog/alert-dialog.component';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userRegisterForm: FormGroup;
  userTypes: string[] = UserTypes;
  governmentIdTypes: string[] = GovernmentIdTypes;
  
  constructor(
    private readonly formBuilder: FormBuilder,
    private restfullServices: RestfullServices,
    public dialog: MatDialog
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
      pincode: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]]
    });
    console.log(this.userRegisterForm.controls.governmentIdImageName);
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userRegisterForm.controls.governmentIdImage = e.target.result;
      };
      this.userRegisterForm.controls.governmentIdImageName = inputNode.files[0].name;
      this.userRegisterForm.updateValueAndValidity();
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

  registerUser(): void {
    if (!this.userRegisterForm.invalid) {
      const userRegisterModel: UserRegisterModel = {
        firstName: this.userRegisterForm.value.firstName,
        lastName: this.userRegisterForm.value.lastName,
        email: this.userRegisterForm.value.email,
        mobileNumber: this.userRegisterForm.value.mobileNumber,
        alternateMobileNumber: this.userRegisterForm.value.alternateMobileNumber,
        governmentId: this.userRegisterForm.value.governmentId,
        houseNumber: this.userRegisterForm.value.houseNumber,
        street: this.userRegisterForm.value.street,
        area: this.userRegisterForm.value.area,
        city: this.userRegisterForm.value.city,
        state: this.userRegisterForm.value.state,
        pincode: this.userRegisterForm.value.pincode
      } as UserRegisterModel;
      // console.log(this.userRegisterForm.value);
      console.log(userRegisterModel);
      // this.restfullServices.registerDonor(donorRegisterModel)
      // .subscribe((response: boolean) => {
      //   if (response) {
      //     this.openDialog('Donor has been registered successfully.');
      //     this.resetFormData();
      //   } else {
      //     this.openDialog(DefaultErrorMessage);
      //   }
      // }, (err) => {
      //   this.openDialog(DefaultErrorMessage);
      //   console.log(err);
      // });
    }
  }

  resetFormData(): void {
    this.userRegisterForm.reset();
  }

  openDialog(message: string): void {
    this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data: {
        message: message
      }
    });
  }

}
