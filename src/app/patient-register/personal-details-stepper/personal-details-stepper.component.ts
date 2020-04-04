import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { 
  MobileNumberValidationPattern,
  EmailValidationPattern,
  GovernmentIdTypes,
  PatientPersonalDetailsModel
} from '../../shared/models/shared.model';

@Component({
  selector: 'app-personal-details-stepper',
  templateUrl: './personal-details-stepper.component.html',
  styleUrls: ['./personal-details-stepper.component.scss']
})
export class PersonalDetailsStepperComponent implements OnInit {
  @Output() personalFormDetails: EventEmitter<PatientPersonalDetailsModel> = new EventEmitter();
  @Output() previousStep: EventEmitter<any> = new EventEmitter();
  personalDetailsFormGroup: FormGroup;
  governmentIdTypes: string[] = GovernmentIdTypes;
  
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.personalDetailsFormGroup = this.formBuilder.group({
      firstName: ['test', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      lastName: ['test', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      mobileNumber: ['1231231231', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(MobileNumberValidationPattern)]],
      alternateMobileNumber: ['1231231231', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(MobileNumberValidationPattern)]],
      governmentIdType: ['Voter Id', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      governmentIdNumber: ['123', [Validators.required]],
      email: ['tets@gmail.com', [Validators.required, Validators.pattern(EmailValidationPattern)]],
      dateOfBirth: ['04/30/2020', [Validators.required]],
    });
    this.personalDetailsFormGroup.updateValueAndValidity();
    this.personalDetailsFormGroup.markAllAsTouched();
  }

  saveForm(): void {
    if (this.personalDetailsFormGroup.valid) {
      const formDetails: PatientPersonalDetailsModel = {
        firstName: this.personalDetailsFormGroup.controls.firstName.value,
        lastName: this.personalDetailsFormGroup.controls.lastName.value,
        mobileNumber: this.personalDetailsFormGroup.controls.mobileNumber.value,
        alternateMobileNumber: this.personalDetailsFormGroup.controls.alternateMobileNumber.value,
        governmentIdType: this.personalDetailsFormGroup.controls.governmentIdType.value,
        governmentIdNumber: this.personalDetailsFormGroup.controls.governmentIdNumber.value,
        email: this.personalDetailsFormGroup.controls.email.value,
        dateOfBirth: this.personalDetailsFormGroup.controls.dateOfBirth.value,
      } as PatientPersonalDetailsModel;
      this.personalFormDetails.emit(formDetails);
    }
  }

  goBack(): void {
    this.previousStep.emit();
  }

}
