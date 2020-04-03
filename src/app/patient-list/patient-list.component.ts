import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  @Input() patientDetails: {};
  
  constructor() { }

  ngOnInit() {}
}
