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
  homeRoute: string = "view-user";
  addUserRoute:string = 'add-user';
  loginName:string;
  loginAs:string;
  popLogout = false;
  showReport: boolean = false;
  constructor(private router: Router, private globalService: GlobalServices) { }

  ngOnInit() {
    const session = sessionStorage.getItem('loggedInUserDetails');
    if(session){
      this.loginData = JSON.parse(session);
      const name = `${this.loginData.firstName} ${this.loginData.lastName}`;
      this.loginName = name.trim() ? name : "User";
      this.showReport = (this.loginData.loginAs !== 'admin') ? true : false;
      this.loginAs = (this.loginData.loginAs !== 'admin') ? "Manager" : "Admin";
      this.homeRoute = (this.loginData.loginAs === 'admin') ? "view-user" : "quarantine-dashboard";
      this.addUserRoute = (this.loginData.loginAs.toLowerCase() === 'admin') ? "add-user" : "register-patient";
    }
  }

  /* showPopup(){
    this.globalService.showPopup.next(true);
  }  */

  addUser(){
    this.router.navigate(['/'+this.addUserRoute, false]);
  }


  redirect(pageId:string){
    console.log(pageId);
    if(pageId==='login'){
      sessionStorage.removeItem('loggedInUserDetails');
    } 
    this.globalService.lastSelectedAdminTab = 0;
    this.router.navigate(['/'+pageId]);
  }

  logout(){
    this.popLogout = true;
  }

  popupClick(value: boolean){
    this.popLogout = false;
    if(value){
      this.redirect('login');
    }
  }
}
