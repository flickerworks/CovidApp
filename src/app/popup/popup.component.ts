import { Component, OnInit, Input } from '@angular/core';
import { GlobalServices } from '../shared/services/global.services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Input() backdropClose:boolean = true;
  @Input() closeBtn:boolean = true;
  @Input() show:boolean=false;
  constructor(private globalService: GlobalServices) { }

  ngOnInit() {
    this.globalService.showPopup.subscribe(value => {
      this.show = value;
    })
  }

  hidePopup(event){
    event.stopPropagation();
    this.show = false;
  }

  avoidClose(event){
    event.stopPropagation();
  }

}
