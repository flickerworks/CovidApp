import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import {
  DefaultErrorMessage,
  UserModel,
  UserSectionModel,
  UserTableColumns,
  MonitorAndManagerList
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
  tabIndex: number = 0;
  quarantineManagerData: UserModel[]=[];
  monitorsData: UserModel[];
  quarantineManagerSectionDetails: UserSectionModel = new UserSectionModel();
  monitorsSectionDetails: UserSectionModel = new UserSectionModel();
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
    if(this.globalServices.lastSelectedAdminTab){
      this.tabIndex = this.globalServices.lastSelectedAdminTab;
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

  getQManagerList():void{
    const request = {};
    this.restfullServices.post(request, "LISTQMGRS").subscribe(response => {
      const data = this.drawUserModalData(response, 'manager');
      this.quarantineManagerData = data;
      this.quarantineManagerSectionDetails = {
        totalUsers: this.quarantineManagerData.length ,
        totalZones: this.globalServices.getZoneCount(this.quarantineManagerData),
        users: this.quarantineManagerData,
        userType: 'Quarantine Manager',
        tableColumns: this.globalServices.enumToArray(UserTableColumns),
        enrollNewUser: false,
        showCount: true
      }
    })
  }

  getMonitorsList():void{
    const request = {};
    this.restfullServices.post(request, "LISTMONITOR").subscribe(response => {      
      this.monitorsData = this.drawUserModalData(response, 'monitor');
      this.monitorsSectionDetails = {
        totalUsers: this.monitorsData.length,
        totalZones: this.globalServices.getZoneCount(this.monitorsData),
        users: this.monitorsData,
        userType: 'Monitors',
        tableColumns: this.globalServices.enumToArray(UserTableColumns),
        enrollNewUser: false,
        showCount: true
      }
    })
  }

  getUserTableData(): void {
    this.getQManagerList();

    this.getMonitorsList();    
  }

  drawUserModalData(response, type: string):UserModel[] {
    let data: MonitorAndManagerList[];
    if(type==='monitor'){
      data = response[0].PAYLOAD.LISTMONITOR.MONITOR;
    }else{
      data = response[0].PAYLOAD.LISTQMGRS.QURANTINEMGR;
    }
    
    let list = [];
    if(Array.isArray(data)){
      data.forEach((ele:MonitorAndManagerList) => {
        const obj = this.drawObject(ele, type);
        list.push(obj);
      });
    }else{
      const obj = this.drawObject(data, type);
      list.push(obj);
    }      
    return list.reverse();
  }

  drawObject(ele, type){
    const obj: UserModel = {
      id: (type==='monitor') ?ele.MID : ele.QMID,
      firstName: ele.FIRSTNAME,
      lastName: ele.LASTNAME,
      email: ele.EMAIL,
      mobileNumber: ele.PHONE,
      alternateMobileNumber:0,
      governmentId:ele.IDCARDTYPE,
      doorNumber: ele.HNO,
      streetName: ele.STREETNAME,
      area: ele.AREA,
      city: ele.CITY,
      state: ele.STATE,
      pincode: ele.PINCODE,
      zone: ele.ZONE,
      monitorAssigned:'',
      designation: ele.DESIGNATION,
      department: ele.DEPARTMENT,
      loginName: ele.LOGINNAME,
      password: ele.PASSWORD,
      userType:(type==='monitor') ? 'Monitor' : 'Quarantine Manager'
    }
    return obj;
  }




}
