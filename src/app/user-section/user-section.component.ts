import { Component, OnInit, Input, AfterViewInit, ViewChild, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import {
  UserSectionModel,
  UserModel,
  DefaultPaginatorValues,
  PersonalDetails,
  AdminDashboardUserModel
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
  @Input() tabIndex:number;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  dataSource: MatTableDataSource<AdminDashboardUserModel> = new MatTableDataSource<AdminDashboardUserModel>();
  displayedColumns: string[];
  searchModel: string;
  searchPincodeModel: string;
  userTableData: AdminDashboardUserModel[] = [];
  isDataAvailable: boolean = true;
  headerProps:{title:string, prop:string}[] = [{title:"ID", prop: 'id'}, {title:"Name", prop: 'name'}, {title:"Email", prop: 'email'}, {title:"Mobile No", prop: 'mobileNumber'}, {title: "Address", prop: 'address'}, {title: "Pincode", prop: 'pincode'}, {title: "Zone", prop: 'zone'}];
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
      this.dataSource.data = this.generateDataSource(this.userSectionDetails.users);
      this.isDataAvailable = true;
    } else {
      this.isDataAvailable = false;
    }
  }

  generateDataSource(users: UserModel[]): AdminDashboardUserModel[] {
    let userData: AdminDashboardUserModel[] = [];
    users.map(key => {
      userData.push({
        idNumber: key.id,
        name: key.firstName + ' ' + key.lastName,
        email: key.email,
        contactNumber: key.mobileNumber,
        zone: key.zone
      });
    });
    return userData;
  }

  searchTable(filterValue: string): void {    
    if(!filterValue)return;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.filteredData && this.dataSource.filteredData.length === 0) {
      this.isDataAvailable = false;
    } else {
      this.isDataAvailable = true;
    }    
  }

  viewDetails(userData: AdminDashboardUserModel):  void {
    let userDetails: UserModel = this.userSectionDetails.users.find(key => key.id === userData.idNumber);
    if (userDetails) {
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
        city: userDetails.city,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        idCardType: userDetails.governmentId,
        department: userDetails.department,
        designation: userDetails.designation,
        loginName: userDetails.loginName,
        password: userDetails.password
      };
      this.globalServices.lastSelectedAdminTab = this.tabIndex;
      this.globalServices.personalDetal = personalDetails;
      this.router.navigate(['/personal-details']);
    }
  }

  

  showFilters(): void {}

  enrollNewUser(): void {}

  refreshList(): void {
    this.searchModel = null;
    this.searchPincodeModel = null;
    this.dataSource.filter = null;
    this.refresh.emit();
  }

}
