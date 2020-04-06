import { Component, OnInit, Input } from '@angular/core';
import { PatientDetails } from '../shared/models/shared.model';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  @Input() patientDetails: PatientDetails;
  
  constructor() { }

  ngOnInit() {}
}
