import { Component, OnInit } from '@angular/core';
import { GlobalServices } from '../shared/services/global.services';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loginData;
  loginName:string;
  loginAs:string;
  constructor(private router: Router) { }

  ngOnInit() {
    const session = sessionStorage.getItem('loggedInUserDetails');
    if(session){
      this.loginData = JSON.parse(session);
      const name = `${this.loginData.firstName} ${this.loginData.lastName}`;
      this.loginName = name.trim() ? name : "User";
      this.loginAs = this.loginData.loginAs;
    }
  }

  /* showPopup(){
    this.globalService.showPopup.next(true);
  }  */

  addUser(){
    this.router.navigate(['/add-user', false]);
  }


  redirect(pageId:string){
    if(pageId==='login'){
      sessionStorage.removeItem('loggedInUserDetails');
    }      
    this.router.navigate(['/'+pageId]);
  }
}
