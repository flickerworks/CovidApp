import { Component, OnInit, Input, AfterViewInit, ViewChild, OnChanges, Output, EventEmitter, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import {
  UserSectionModel,
  UserModel,
  DefaultPaginatorValues,
  UserTableColumns,
  PersonalDetails
} from '../shared/models/shared.model';
import { GlobalServices } from '../shared/services/global.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-section',
  templateUrl: './user-section.component.html',
  styleUrls: ['./user-section.component.scss']
})
export class UserSectionComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() userSectionDetails: UserSectionModel;
  @Output() refresh = new EventEmitter<null>();
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  dataSource: MatTableDataSource<UserModel> = new MatTableDataSource<UserModel>();
  displayedColumns: string[];
  searchModel: string;
  searchPincodeModel: string;
  userTableData: UserModel[] = [];
  isDataAvailable: boolean = true;
  
  constructor(
    private globalServices: GlobalServices,
    private router: Router
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.userTableData);
    
  }

  ngOnChanges(simpleChange: SimpleChanges){
    if(simpleChange.userSectionDetails) this.drawTable();
  }

  ngAfterViewInit(): void {
    if (this.dataSource && this.paginator) {
      this.paginator.pageSizeOptions = DefaultPaginatorValues;
      this.paginator.pageSize = DefaultPaginatorValues[0];
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  drawTable(){
    this.displayedColumns = this.userSectionDetails.tableColumns;
    if (this.userSectionDetails.users && this.userSectionDetails.users.length > 0) {
      this.dataSource.data = this.userSectionDetails.users;
      this.isDataAvailable = true;
    } else {
      this.isDataAvailable = false;
    }
  }

  searchTable(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewDetails(userDetails: UserModel):  void {
    const personalDetails: PersonalDetails = {
      name: `${this.globalServices.firstLetterUppercase(userDetails.firstName)} ${this.globalServices.firstLetterUppercase(userDetails.lastName)}`,
      type: userDetails.userType,
      id: userDetails.id,
      phone: userDetails.mobileNumber,
      email: userDetails.email,
      zone: userDetails.zone,
      houseNo: userDetails.doorNumber,
      street: userDetails.streetName,
      state: userDetails.state,
      area: userDetails.area,
      pincode: userDetails.pincode,
      city: userDetails.city     
    }
    this.globalServices.personalDetal = personalDetails;
    this.router.navigate(['/personal-details']);
  }

  

  showFilters(): void {}

  enrollNewUser(): void {}

  refreshList(): void {
    this.refresh.emit();
  }

}
