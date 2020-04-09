import { Component, OnInit } from '@angular/core';
import { QuarantineTableColumns, MonitorTableColumns, LoginResponse, PatientDetails } from '../shared/models/shared.model';
import { GlobalServices } from '../shared/services/global.services';
import { RestfullServices } from '../shared/services/restfull.services';

@Component({
  selector: 'app-quarantine-manager-dashboard',
  templateUrl: './quarantine-manager-dashboard.component.html',
  styleUrls: ['./quarantine-manager-dashboard.component.scss']
})
export class QuarantineManagerDashboardComponent implements OnInit {
  tabIndex:number = 0;
  searchModel: string;
  loggedInUserDetails: LoginResponse;
  searchString: string;
  criticalCasesData = {
    users: [],
    tableColumns: []
  };
  flaggedCasesData = {
    users: [],
    tableColumns: []
  };

  totalCasesData = {
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
    const session = sessionStorage.getItem('loggedInUserDetails');
    if(this.globalServices.QMDashboardIndex){
      this.tabIndex = this.globalServices.QMDashboardIndex;
    }
    if(session){
      this.loggedInUserDetails = JSON.parse(session);
    }
    
    this.getDashboardData();
  }

  getDashboardData(){
    let pincode = "";
    if(this.loggedInUserDetails){
      pincode = this.loggedInUserDetails.pincode
    }
    let request = {
      PNCODE: pincode
    }
    this.restApi.post(request, "QMDASHBOARD").subscribe(response => {
      const data = response[0].PAYLOAD.QMDASHBOARD.RECORD;  
      if(Array.isArray(data)){
        const list = data.reverse();
        this.getTotalCases(list); 
        this.getCriticalCases(list);
        this.getFlaggedCases(list);
        this.getMonitorList(list);
      }else{
        if(data.QFIRSTNAME !== ""){
          const list = [data];
          this.getTotalCases(list); 
          this.getCriticalCases(list);
          this.getFlaggedCases(list);
          this.getMonitorList(list);
        }        
      }      
    })
  }

  getCriticalCases(list):void {
    let dataList = [];
    list.forEach(ele => {
      if(ele.CRITICAL && ele.CRITICAL.toUpperCase() === "Y"){
        let obj: PatientDetails = {
          name: ele.QFIRSTNAME,
          id: ele.QID,
          contactNumber: ele.MOBILENUMBER,
          mail: ele.EMAIL,
          zone: ele.ZONE,
          period: this.globalServices.getDaysCount(ele.START ? new Date(ele.START) : new Date(), new Date()),
          symptoms: (ele.SYMPTOM) ? ele.SYMPTOM.split("+"):"",
          monitoredBy: `${ele.MFIRSTNAME} ${ele.MLASTNAME}`
        } 
        dataList.push(obj);
      }        
    });
    const data ={
      users: [...dataList],
      tableColumns: this.globalServices.enumToArray(QuarantineTableColumns)
    }
    
    this.criticalCasesData = JSON.parse(JSON.stringify(data));

  }

  getTotalCases(list):void {
    let dataList = [];
    list.forEach(ele => {      
        let obj: PatientDetails = {
          name: ele.QFIRSTNAME,
          id: ele.QID,
          contactNumber: ele.MOBILENUMBER,
          mail: ele.EMAIL,
          zone: ele.ZONE,
          period: this.globalServices.getDaysCount(ele.START ? new Date(ele.START) : new Date(), new Date()),
          symptoms: (ele.SYMPTOM) ? ele.SYMPTOM.split("+"):"",
          monitoredBy: `${ele.MFIRSTNAME} ${ele.MLASTNAME}`
        } 
        dataList.push(obj);      
    });
    const data ={
      users: [...dataList],
      tableColumns: this.globalServices.enumToArray(QuarantineTableColumns)
    }
    
    this.totalCasesData = JSON.parse(JSON.stringify(data));    
  }

  getFlaggedCases(list): void{
    let dataList = [];
    list.forEach(ele => {
      if(ele.FLAGGED && ele.FLAGGED.toUpperCase() === "Y"){
        let obj: PatientDetails = {
          name: ele.QFIRSTNAME,
          id: ele.QID,
          contactNumber: ele.MOBILENUMBER,
          mail: ele.EMAIL,
          zone: ele.ZONE,
          period: this.globalServices.getDaysCount(ele.START ? new Date(ele.START) : new Date(), new Date()),
          symptoms: (ele.SYMPTOM) ? ele.SYMPTOM.split("+"):"",
          monitoredBy: `${ele.MFIRSTNAME} ${ele.MLASTNAME}`
        } 
        dataList.push(obj);
      }        
    });
    const data ={
      users: [...dataList],
      tableColumns: this.globalServices.enumToArray(QuarantineTableColumns)
    }
    
    this.flaggedCasesData = JSON.parse(JSON.stringify(data));
  }

  getMonitorList(list): void{
    let monitors = {};
    let dataList = [];
    list.forEach(ele => {
      if(!monitors[ele.MID]){
        monitors[ele.MID] = [];
        monitors[ele.MID].push(ele);
      }else{
        monitors[ele.MID].push(ele);
      }
    })
    for(let key in monitors){
      const detail = monitors[key][0];
      let obj: PatientDetails = {
        name: `${detail.MFIRSTNAME} ${detail.MLASTNAME}`,
        id: detail.MID,
        contactNumber: detail.MOBILENUMBER,
        mail: detail.EMAIL,
        zone: detail.ZONE,
        critical: this.getPropCount(monitors[key], 'CRITICAL'),
        flaged: this.getPropCount(monitors[key], 'FLAGGED')
      } 
      dataList.push(obj);
    }
    const data ={
      users: [...dataList],
      tableColumns: this.globalServices.enumToArray(MonitorTableColumns)
    }
    
    this.monitorDetails = JSON.parse(JSON.stringify(data));
  }

  getPropCount(list, prop:string):number {
    const filteredData = list.filter(ele => {
      return ele[prop] && ele[prop].toUpperCase() === "Y";
    })
    return filteredData.length;
  }


  searchTable(filterValue: string): void {
    this.searchString = filterValue;
  }

  refreshList(){
    this.searchString = null;
    this.searchModel = null;
    this.getDashboardData();
  }
}
