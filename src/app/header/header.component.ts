import { Component, OnInit } from '@angular/core';
import { GlobalServices } from '../shared/services/global.services';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  /* showPopup(){
    this.globalService.showPopup.next(true);
  }  */

  addUser(){
    this.router.navigateByUrl('/add-user');
  }

}
