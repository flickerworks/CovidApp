import { Component, OnInit } from '@angular/core';
import { GlobalServices } from '../shared/services/global.services';
import { PersonalDetails } from '../shared/models/shared.model';

@Component({
  selector: 'personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {
  personalDetails: PersonalDetails;
  constructor(private globalService: GlobalServices) { }

  ngOnInit() {
    this.personalDetails = this.globalService.personalDetal;
  }

}
