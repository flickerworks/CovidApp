import { Component, OnInit } from '@angular/core';
import { GlobalServices } from '../shared/services/global.services';
import { PatientDetails } from '../shared/models/shared.model';
import { RestfullServices } from '../shared/services/restfull.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monitor-details',
  templateUrl: './monitor-details.component.html',
  styleUrls: ['./monitor-details.component.scss']
})
export class MonitorDetailsComponent implements OnInit {
  criticalPatientDetails: PatientDetails[] = [];
  missedPatientDetails: PatientDetails[] = [];
  reviewedPatientDetails: PatientDetails[] = [];
  flaggedPatientDetails: PatientDetails[] = [];
  allPatientDetails: PatientDetails[] = [];
  monitor:PatientDetails;
  constructor(
    private globalService: GlobalServices, 
    private restService: RestfullServices,
    private router: Router
    ) { }

  ngOnInit() {
    this.monitor = this.globalService.monitorDetail;
    if(!this.monitor){
      this.router.navigate(['/quarantine-dashboard']);
    }else{
      this.getMonitorDetails();
    }
    
  }

  goBack(){
    this.router.navigate(['/quarantine-dashboard']);
  }

  getMonitorDetails():void{
    this.criticalPatientDetails = this.missedPatientDetails = this.reviewedPatientDetails = this.allPatientDetails= [];

    const request = {
      MID: this.monitor.id
    }
    this.restService.post(request, "FETCHUSERBYMID").subscribe(response => {
      const list = response[0].PAYLOAD.FETCHUSERBYMID.RECORD;
      if(Array.isArray(list)){
        this.criticalPatientDetails = [...this.drawCriticalPatientList(list, 'CRITICAL')];
        this.missedPatientDetails = [...this.drawCriticalPatientList(list, 'MISSEDUPDATE')];
        this.reviewedPatientDetails = [...this.drawCriticalPatientList(list, 'PENDINGREVIEW')];
        this.flaggedPatientDetails = [...this.drawCriticalPatientList(list, 'FLAGGED')];
        this.allPatientDetails = [...this.drawCriticalPatientList(list, '', true)];
      }else{
        const _list = [list];
        if(list.FIRSTNAME !==""){
          this.criticalPatientDetails = [...this.drawCriticalPatientList(_list, 'CRITICAL')];
          this.missedPatientDetails = [...this.drawCriticalPatientList(_list, 'MISSEDUPDATE')];
          this.reviewedPatientDetails = [...this.drawCriticalPatientList(_list, 'PENDINGREVIEW')];
          this.flaggedPatientDetails = [...this.drawCriticalPatientList(_list, 'FLAGGED')];
          this.allPatientDetails = [...this.drawCriticalPatientList(_list, '', true)];
        }
      }      
    })
  }

  drawCriticalPatientList(list, type: string, all:boolean = false): PatientDetails[]{
    let data: PatientDetails[] = [];
    list.forEach(ele => {
      const startDate = (ele.QSTARTDATE) ? new Date(ele.QSTARTDATE) : new Date();
      const endtDate = (ele.TODAYDATE) ? new Date(ele.TODAYDATE.split(" ")[0]) : new Date();
      if(all || (ele[type] && ele[type].toUpperCase() === "Y")){
        const obj: PatientDetails = {
          name: `${ele.FIRSTNAME} ${ele.LASTNAME}`,
          id: ele.QID,
          period: this.globalService.getDaysCount(startDate, endtDate),
          zone: ele.ZONE,
          symptoms: type==='FLAGGED' ? [ele.SUSPICIOUSREASON]:((ele.SYMPTOM) ? ele.SYMPTOM.split("+") : "")
        }
        data.push(obj);
      }
    });
    return data.reverse();
  }

}
