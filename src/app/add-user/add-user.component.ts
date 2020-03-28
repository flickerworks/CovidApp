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
  UserNameValidationPattern
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
  
  constructor(
    private readonly formBuilder: FormBuilder,
    private restfullServices: RestfullServices,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.userRegisterForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      userType: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(MobileNumberValidationPattern)]],
      landLineNumber: [''],
      city: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      address: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), Validators.pattern(EmailValidationPattern)]],
      userName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern(UserNameValidationPattern)]],
      password: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), Validators.pattern(PasswordValidationPattern)]],
    });
  }

  submitUserForm(): void {
    if (!this.userRegisterForm.invalid) {
      const userRegisterModel: UserRegisterModel = {
        firstName: this.userRegisterForm.value.firstName,
        lastName: this.userRegisterForm.value.lastName,
        userType: this.userRegisterForm.value.userType,
        mobileNumber: this.userRegisterForm.value.mobileNumber,
        landLineNumber: this.userRegisterForm.value.landLineNumber ? this.userRegisterForm.value.landLineNumber : '',
        city: this.userRegisterForm.value.city,
        address: this.userRegisterForm.value.address,
        email: this.userRegisterForm.value.email,
        userName: this.userRegisterForm.value.userName,
        password: this.userRegisterForm.value.password,
        registerDate: new Date()
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
