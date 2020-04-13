import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuarantineTypes, PatientAddressModel, PincodeValidationPattern, State, MapAddress, City } from '../../shared/models/shared.model';
import { GlobalServices } from 'src/app/shared/services/global.services';
import { RestfullServices } from 'src/app/shared/services/restfull.services';

@Component({
  selector: 'app-address-stepper',
  templateUrl: './address-stepper.component.html',
  styleUrls: ['./address-stepper.component.scss']
})
export class AddressStepperComponent implements OnInit {
  @Output() addressDetails: EventEmitter<PatientAddressModel> = new EventEmitter();
  @Output() previousStep: EventEmitter<any> = new EventEmitter();
  // @ViewChild('area1', {static: false}) searchElementRef: ElementRef;
  markCurrentAddress: boolean = false;
  markPermanentAddress2: boolean = false;
  markPermanentAddress: boolean = false;
  currentAddressFormGroup: FormGroup;
  permanentAddressFormGroup: FormGroup;
  quarantineAddressFormGroup: FormGroup;
  quarantineTypeFormGroup: FormGroup;
  quarantineTypes: string[] = QuarantineTypes;
  states: State[] = [];
  allCities: City[] = [];
  cities_p: City[] = [];
  cities_c: City[] = [];
  cities_q: City[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private globalService: GlobalServices,
    private restfullServices: RestfullServices
  ) { }

  ngOnInit() {
    this.currentAddressFormGroup = this.formBuilder.group({
      houseNumber: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), this.globalService.noWhitespaceValidator]],
      streetName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100), this.globalService.noWhitespaceValidator]],
      area: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100), this.globalService.noWhitespaceValidator]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern(PincodeValidationPattern), this.globalService.noWhitespaceValidator]],
      zone: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), this.globalService.noWhitespaceValidator]]
    });
    this.permanentAddressFormGroup = this.formBuilder.group({
      houseNumber: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), this.globalService.noWhitespaceValidator]],
      streetName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100), this.globalService.noWhitespaceValidator]],
      area: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100), this.globalService.noWhitespaceValidator]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern(PincodeValidationPattern), this.globalService.noWhitespaceValidator]],
      zone: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), this.globalService.noWhitespaceValidator]]
    });
    this.quarantineAddressFormGroup = this.formBuilder.group({
      houseNumber: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), this.globalService.noWhitespaceValidator]],
      streetName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100), this.globalService.noWhitespaceValidator]],
      area: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100), this.globalService.noWhitespaceValidator]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern(PincodeValidationPattern), this.globalService.noWhitespaceValidator]],
      zone: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), this.globalService.noWhitespaceValidator]]
    });
    this.quarantineTypeFormGroup = this.formBuilder.group({
      quarantineType: ['', Validators.required]
    });

    this.updateValueOnChange();
    this.onCurrentAddressChange();
    this.getStateAndCity();
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
          pincode: this.currentAddressFormGroup.controls.pincode.value.trim(),
          zone: this.currentAddressFormGroup.controls.zone.value.trim()
        }, permanentAddress : {
          houseNumber: this.permanentAddressFormGroup.controls.houseNumber.value.trim(),
          streetName: this.permanentAddressFormGroup.controls.streetName.value.trim(),
          area: this.permanentAddressFormGroup.controls.area.value.trim(),
          city: this.permanentAddressFormGroup.controls.city.value.trim(),
          state: this.permanentAddressFormGroup.controls.state.value.trim(),
          pincode: this.permanentAddressFormGroup.controls.pincode.value.trim(),
          zone: this.currentAddressFormGroup.controls.zone.value.trim()
        }, quarantineAddress : {
          houseNumber: this.quarantineAddressFormGroup.controls.houseNumber.value.trim(),
          streetName: this.quarantineAddressFormGroup.controls.streetName.value.trim(),
          area: this.quarantineAddressFormGroup.controls.area.value.trim(),
          city: this.quarantineAddressFormGroup.controls.city.value.trim(),
          state: this.quarantineAddressFormGroup.controls.state.value.trim(),
          pincode: this.quarantineAddressFormGroup.controls.pincode.value.trim(),
          zone: this.currentAddressFormGroup.controls.zone.value.trim()
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

  updateValueOnChange(){
    this.quarantineAddressFormGroup.valueChanges.subscribe(fg => {
      const isCurrentReset = !this.markCurrentAddress && this.currentAddressFormGroup.get('houseNumber').value && this.currentAddressFormGroup.get('houseNumber').value.trim();
      const isPermanentReset = !this.markPermanentAddress && this.permanentAddressFormGroup.get('houseNumber').value && this.permanentAddressFormGroup.get('houseNumber').value.trim();
      this.checkCurrentAddress(this.markCurrentAddress, isCurrentReset);
      this.checkPermanentAddress_1(this.markPermanentAddress, isPermanentReset);
    })
    
  }

  onCurrentAddressChange(){
    this.currentAddressFormGroup.valueChanges.subscribe(fg => {
      if(!this.markPermanentAddress){
        this.checkPermanentAddress_2(this.markPermanentAddress2);
      }      
    })
  }

  checkCurrentAddress(checked: boolean, isReset: boolean = true): void {    
    if (checked) {
      this.changeState({value:this.quarantineAddressFormGroup.get('state').value}, 'c', this.quarantineAddressFormGroup.get('city').value);
      this.currentAddressFormGroup.patchValue(this.quarantineAddressFormGroup.value);
      this.currentAddressFormGroup.updateValueAndValidity({emitEvent: false});
      this.currentAddressFormGroup.markAllAsTouched();
      this.cities_c = this.cities_q;
    } else {
      if(isReset){
        this.currentAddressFormGroup.reset();        
        this.currentAddressFormGroup.get('state').setValue("");
        this.currentAddressFormGroup.get('city').setValue("");
        this.currentAddressFormGroup.updateValueAndValidity({emitEvent: false});
        this.cities_c = [];
      }      
    }
  }

  checkPermanentAddress_1(checked: boolean, isReset: boolean = true): void {
    if (checked){
      this.changeState({value:this.quarantineAddressFormGroup.get('state').value}, 'p', this.quarantineAddressFormGroup.get('city').value);
      this.permanentAddressFormGroup.patchValue(this.quarantineAddressFormGroup.value);
      this.permanentAddressFormGroup.updateValueAndValidity();
      this.permanentAddressFormGroup.markAllAsTouched();
      this.cities_p = this.cities_q;
    }else{
      if(isReset){
        this.permanentAddressFormGroup.reset();
        this.permanentAddressFormGroup.get('state').setValue("");
        this.permanentAddressFormGroup.get('city').setValue("");
        this.permanentAddressFormGroup.updateValueAndValidity();
        this.cities_p = [];
      }      
    }
  }

  checkPermanentAddress_2(checked: boolean, isReset: boolean = true): void {
    if (checked){
      this.changeState({value:this.currentAddressFormGroup.get('state').value}, 'p', this.currentAddressFormGroup.get('city').value);
      this.permanentAddressFormGroup.patchValue(this.currentAddressFormGroup.value);
      this.permanentAddressFormGroup.updateValueAndValidity();
      this.permanentAddressFormGroup.markAllAsTouched();
      this.cities_p = this.cities_c;
    }else{
      if(isReset){
        this.permanentAddressFormGroup.reset();
        this.permanentAddressFormGroup.get('state').setValue("");
        this.permanentAddressFormGroup.get('city').setValue("");
        this.permanentAddressFormGroup.updateValueAndValidity();
        this.cities_p = [];
      }      
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

  addressChange(address: MapAddress){
    this.quarantineAddressFormGroup.get('streetName').setValue(address.street);    
    this.quarantineAddressFormGroup.get('state').setValue(address.state);
    this.quarantineAddressFormGroup.get('state').updateValueAndValidity();
    this.changeState({value:address.state}, 'q', address.city);
    // this.quarantineAddressFormGroup.get('city').setValue(address.city);
    
    this.quarantineAddressFormGroup.get('pincode').setValue(address.pincode);
    this.quarantineAddressFormGroup.get('area').setValue(address.area);
    this.quarantineAddressFormGroup.updateValueAndValidity();
    this.quarantineAddressFormGroup.get('streetName').markAllAsTouched();
    this.quarantineAddressFormGroup.get('city').markAllAsTouched();
    this.quarantineAddressFormGroup.get('state').markAllAsTouched();
    this.quarantineAddressFormGroup.get('pincode').markAllAsTouched();
    this.quarantineAddressFormGroup.get('area').markAllAsTouched();
  }

  getStateAndCity(){
    this.states = this.restfullServices.states;
    this.allCities = this.restfullServices.allCities;
  }

  changeState(event, type: string, city?: string){
    const name = event.value;
    if(!name)return;
    const state = this.states.filter(state => state.name.toUpperCase() === name.toUpperCase());
    if(!state.length) return;
    const id = state[0].id;
    this['cities_'+type] = this.allCities.filter((city: City) => {
      return city.state_id === id;
    })
    if(city && type == "q"){
      this.quarantineAddressFormGroup.get('city').setValue(city);
      this.quarantineAddressFormGroup.get('city').updateValueAndValidity();
    }
  }

  changeCity(event){
    console.log(this.quarantineAddressFormGroup.get('state').value);
    console.log(this.quarantineAddressFormGroup.get('city').value);
  }
  
}
