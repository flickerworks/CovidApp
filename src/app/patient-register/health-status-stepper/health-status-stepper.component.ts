import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { 
  TemperatureValidationPattern,
  PatientHealthStatusModel
} from '../../shared/models/shared.model';
import { GlobalServices } from '../../shared/services/global.services';

@Component({
  selector: 'app-health-status-stepper',
  templateUrl: './health-status-stepper.component.html',
  styleUrls: ['./health-status-stepper.component.scss']
})
export class HealthStatusStepperComponent implements OnInit {
  @Output() healthStatusForm: EventEmitter<PatientHealthStatusModel> = new EventEmitter();
  @Output() previousStep: EventEmitter<any> = new EventEmitter();
  healthStatusFormGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private globalService: GlobalServices
  ) { }

  ngOnInit() {
    this.healthStatusFormGroup = this.formBuilder.group({
      fever: [false],
      temperature: [''],
      cough: [false],
      fatigue: [false],
      breathing: [false],
      diarrhea: [false],
      runnyNose: [false]
    });
    this.healthStatusFormGroup.updateValueAndValidity();
    this.healthStatusFormGroup.controls.fever.valueChanges.subscribe(value => {
      if(value){
        this.healthStatusFormGroup.controls.temperature.setValidators([Validators.required, Validators.max(106), Validators.min(96)]);        
      }else{
        this.healthStatusFormGroup.controls.temperature.clearValidators();
        this.healthStatusFormGroup.controls.temperature.setValidators([Validators.max(106), Validators.min(96)]);        
      }
      this.healthStatusFormGroup.controls.temperature.updateValueAndValidity();
      this.healthStatusFormGroup.updateValueAndValidity();
    })
  }

  saveForm(): void {
    if (this.healthStatusFormGroup.valid) {
      const formDetails: PatientHealthStatusModel = {
        fever: this.healthStatusFormGroup.controls.fever.value,
        temperature: this.healthStatusFormGroup.controls.temperature.value.trim(),
        cough: this.healthStatusFormGroup.controls.cough.value,
        fatigue: this.healthStatusFormGroup.controls.fatigue.value,
        breathing: this.healthStatusFormGroup.controls.breathing.value,
        diarrhea: this.healthStatusFormGroup.controls.diarrhea.value,
        runnyNose: this.healthStatusFormGroup.controls.runnyNose.value,
      } as PatientHealthStatusModel;
      this.healthStatusForm.emit(formDetails);
    }
  }

  goBack(): void {
    this.previousStep.emit();
  }
}
