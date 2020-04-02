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
  constructor(private globalService: GlobalServices, private router: Router) { }

  ngOnInit() {
    this.personalDetails = this.globalService.personalDetal;
    if(!this.personalDetails){
      this.router.navigate(['/view-user']);
    }
  }

}
