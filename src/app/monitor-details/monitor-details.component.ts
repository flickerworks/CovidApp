import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitor-details',
  templateUrl: './monitor-details.component.html',
  styleUrls: ['./monitor-details.component.scss']
})
export class MonitorDetailsComponent implements OnInit {
  criticalPatientDetails: {} = [{
    'name': 'Test tester',
    'id': 'CVD12345',
    'period': '10 Days',
    'area': 'Hinjewadi PH3',
    'symptoms': ['High Fever']
  },{
    'name': 'Abc Xyz',
    'id': 'CVD12346',
    'period': '9 Days',
    'area': 'Hinjewadi PH3',
    'symptoms': ['High Fever', 'Persitant Coughing']
  },{
    'name': 'Def Abc',
    'id': 'CVD12347',
    'period': '8 Days',
    'area': 'Hinjewadi PH3',
    'symptoms': ['High Fever','Fatgue']
  },{
    'name': 'Test User',
    'id': 'CVD12348',
    'period': '7 Days',
    'area': 'Hinjewadi PH3',
    'symptoms': ['High Fever']
  }]
  constructor() { }

  ngOnInit() {
  }

}
