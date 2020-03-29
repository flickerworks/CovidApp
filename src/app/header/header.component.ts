import { Component, OnInit } from '@angular/core';
import { GlobalServices } from '../shared/services/global.services';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private globalService: GlobalServices) { }

  ngOnInit() {
  }

  showPopup(){
    this.globalService.showPopup.next(true);
  } 

}
