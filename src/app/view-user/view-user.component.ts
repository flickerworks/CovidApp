import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import {
  DefaultErrorMessage,
  UserModel,
  UserSectionModel,
  UserTableColumns
} from '../shared/models/shared.model';
import { RestfullServices } from '../shared/services/restfull.services';
import { AlertDialogComponent } from '../shared/components/alert-dialog/alert-dialog.component';
import { GlobalServices } from '../shared/services/global.services';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit, OnDestroy {
  quarantineManagerData: UserModel[];
  monitorsData: UserModel[];
  quarantineManagerSectionDetails: UserSectionModel;
  monitorsSectionDetails: UserSectionModel;
  isDataAvailable: boolean = true;
  userTableSubscription: Subscription;
  updateUserTableSubscription: Subscription;

  constructor(
    private restfullServices: RestfullServices,
    public dialog: MatDialog,
    private globalServices: GlobalServices
  ) { }

  ngOnInit() {
    this.getUserTableData();
  }

  ngOnDestroy(): void {
    // if (this.userTableSubscription) {
    //   this.userTableSubscription.unsubscribe();
    // }
    // if (this.updateUserTableSubscription) {
    //   this.updateUserTableSubscription.unsubscribe();
    // }
  }

  getUserTableData(): void {
    this.quarantineManagerData = [{
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
      userType: 'Quarantine Managers'
    }];
    this.monitorsData = [{
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
      userType: 'Monitors'
    }];
    this.quarantineManagerSectionDetails = {
      totalUsers: 100,
      totalZones: 20,
      users: this.quarantineManagerData,
      userType: 'Quarantine Manager',
      tableColumns: this.globalServices.enumToArray(UserTableColumns),
      enrollNewUser: false,
      showCount: true
    }
    this.monitorsSectionDetails = {
      totalUsers: 600,
      totalZones: 20,
      users: this.monitorsData,
      userType: 'Monitors',
      tableColumns: this.globalServices.enumToArray(UserTableColumns),
      enrollNewUser: false,
      showCount: true
    }
  }

}
