import { Component, OnInit, Input } from '@angular/core';
import { GlobalServices } from '../shared/services/global.services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
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

}
