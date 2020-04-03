import { Component, OnInit } from '@angular/core';
import { GlobalServices } from '../shared/services/global.services';
import { PersonalDetails } from '../shared/models/shared.model';
import { Router } from '@angular/router';

@Component({
  selector: 'personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {
  personalDetails: PersonalDetails;
  address: string;
  constructor(private globalService: GlobalServices, private router: Router) { }

  ngOnInit() {
    this.personalDetails = this.globalService.personalDetal;
    const userDetails = this.personalDetails; 
    this.address= `${userDetails.houseNo}${this.removeComma(userDetails.houseNo)} ${userDetails.street}${this.removeComma(userDetails.street)} ${userDetails.area}${this.removeComma(userDetails.area)} ${userDetails.city}${this.removeComma(userDetails.city)} ${userDetails.state} ${userDetails.pincode}`
    if(!this.personalDetails){
      this.router.navigate(['/view-user']);
    }
  }

  removeComma(value):string{
    if(value){
      return ',';
    }else{
      return '';
    }
  }

}
