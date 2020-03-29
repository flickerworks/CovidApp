import { Component, OnInit, Input } from '@angular/core';
import { GlobalServices } from '../shared/services/global.services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'create-user-popup',
  templateUrl: './create-user-popup.component.html',
  styleUrls: ['./create-user-popup.component.scss']
})
export class CreateUserPopupComponent implements OnInit {
  @Input() show:boolean=false;
  constructor(private globalService: GlobalServices, 
    private router: Router,
    private route:ActivatedRoute) { }

  ngOnInit() {
  }

  hidePopup(event){
    event.stopPropagation();
    this.globalService.showPopup.next(false);
  }

  avoidClose(event){
    event.stopPropagation();
  }

  createQuarantineMan(event){    
    this.router.navigate(['/add-user','createQuarantineMan'], {relativeTo: this.route});
    setTimeout(_ => this.globalService.showPopup.next(false),200);
  }

  createMonitor(event){
    this.router.navigate(['/add-user', 'createMonitor'], {relativeTo: this.route});
    setTimeout(_ => this.globalService.showPopup.next(false),200);
  }

}
