import { Component, OnInit, Input } from '@angular/core';
import { GlobalServices } from '../shared/services/global.services';

@Component({
  selector: 'create-user-popup',
  templateUrl: './create-user-popup.component.html',
  styleUrls: ['./create-user-popup.component.scss']
})
export class CreateUserPopupComponent implements OnInit {
  @Input() show:boolean=false;
  constructor(private globalService: GlobalServices) { }

  ngOnInit() {
  }

  hidePopup(event){
    event.stopPropagation();
    this.globalService.showPopup.next(false);
  }

  avoidClose(event){
    event.stopPropagation();
  }

  createQuarantineMan(){

  }

  createMonitor(){
    
  }

}
