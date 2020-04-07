import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuarantineTypes, PatientAddressModel } from '../../shared/models/shared.model';
import { GlobalServices } from 'src/app/shared/services/global.services';

@Component({
  selector: 'app-address-stepper',
  templateUrl: './address-stepper.component.html',
  styleUrls: ['./address-stepper.component.scss']
})
export class AddressStepperComponent implements OnInit {
  @Output() addressDetails: EventEmitter<PatientAddressModel> = new EventEmitter();
  @Output() previousStep: EventEmitter<any> = new EventEmitter();
  // @ViewChild('area1', {static: false}) searchElementRef: ElementRef;
  currentAddressFormGroup: FormGroup;
  permanentAddressFormGroup: FormGroup;
  quarantineAddressFormGroup: FormGroup;
  quarantineTypeFormGroup: FormGroup;
  quarantineTypes: string[] = QuarantineTypes;
  markPermanentAddress: boolean = false;
  markQuarantineAddress: boolean = false;
  markQuarantineAddress2: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private globalService: GlobalServices
  ) { }

  ngOnInit() {
    this.currentAddressFormGroup = this.formBuilder.group({
      houseNumber: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), this.globalService.noWhitespaceValidator]],
      streetName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), this.globalService.noWhitespaceValidator]],
      area: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), this.globalService.noWhitespaceValidator]],
      city: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), this.globalService.noWhitespaceValidator]],
      state: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), this.globalService.noWhitespaceValidator]],
      pincode: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), this.globalService.noWhitespaceValidator]]
    });
    this.permanentAddressFormGroup = this.formBuilder.group({
      houseNumber: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), this.globalService.noWhitespaceValidator]],
      streetName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), this.globalService.noWhitespaceValidator]],
      area: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), this.globalService.noWhitespaceValidator]],
      city: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), this.globalService.noWhitespaceValidator]],
      state: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), this.globalService.noWhitespaceValidator]],
      pincode: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), this.globalService.noWhitespaceValidator]]
    });
    this.quarantineAddressFormGroup = this.formBuilder.group({
      houseNumber: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), this.globalService.noWhitespaceValidator]],
      streetName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), this.globalService.noWhitespaceValidator]],
      area: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), this.globalService.noWhitespaceValidator]],
      city: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), this.globalService.noWhitespaceValidator]],
      state: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), this.globalService.noWhitespaceValidator]],
      pincode: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), this.globalService.noWhitespaceValidator]]
    });
    this.quarantineTypeFormGroup = this.formBuilder.group({
      quarantineType: ['', Validators.required]
    });
  }

  saveForm(): void {
    if (this.currentAddressFormGroup.valid) {
      const formDetails: PatientAddressModel = {
        currentAddress : {
          houseNumber: this.currentAddressFormGroup.controls.houseNumber.value.trim(),
          streetName: this.currentAddressFormGroup.controls.streetName.value.trim(),
          area: this.currentAddressFormGroup.controls.area.value.trim(),
          city: this.currentAddressFormGroup.controls.city.value.trim(),
          state: this.currentAddressFormGroup.controls.state.value.trim(),
          pincode: this.currentAddressFormGroup.controls.pincode.value.trim()
        }, permanentAddress : {
          houseNumber: this.permanentAddressFormGroup.controls.houseNumber.value.trim(),
          streetName: this.permanentAddressFormGroup.controls.streetName.value.trim(),
          area: this.permanentAddressFormGroup.controls.area.value.trim(),
          city: this.permanentAddressFormGroup.controls.city.value.trim(),
          state: this.permanentAddressFormGroup.controls.state.value.trim(),
          pincode: this.permanentAddressFormGroup.controls.pincode.value.trim()
        }, quarantineAddress : {
          houseNumber: this.quarantineAddressFormGroup.controls.houseNumber.value.trim(),
          streetName: this.quarantineAddressFormGroup.controls.streetName.value.trim(),
          area: this.quarantineAddressFormGroup.controls.area.value.trim(),
          city: this.quarantineAddressFormGroup.controls.city.value.trim(),
          state: this.quarantineAddressFormGroup.controls.state.value.trim(),
          pincode: this.quarantineAddressFormGroup.controls.pincode.value.trim()
        },
        quarantineType: this.quarantineTypeFormGroup.controls.quarantineType.value.trim()
      } as PatientAddressModel;
      this.addressDetails.emit(formDetails);
      this.globalService.pincodeChange.next(this.quarantineAddressFormGroup.controls.pincode.value.trim());
    }
  }

  goBack(): void {
    this.previousStep.emit();
  }

  checkPermanentAddress(checked: boolean): void {
    if (checked) {
      const formDetails = this.currentAddressFormGroup.controls;
      this.permanentAddressFormGroup.controls.houseNumber.setValue(formDetails.houseNumber.value.trim());
      this.permanentAddressFormGroup.controls.streetName.setValue(formDetails.streetName.value.trim());
      this.permanentAddressFormGroup.controls.area.setValue(formDetails.area.value.trim());
      this.permanentAddressFormGroup.controls.city.setValue(formDetails.city.value.trim());
      this.permanentAddressFormGroup.controls.state.setValue(formDetails.state.value.trim());
      this.permanentAddressFormGroup.controls.pincode.setValue(formDetails.pincode.value.trim());
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
      this.quarantineAddressFormGroup.controls.houseNumber.setValue(formDetails.houseNumber.value.trim());
      this.quarantineAddressFormGroup.controls.streetName.setValue(formDetails.streetName.value.trim());
      this.quarantineAddressFormGroup.controls.area.setValue(formDetails.area.value.trim());
      this.quarantineAddressFormGroup.controls.city.setValue(formDetails.city.value.trim());
      this.quarantineAddressFormGroup.controls.state.setValue(formDetails.state.value.trim());
      this.quarantineAddressFormGroup.controls.pincode.setValue(formDetails.pincode.value.trim());
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
      this.quarantineAddressFormGroup.controls.houseNumber.setValue(formDetails.houseNumber.value.trim());
      this.quarantineAddressFormGroup.controls.streetName.setValue(formDetails.streetName.value.trim());
      this.quarantineAddressFormGroup.controls.area.setValue(formDetails.area.value.trim());
      this.quarantineAddressFormGroup.controls.city.setValue(formDetails.city.value.trim());
      this.quarantineAddressFormGroup.controls.state.setValue(formDetails.state.value.trim());
      this.quarantineAddressFormGroup.controls.pincode.setValue(formDetails.pincode.value.trim());
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
