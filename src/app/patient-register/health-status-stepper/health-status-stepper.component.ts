import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { 
  MobileNumberValidationPattern,
  EmailValidationPattern,
  GovernmentIdTypes,
  PatientHealthStatusModel
} from '../../shared/models/shared.model';

@Component({
  selector: 'app-health-status-stepper',
  templateUrl: './health-status-stepper.component.html',
  styleUrls: ['./health-status-stepper.component.scss']
})
export class HealthStatusStepperComponent implements OnInit {
  @Output() healthStatusForm: EventEmitter<PatientHealthStatusModel> = new EventEmitter();
  @Output() previousStep: EventEmitter<any> = new EventEmitter();
  healthStatusFormGroup: FormGroup;
  governmentIdTypes: string[] = GovernmentIdTypes;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.healthStatusFormGroup = this.formBuilder.group({
      fever: [false, Validators.required],
      temperature: ['', [Validators.required]],
      cough: [false, Validators.required],
      fatigue: [false, Validators.required],
      breathing: [false, Validators.required],
      diarrhea: [false, Validators.required],
      runnyNose: [false, Validators.required]
    });
    this.healthStatusFormGroup.updateValueAndValidity();
    // this.healthStatusFormGroup.markAllAsTouched();
  }

  saveForm(): void {
    if (this.healthStatusFormGroup.valid) {
      const formDetails: PatientHealthStatusModel = {
        fever: this.healthStatusFormGroup.controls.fever.value,
        temperature: this.healthStatusFormGroup.controls.temperature.value,
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