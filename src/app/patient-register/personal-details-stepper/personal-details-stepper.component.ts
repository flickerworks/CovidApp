import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { 
  MobileNumberValidationPattern,
  EmailValidationPattern,
  GovernmentIdTypes,
  PatientPersonalDetailsModel,
  StringValidationPattern
} from '../../shared/models/shared.model';
import { GlobalServices } from '../../shared/services/global.services';

@Component({
  selector: 'app-personal-details-stepper',
  templateUrl: './personal-details-stepper.component.html',
  styleUrls: ['./personal-details-stepper.component.scss']
})
export class PersonalDetailsStepperComponent implements OnInit {
  @Output() personalFormDetails: EventEmitter<PatientPersonalDetailsModel> = new EventEmitter();
  @Output() previousStep: EventEmitter<any> = new EventEmitter();
  currentDate = new Date();
  personalDetailsFormGroup: FormGroup;
  governmentIdTypes: string[] = GovernmentIdTypes;
  
  constructor(
    private formBuilder: FormBuilder,
    private globalService: GlobalServices,
  ) { }

  ngOnInit() {
    this.personalDetailsFormGroup = this.formBuilder.group({
      firstName: ['raman', [Validators.required, Validators.minLength(1), Validators.maxLength(30), Validators.pattern(StringValidationPattern), this.globalService.noWhitespaceValidator]],
      lastName: ['thakur', [Validators.required, Validators.minLength(1), Validators.maxLength(30), Validators.pattern(StringValidationPattern), this.globalService.noWhitespaceValidator]],
      mobileNumber: ['0987890987', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(MobileNumberValidationPattern)]],
      alternateMobileNumber: ['9098789876', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(MobileNumberValidationPattern)]],
      governmentIdType: ['Pancard', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      governmentIdNumber: ['4243', [Validators.required, this.globalService.noWhitespaceValidator]],
      email: ['test@gm.com', [Validators.required, Validators.pattern(EmailValidationPattern)]],
      dateOfBirth: [{value:'', disabled:true}, [Validators.required]],
    });
    // this.personalDetailsFormGroup.updateValueAndValidity();
    // this.personalDetailsFormGroup.markAllAsTouched();
  }

  saveForm(): void {
    if (this.personalDetailsFormGroup.valid) {
      const formDetails: PatientPersonalDetailsModel = {
        firstName: this.personalDetailsFormGroup.controls.firstName.value.trim(),
        lastName: this.personalDetailsFormGroup.controls.lastName.value.trim(),
        mobileNumber: this.personalDetailsFormGroup.controls.mobileNumber.value.trim(),
        alternateMobileNumber: this.personalDetailsFormGroup.controls.alternateMobileNumber.value.trim(),
        governmentIdType: this.personalDetailsFormGroup.controls.governmentIdType.value.trim(),
        governmentIdNumber: this.personalDetailsFormGroup.controls.governmentIdNumber.value.trim(),
        email: this.personalDetailsFormGroup.controls.email.value.trim(),
        dateOfBirth: this.personalDetailsFormGroup.controls.dateOfBirth.value,
      } as PatientPersonalDetailsModel;
      this.personalFormDetails.emit(formDetails);
    }
  }

  goBack(): void {
    this.previousStep.emit();
  }

}
