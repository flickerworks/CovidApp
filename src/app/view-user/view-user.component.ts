import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import {
  UserRegisterModel,
  DefaultPaginatorValues,
  UserTableColumns,
  BooleanOptionValues,
  DefaultErrorMessage
} from '../shared/models/shared.model';
import { RestfullServices } from '../shared/services/restfull.services';
import { AlertDialogComponent } from '../shared/components/alert-dialog/alert-dialog.component';
import { GlobalServices } from '../shared/services/global.services';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  dataSource: MatTableDataSource<UserRegisterModel> = new MatTableDataSource<UserRegisterModel>();
  displayedColumns: string[];
  userTableData: UserRegisterModel[] = [];
  booleanOptionValues: string[] = BooleanOptionValues;
  isDataAvailable: boolean = true;
  userTableSubscription: Subscription;
  updateUserTableSubscription: Subscription;

  constructor(
    private restfullServices: RestfullServices,
    public dialog: MatDialog,
    private globalServices: GlobalServices
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.userTableData);
    this.displayedColumns = this.globalServices.enumToArray(UserTableColumns);
    this.getUserTableData();
  }

  ngAfterViewInit(): void {
    if (this.dataSource && this.paginator) {
      this.paginator.pageSizeOptions = DefaultPaginatorValues;
      this.paginator.pageSize = DefaultPaginatorValues[1];
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnDestroy(): void {
    // if (this.userTableSubscription) {
    //   this.userTableSubscription.unsubscribe();
    // }
    // if (this.updateUserTableSubscription) {
    //   this.updateUserTableSubscription.unsubscribe();
    // }
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getUserTableData(): void {
    this.dataSource.data = [];
    this.dataSource.data = [{
      id: 123,
      firstName: 'Test',
      lastName: 'User',
      mobileNumber: 123456789,
      landLineNumber: '',
      city: 'Noida',
      address: 'Sector 74',
      email: 'test@gmail.com',
      userName: 'test',
      userType: 'Quarantine Managers',
    },{
      id: 123,
      firstName: 'Test',
      lastName: 'User',
      mobileNumber: 123456789,
      landLineNumber: '',
      city: 'Noida',
      address: 'Sector 74',
      email: 'test@gmail.com',
      userName: 'test',
      userType: 'Quarantine Managers',
    }];
  }

}
