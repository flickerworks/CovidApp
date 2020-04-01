import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import {
  UserSectionModel,
  UserModel,
  DefaultPaginatorValues,
  UserTableColumns
} from '../shared/models/shared.model';
import { GlobalServices } from '../shared/services/global.services';

@Component({
  selector: 'app-user-section',
  templateUrl: './user-section.component.html',
  styleUrls: ['./user-section.component.scss']
})
export class UserSectionComponent implements OnInit, AfterViewInit {
  @Input() userSectionDetails: UserSectionModel;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  dataSource: MatTableDataSource<UserModel> = new MatTableDataSource<UserModel>();
  displayedColumns: string[];
  searchModel: string;
  searchPincodeModel: string;
  userTableData: UserModel[] = [];
  isDataAvailable: boolean = true;
  
  constructor(
    private globalServices: GlobalServices
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.userTableData);
    this.displayedColumns = this.userSectionDetails.tableColumns;
    if (this.userSectionDetails.users && this.userSectionDetails.users.length > 0) {
      this.dataSource.data = this.userSectionDetails.users;
      this.isDataAvailable = true;
    } else {
      this.isDataAvailable = false;
    }
  }

  ngAfterViewInit(): void {
    if (this.dataSource && this.paginator) {
      this.paginator.pageSizeOptions = DefaultPaginatorValues;
      this.paginator.pageSize = DefaultPaginatorValues[0];
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  searchTable(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewDetails(userDetails: UserModel):  void {
    console.log(userDetails);
  }

  showFilters(): void {}

  enrollNewUser(): void {}

  refreshList(): void {}

}
