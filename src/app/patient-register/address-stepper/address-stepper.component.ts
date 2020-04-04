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
  quarantineTypes: string[] = QuarantineTypes;
  markPermanentAddress: boolean = false;
  markQuarantineAddress: boolean = false;
  markQuarantineAddress2: boolean = false;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.currentAddressFormGroup = this.formBuilder.group({
      houseNumber: ['test', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      streetName: ['test', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      area: ['test', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      city: ['test', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      state: ['test', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      pincode: ['test', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]]
    });
    this.permanentAddressFormGroup = this.formBuilder.group({
      houseNumber: ['test', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      streetName: ['test', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      area: ['test', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      city: ['test', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      state: ['test', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      pincode: ['test', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]]
    });
    this.quarantineAddressFormGroup = this.formBuilder.group({
      houseNumber: ['test', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      streetName: ['test', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      area: ['test', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      city: ['test', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      state: ['test', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      pincode: ['test', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      quarantineType: ['', Validators.required]
    });
    this.currentAddressFormGroup.updateValueAndValidity();
    this.currentAddressFormGroup.markAllAsTouched();

    this.permanentAddressFormGroup.updateValueAndValidity();
    this.permanentAddressFormGroup.markAllAsTouched();

    this.quarantineAddressFormGroup.updateValueAndValidity();
    this.quarantineAddressFormGroup.markAllAsTouched();
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
        quarantineType: this.quarantineAddressFormGroup.controls.quarantineType.value
      } as PatientAddressModel;
      this.addressDetails.emit(formDetails);
    }
  }

  goBack(): void {
    this.previousStep.emit();
  }

}
