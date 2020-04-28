import { Component, OnInit } from '@angular/core';
import { GlobalServices } from '../shared/services/global.services';
import { PatientDetails, PatientFullDetails } from '../shared/models/shared.model';
import { Router } from '@angular/router';
import { RestfullServices } from '../shared/services/restfull.services';

@Component({
  selector: 'patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {
  userDetails: PatientDetails;
  address: string;
  patientDetails: PatientFullDetails;
  constructor(private globalServices: GlobalServices, private router: Router, private restFulService: RestfullServices) { }

  ngOnInit() {
    if(this.globalServices.userDetail){
      this.userDetails= this.globalServices.userDetail;
            
    } else {
      this.router.navigate(['/quarantine-dashboard']);
    }  
    this.getPatientDetails();
  }

  getPatientDetails(){
    const request = {
      QID: this.userDetails.id
    }

    this.restFulService.post(request, "FETCHQADDRESSBYQID").subscribe(response => {
      const data = response[0].PAYLOAD.FETCHQADDRESSBYQID;
      
      if(data){
        const startDate = data.QSTARTDATE && new Date(data.QSTARTDATE) || new Date();
        const todayDate = data.TODAYDATE && new Date(data.TODAYDATE.split(" ")[0]) || new Date();
        this.patientDetails = {
          id: data.QID,
          status: (data.QSTATUS && data.QSTATUS.toUpperCase() === "Y") ? "Yes" : "No",
          fName: data.FIRSTNAME,
          lName: data.LASTNAME,
          email: data.EMAIL,
          zone: data.ZONE,
          phone: data.MOBILENUMBER,
          dob: data.DOB,
          reason: data.SUSPICIOUSREASON,
          missedUpdate: (data.MISSEDUPDATE && data.MISSEDUPDATE.toUpperCase() === "Y") ? "Yes" : "No",
          critical: (data.CRITICAL && data.CRITICAL.toUpperCase() === "Y") ? "Yes" : "No",
          flagged: (data.FLAGGED && data.FLAGGED.toUpperCase() === "Y") ? "Yes" : "No",          
          pendingReview: (data.PENDINGREVIEW && data.PENDINGREVIEW.toUpperCase() === "Y") ? "Yes" : "No",
          idType: data.GOVTIDTYPE,
          qType: data.QUARANTINETYPE,
          symtoms: data.SYMPTOM,
          qDuration: this.globalServices.getDaysCount(startDate, todayDate),
          qAddress: `${data.QUARANTINEHNO}, ${data.QUARANTINESTREETNAME}, ${data.QUARANTINEAREA}, ${data.QUARANTINECITY}, ${data.QUARANTINESTATE} - ${data.QUARANTINEPINCODE.trim()}`,
          cAddress: `${data.PRESENTHNO}, ${data.PRESENTSTREETNAME}, ${data.PRESENTAREA}, ${data.PRESENTCITY}, ${data.PRESENTSTATE} - ${data.PRESENTPINCODE.trim()}`,
          pAddress: `${data.PERMANENTHNO}, ${data.PERMANENTSTREETNAME}, ${data.PERMANENTAREA}, ${data.PERMANENTCITY}, ${data.PERMANENTSTATE} - ${data.PERMANENTPINCODE.trim()}`,
        }

      }
    })
  }

  removeComma(value):string{
    if(value){
      return ',';
    }else{
      return '';
    }
  }

}
