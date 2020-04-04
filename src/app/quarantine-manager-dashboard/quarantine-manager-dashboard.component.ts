import { Component, OnInit } from '@angular/core';
import { QuarantineTableColumns, MonitorTableColumns } from '../shared/models/shared.model';
import { GlobalServices } from '../shared/services/global.services';
import { RestfullServices } from '../shared/services/restfull.services';

@Component({
  selector: 'app-quarantine-manager-dashboard',
  templateUrl: './quarantine-manager-dashboard.component.html',
  styleUrls: ['./quarantine-manager-dashboard.component.scss']
})
export class QuarantineManagerDashboardComponent implements OnInit {
  searchModel: string;
  searchString: string;
  criticalCasesData = {
    users: [],
    tableColumns: []
  };
  monitorDetails = {
    users: [],
    tableColumns: []
  };
  constructor(
    private globalServices: GlobalServices,
    private restApi: RestfullServices
  ) { }

  ngOnInit() {
    this.criticalCasesData = {
      users: [{
        'name': 'Test tester',
        'id': 'CVD12345',
        'contactNumber': '1234567890',
        'mail': 'test@gmail.com',
        'zone': 'Hinjewadi PH3',
        'period': '10 Days',
        'symptoms': ['High Fever'],
        'monitoredBy': 'Xyz'
      },{
        'name': 'Abc Xyz',
        'id': 'CVD12346',
        'contactNumber': '1234567890',
        'mail': 'test@gmail.com',
        'zone': 'Hinjewadi PH3',
        'period': '9 Days',
        'symptoms': ['High Fever', 'Persitant Coughing'],
        'monitoredBy': 'Xyz'
      },{
        'name': 'Def Abc',
        'id': 'CVD12347',
        'contactNumber': '1234567890',
        'mail': 'test@gmail.com',
        'zone': 'Hinjewadi PH3',
        'period': '8 Days',
        'symptoms': ['High Fever','Fatgue'],
        'monitoredBy': 'Xyz'
      },{
        'name': 'Test User',
        'id': 'CVD12348',
        'contactNumber': '1234567890',
        'mail': 'test@gmail.com',
        'zone': 'Hinjewadi PH3',
        'period': '7 Days',
        'symptoms': ['High Fever'],
        'monitoredBy': 'Xyz'
      }],
      tableColumns: this.globalServices.enumToArray(QuarantineTableColumns)
    };
    this.monitorDetails = {
      users: [{
        'name': 'Test tester',
        'id': 'CVD12345',
        'contactNumber': '1234567890',
        'mail': 'test@gmail.com',
        'zone': 'Hinjewadi PH3',
        'critical' : '12',
        'flaged': '10'
      },{
        'name': 'Abc Xyz',
        'id': 'CVD12346',
        'contactNumber': '1234567890',
        'mail': 'test@gmail.com',
        'zone': 'Hinjewadi PH3',
        'critical' : '12',
        'flaged': '10'
      },{
        'name': 'Def Abc',
        'id': 'CVD12347',
        'contactNumber': '1234567890',
        'mail': 'test@gmail.com',
        'zone': 'Hinjewadi PH3',
        'critical' : '12',
        'flaged': '10'
      },{
        'name': 'Test User',
        'id': 'CVD12348',
        'contactNumber': '1234567890',
        'mail': 'test@gmail.com',
        'zone': 'Hinjewadi PH3',
        'critical' : '12',
        'flaged': '10'
      }],
      tableColumns: this.globalServices.enumToArray(MonitorTableColumns)
    };
    this.getDashboardData();
  }

  getDashboardData(){
    const request = {
      PNCODE: "560068"
    }
    this.restApi.post(request, "QMDASHBOARD").subscribe(response => {
      const list = response[0].PAYLOAD.QMDASHBOARD.RECORD;
      console.log(list);
    })
  }

  searchTable(filterValue: string): void {
    this.searchString = filterValue;
  }

  refreshList(){

  }
}
