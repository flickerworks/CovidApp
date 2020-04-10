import { Injectable, ElementRef } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { LoggedInUserModel, MenuRoute, UserModel, PersonalDetails, PatientDetails } from '../models/shared.model';

@Injectable()
export class GlobalServices {
  showPopup = new Subject<boolean>();
  showLoader = new Subject<boolean>();
  pincodeChange = new ReplaySubject<string>();
  activeArea = new Subject<ElementRef>();
  public longitude:number;
  public latitude: number;
  private token: string = "";
  private personalDetals:PersonalDetails;
  private monitorDetals: PatientDetails;
  private selectedAdminTabId: number;
  private selectedQMIndex: number;
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

  getDaysCount(start, end): string {
    let days = 0;
    const oneDay = 24 * 60 * 60 * 1000, // hours*minutes*seconds*milliseconds
    difference = start - end;
    days = Math.round(Math.abs(difference / oneDay));
    return days + ((days>1) ? ' Days' : ' Day');
  }


  getZoneCount(data:UserModel[]){
    let zoneObj = {};
    let total = [];
    data.forEach(ele => {
      if(ele.zone && !zoneObj[ele.zone]){
        zoneObj[ele.zone] = ele.zone;
        total.push(ele.zone);
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

  set monitorDetail(monitorDetals: PatientDetails){
    this.monitorDetals = monitorDetals;
  }

  get monitorDetail(){
    return this.monitorDetals;
  }

  set lastSelectedAdminTab(tabId: number){
    this.selectedAdminTabId = tabId;
  }

  get lastSelectedAdminTab(){
    return this.selectedAdminTabId;
  }

  set QMDashboardIndex(tabId: number){
    this.selectedQMIndex = tabId;
  }

  get QMDashboardIndex(){
    return this.selectedQMIndex;
  }

  noWhitespaceValidator(control: FormControl) {
    const _val = control.value || '';
    const isWhitespace = (_val+"").trim().length === 0
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

}
