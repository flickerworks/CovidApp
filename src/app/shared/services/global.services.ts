import { Injectable } from '@angular/core';
import { LoggedInUserModel, MenuRoute, MonitorAndManagerList, UserModel, PersonalDetails } from '../models/shared.model';
import { Subject } from 'rxjs';

@Injectable()
export class GlobalServices {
  showPopup = new Subject<boolean>();
  showLoader = new Subject<boolean>();
  private token: string = "";
  private personalDetals:PersonalDetails;
  public isUserLoggedIn: boolean = false;
  public loggedInUserDetails: LoggedInUserModel;
  public menuRoutes: MenuRoute[] = [];
  public adminMenuRoutes: MenuRoute[] = [
    {
      title: 'View User',
      route: '/view-user'
    },
    {
      title: 'Add User',
      route: '/add-user'
    }
  ];
  public medicalMenuRoutes: MenuRoute[] = [
    {
      title: 'View User',
      route: '/view-user'
    }
  ];
  
  constructor() {}

  checkUserLoggedIn(): boolean {
    this.loggedInUserDetails = JSON.parse(sessionStorage.getItem('loggedInUserDetails'));
    this.isUserLoggedIn = this.loggedInUserDetails ? true : false;
    if (this.isUserLoggedIn) {
      this.menuRoutes = this.adminMenuRoutes;
    }
    return this.isUserLoggedIn;
  }

  logOut(): void {
    sessionStorage.clear();
    this.checkUserLoggedIn();
  }

  enumToArray(enumType: any): string[] {
    const keys: string[] = Object.keys(enumType);
    return keys.map(el => Object(enumType)[el]);
  }

  setToken(token):void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  firstLetterUppercase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  getPincodeCount(data:UserModel[]){
    let pinCodeObj = {};
    let total = [];
    data.forEach(ele => {
      if(!pinCodeObj[ele.pincode]){
        pinCodeObj[ele.pincode] = ele.pincode;
        total.push(ele.pincode);
      }
    })
    return total.length;
  }

  set personalDetal(personalDetals: PersonalDetails){
    this.personalDetals = personalDetals;
  }

  get personalDetal(){
    return this.personalDetals;
  }

}
