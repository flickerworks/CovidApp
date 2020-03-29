import { Injectable } from '@angular/core';
import { LoggedInUserModel, MenuRoute } from '../models/shared.model';
import { Subject } from 'rxjs';

@Injectable()
export class GlobalServices {
  showPopup = new Subject<boolean>();
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
}
