import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { 
  AssignMonitorModel,
  AssignMonitorColumns
} from '../../shared/models/shared.model';
import { MatTableDataSource } from '@angular/material';
import { GlobalServices } from '../../shared/services/global.services';
import { SelectionModel } from '@angular/cdk/collections';
import { RestfullServices } from 'src/app/shared/services/restfull.services';

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
    private globalServices: GlobalServices,
    private restAPI: RestfullServices
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
    this.globalServices.pincodeChange.subscribe(pincode => {
      this.getMonitors(pincode);
    })    
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  getMonitors(pincode: string): void {
    const request = {
      PINCODE: pincode
    }
    this.restAPI.post(request, "SEARCHMONITORBYPINCODE").subscribe(response => {
      const list = response[0].PAYLOAD.SEARCHMONITORBYPINCODE.MONITOR;
      if(Array.isArray(list)){        
        this.dataSource.data = [...this.drawResponse(list)];
        this.isDataAvailable = true;
      } else {
        if(list.FIRSTNAME !== ""){
          this.dataSource.data = [...this.drawResponse([list])];
          this.isDataAvailable = true;
        }else{
          this.isDataAvailable = false;
        }        
      }
    })
  }

  drawResponse(list){
    const data = [];
    list.forEach(ele => {
      const obj = {
        idNumber: ele.MID,
        firstName: ele.FIRSTNAME,
        lastName: ele.LASTNAME,
        mobileNumber: ele.PHONE,
        zone: ele.ZONE || "",
        email: ele.EMAIL,
        userType: "Monitor"
      }
      data.push(obj);
    });
    return data;
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
