import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import {
  DefaultErrorMessage,
  UserModel,
  UserSectionModel,
  PatientTableColumns
} from '../shared/models/shared.model';
import { GlobalServices } from '../shared/services/global.services';
import { RestfullServices } from '../shared/services/restfull.services';
import { AlertDialogComponent } from '../shared/components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  patientList: UserModel[];
  patientSectionDetails: UserSectionModel;
  isDataAvailable: boolean = true;
  userTableSubscription: Subscription;
  updateUserTableSubscription: Subscription;

  constructor(
    private restfullServices: RestfullServices,
    public dialog: MatDialog,
    private globalServices: GlobalServices
  ) { }

  ngOnInit() {
    this.getPatientList();
  }

  ngOnDestroy(): void {
    // if (this.userTableSubscription) {
    //   this.userTableSubscription.unsubscribe();
    // }
    // if (this.updateUserTableSubscription) {
    //   this.updateUserTableSubscription.unsubscribe();
    // }
  }

  getPatientList(): void {
    this.patientList = [{
      id: 123,
      firstName: 'Test',
      lastName: 'User',
      email: 'test@gmail.com',
      mobileNumber: 9999403408,
      alternateMobileNumber: 8882667658,
      governmentId: '1234-5678-90',
      doorNumber: '1303',
      streetName: 'Supertech Capetown',
      area: 'Sector 74',
      city: 'Noida',
      state: 'UP',
      pincode: '201306',
      zone: 'Zone 1 201306',
      monitorAssigned: 'Taran',
      userType: 'Quarantine Managers'
    },{
      id: 456,
      firstName: 'Jaspreet',
      lastName: 'Singh',
      email: 'jslamba@gmail.com',
      mobileNumber: 9988776655,
      alternateMobileNumber: 9876598765,
      governmentId: '0987-6543-21',
      doorNumber: 'C-20',
      streetName: 'West Model Town',
      area: 'Ghaziabad',
      city: 'Ghaziabad',
      state: 'UP',
      pincode: '201301',
      zone: 'Zone 1 201301',
      monitorAssigned: 'Taran',
      userType: 'Quarantine Managers'
    },{
      id: 765,
      firstName: 'Taran',
      lastName: 'Lamba',
      email: 'taran@gmail.com',
      mobileNumber: 123456789,
      alternateMobileNumber: 321233311,
      governmentId: '1234-5678-90',
      doorNumber: '1303',
      streetName: 'Supertech Capetown',
      area: 'Sector 74',
      city: 'Noida',
      state: 'UP',
      pincode: '201306',
      zone: 'Zone 1 201306',
      monitorAssigned: 'Karan',
      userType: 'Monitors'
    },{
      id: 876,
      firstName: 'Jaspreet',
      lastName: 'Singh',
      email: 'jslamba@gmail.com',
      mobileNumber: 9988776655,
      alternateMobileNumber: 9876598765,
      governmentId: '0987-6543-21',
      doorNumber: 'C-20',
      streetName: 'West Model Town',
      area: 'Ghaziabad',
      city: 'Ghaziabad',
      state: 'UP',
      pincode: '201301',
      zone: 'Zone 1 201301',
      monitorAssigned: 'Taran',
      userType: 'Monitors'
    },{
      id: 654,
      firstName: 'Karan',
      lastName: 'Singh',
      email: 'karan@gmail.com',
      mobileNumber: 543212345,
      alternateMobileNumber: 1233454321,
      governmentId: '0912-4657-38',
      doorNumber: '123',
      streetName: 'Nirala Estate',
      area: 'Noida',
      city: 'Noida',
      state: 'UP',
      pincode: '201306',
      zone: 'Zone 1 201306',
      monitorAssigned: 'Taran',
      userType: 'Monitors'
    }];
    
    this.patientSectionDetails = {
      users: this.patientList,
      tableColumns: this.globalServices.enumToArray(PatientTableColumns),
      enrollNewUser: true,
      showCount: false,
      searchByPincode: true
    };
  }

}
