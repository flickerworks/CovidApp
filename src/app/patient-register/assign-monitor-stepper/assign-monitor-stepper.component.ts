import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { 
  AssignMonitorModel,
  AssignMonitorColumns
} from '../../shared/models/shared.model';
import { MatTableDataSource } from '@angular/material';
import { GlobalServices } from '../../shared/services/global.services';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-assign-monitor-stepper',
  templateUrl: './assign-monitor-stepper.component.html',
  styleUrls: ['./assign-monitor-stepper.component.scss']
})
export class AssignMonitorStepperComponent implements OnInit {
  @Output() monitorDetails: EventEmitter<AssignMonitorModel> = new EventEmitter();
  @Output() previousStep: EventEmitter<any> = new EventEmitter();
  assignMonitorFormGroup: FormGroup;
  dataSource: MatTableDataSource<AssignMonitorModel> = new MatTableDataSource<AssignMonitorModel>();
  displayedColumns: string[];
  isDataAvailable: boolean = true;
  selection = new SelectionModel<AssignMonitorModel>(false, []);
  constructor(
    private formBuilder: FormBuilder,
    private globalServices: GlobalServices
  ) { }

  ngOnInit() {
    this.assignMonitorFormGroup = this.formBuilder.group({
      idNumber: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      zone: ['', Validators.required],
      email: ['', Validators.required],
      userType: ['', Validators.required]
    });
    this.displayedColumns = this.globalServices.enumToArray(AssignMonitorColumns)
    this.getMonitors();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  getMonitors(): void {
    this.dataSource.data = [{
      idNumber: '123',
      firstName: 'Test',
      lastName: 'User',
      mobileNumber: '1231231231',
      zone: 'Hinjewadi 1',
      email: 'test@gmai.com',
      userType: 'Monitor'
    },{
      idNumber: '456',
      firstName: 'Taran',
      lastName: 'Lamba',
      mobileNumber: '9988776655',
      zone: 'Hinjewadi 2',
      email: 'taran@gmai.com',
      userType: 'Monitor'
    },{
      idNumber: '789',
      firstName: 'Karan',
      lastName: 'User',
      mobileNumber: '4534567856',
      zone: 'Hinjewadi 3',
      email: 'karan@gmai.com',
      userType: 'Monitor'
    },{
      idNumber: '999',
      firstName: 'Hellow',
      lastName: 'User',
      mobileNumber: '7652947623',
      zone: 'Hinjewadi 5',
      email: 'hello@gmai.com',
      userType: 'Monitor'
    }];
  }

  saveMonitor(data: AssignMonitorModel) {
    if (data) {
      const formDetails: AssignMonitorModel = {
        idNumber: data.idNumber,
        firstName: data.firstName,
        lastName: data.lastName,
        mobileNumber: data.mobileNumber,
        zone: data.zone,
        email: data.email,
        userType: data.userType
      } as AssignMonitorModel;
      this.monitorDetails.emit(formDetails);
    }
  }

  goBack(): void {
    this.previousStep.emit();
  }

}
