import { Injectable } from '@angular/core';
import {Location} from '@angular/common';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoggedInUserModel } from './shared/models/shared.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private routes: Router, private _location: Location){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let loggedInUserDetails: LoggedInUserModel = JSON.parse(sessionStorage.getItem('loggedInUserDetails'));
      const sessionData = sessionStorage.getItem('loggedInUserDetails');
      let loginData;
      if(sessionData){
        loginData = JSON.parse(sessionData);
      }
      if(loggedInUserDetails && loginData.loginAs === 'admin'){
        return true;
      } else {
        if(!loggedInUserDetails){
          this.routes.navigate(['/login']);
        }else{
          this._location.back();
        }
        return false;
      }
  }
  
}
