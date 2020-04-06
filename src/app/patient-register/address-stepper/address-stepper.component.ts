import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuarantineTypes, PatientAddressModel } from '../../shared/models/shared.model';

@Component({
  selector: 'app-address-stepper',
  templateUrl: './address-stepper.component.html',
  styleUrls: ['./address-stepper.component.scss']
})
export class AddressStepperComponent implements OnInit {
  @Output() addressDetails: EventEmitter<PatientAddressModel> = new EventEmitter();
  @Output() previousStep: EventEmitter<any> = new EventEmitter();
  currentAddressFormGroup: FormGroup;
  permanentAddressFormGroup: FormGroup;
  quarantineAddressFormGroup: FormGroup;
  quarantineTypeFormGroup: FormGroup;
  quarantineTypes: string[] = QuarantineTypes;
  markPermanentAddress: boolean = false;
  markQuarantineAddress: boolean = false;
  markQuarantineAddress2: boolean = false;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.currentAddressFormGroup = this.formBuilder.group({
      houseNumber: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      streetName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      area: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      city: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      state: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      pincode: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]]
    });
    this.permanentAddressFormGroup = this.formBuilder.group({
      houseNumber: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      streetName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      area: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      city: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      state: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      pincode: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]]
    });
    this.quarantineAddressFormGroup = this.formBuilder.group({
      houseNumber: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      streetName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      area: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      city: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      state: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      pincode: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
    });
    this.quarantineTypeFormGroup = this.formBuilder.group({
      quarantineType: ['', Validators.required]
    });
  }

  saveForm(): void {
    if (this.currentAddressFormGroup.valid) {
      const formDetails: PatientAddressModel = {
        currentAddress : {
          houseNumber: this.currentAddressFormGroup.controls.houseNumber.value,
          streetName: this.currentAddressFormGroup.controls.streetName.value,
          area: this.currentAddressFormGroup.controls.area.value,
          city: this.currentAddressFormGroup.controls.city.value,
          state: this.currentAddressFormGroup.controls.state.value,
          pincode: this.currentAddressFormGroup.controls.pincode.value
        }, permanentAddress : {
          houseNumber: this.permanentAddressFormGroup.controls.houseNumber.value,
          streetName: this.permanentAddressFormGroup.controls.streetName.value,
          area: this.permanentAddressFormGroup.controls.area.value,
          city: this.permanentAddressFormGroup.controls.city.value,
          state: this.permanentAddressFormGroup.controls.state.value,
          pincode: this.permanentAddressFormGroup.controls.pincode.value
        }, quarantineAddress : {
          houseNumber: this.quarantineAddressFormGroup.controls.houseNumber.value,
          streetName: this.quarantineAddressFormGroup.controls.streetName.value,
          area: this.quarantineAddressFormGroup.controls.area.value,
          city: this.quarantineAddressFormGroup.controls.city.value,
          state: this.quarantineAddressFormGroup.controls.state.value,
          pincode: this.quarantineAddressFormGroup.controls.pincode.value
        },
        quarantineType: this.quarantineTypeFormGroup.controls.quarantineType.value
      } as PatientAddressModel;
      this.addressDetails.emit(formDetails);
    }
  }

  goBack(): void {
    this.previousStep.emit();
  }

  checkPermanentAddress(checked: boolean): void {
    if (checked) {
      const formDetails = this.currentAddressFormGroup.controls;
      this.permanentAddressFormGroup.controls.houseNumber.setValue(formDetails.houseNumber.value);
      this.permanentAddressFormGroup.controls.streetName.setValue(formDetails.streetName.value);
      this.permanentAddressFormGroup.controls.area.setValue(formDetails.area.value);
      this.permanentAddressFormGroup.controls.city.setValue(formDetails.city.value);
      this.permanentAddressFormGroup.controls.state.setValue(formDetails.state.value);
      this.permanentAddressFormGroup.controls.pincode.setValue(formDetails.pincode.value);
      this.permanentAddressFormGroup.updateValueAndValidity();
      this.permanentAddressFormGroup.markAllAsTouched();
    } else {
      this.permanentAddressFormGroup.controls.houseNumber.setValue(null);
      this.permanentAddressFormGroup.controls.streetName.setValue(null);
      this.permanentAddressFormGroup.controls.area.setValue(null);
      this.permanentAddressFormGroup.controls.city.setValue(null);
      this.permanentAddressFormGroup.controls.state.setValue(null);
      this.permanentAddressFormGroup.controls.pincode.setValue(null);
      this.permanentAddressFormGroup.updateValueAndValidity();
    }
  }

  checkQuarantineAddress_1(checked: boolean): void {
    if (checked) {
      const formDetails = this.currentAddressFormGroup.controls;
      this.quarantineAddressFormGroup.controls.houseNumber.setValue(formDetails.houseNumber.value);
      this.quarantineAddressFormGroup.controls.streetName.setValue(formDetails.streetName.value);
      this.quarantineAddressFormGroup.controls.area.setValue(formDetails.area.value);
      this.quarantineAddressFormGroup.controls.city.setValue(formDetails.city.value);
      this.quarantineAddressFormGroup.controls.state.setValue(formDetails.state.value);
      this.quarantineAddressFormGroup.controls.pincode.setValue(formDetails.pincode.value);
      this.quarantineAddressFormGroup.updateValueAndValidity();
      this.quarantineAddressFormGroup.markAllAsTouched();
    } else {
      this.quarantineAddressFormGroup.controls.houseNumber.setValue(null);
      this.quarantineAddressFormGroup.controls.streetName.setValue(null);
      this.quarantineAddressFormGroup.controls.area.setValue(null);
      this.quarantineAddressFormGroup.controls.city.setValue(null);
      this.quarantineAddressFormGroup.controls.state.setValue(null);
      this.quarantineAddressFormGroup.controls.pincode.setValue(null);
      this.quarantineAddressFormGroup.updateValueAndValidity();
    }
  }

  checkQuarantineAddress_2(checked: boolean): void {
    if (checked) {
      const formDetails = this.permanentAddressFormGroup.controls;
      this.quarantineAddressFormGroup.controls.houseNumber.setValue(formDetails.houseNumber.value);
      this.quarantineAddressFormGroup.controls.streetName.setValue(formDetails.streetName.value);
      this.quarantineAddressFormGroup.controls.area.setValue(formDetails.area.value);
      this.quarantineAddressFormGroup.controls.city.setValue(formDetails.city.value);
      this.quarantineAddressFormGroup.controls.state.setValue(formDetails.state.value);
      this.quarantineAddressFormGroup.controls.pincode.setValue(formDetails.pincode.value);
      this.quarantineAddressFormGroup.updateValueAndValidity();
      this.quarantineAddressFormGroup.markAllAsTouched();
    } else {
      this.quarantineAddressFormGroup.controls.houseNumber.setValue(null);
      this.quarantineAddressFormGroup.controls.streetName.setValue(null);
      this.quarantineAddressFormGroup.controls.area.setValue(null);
      this.quarantineAddressFormGroup.controls.city.setValue(null);
      this.quarantineAddressFormGroup.controls.state.setValue(null);
      this.quarantineAddressFormGroup.controls.pincode.setValue(null);
      this.quarantineAddressFormGroup.updateValueAndValidity();
    }
  }

  isFormDisabled(): boolean {
    if (
      this.currentAddressFormGroup.invalid
      || this.permanentAddressFormGroup.invalid
      || this.quarantineAddressFormGroup.invalid
      || this.quarantineTypeFormGroup.invalid
    ) {
      return true;
    }
    return false;
  }
}
