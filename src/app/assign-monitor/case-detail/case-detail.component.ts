import { Component, OnInit } from '@angular/core';
import { GlobalServices } from 'src/app/shared/services/global.services';

@Component({
  selector: 'case-detail',
  templateUrl: './case-detail.component.html',
  styleUrls: ['./case-detail.component.scss']
})
export class CaseDetailComponent implements OnInit {
  showPopup:boolean = false;
  case: string;
  monitor: string;
  constructor(private globalService:GlobalServices) { }

  ngOnInit() {
    this.globalService.showPopup.subscribe(show => {
      this.showPopup = show;
    })
  }

  assign(){
    this.case = "Kamal's";
    this.monitor = "Lokesh Ravi";
    this.showPopup = true;
  }

  onAssign(value){
    this.globalService.showPopup.next(false);
  }

}
