import { Injectable } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoggedInUserModel } from './shared/models/shared.model';

@Injectable({
  providedIn: 'root'
})
export class MgrAuthGuardService implements CanActivate {
  constructor(private router: Router, private _location: Location){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let loggedInUserDetails: LoggedInUserModel = JSON.parse(sessionStorage.getItem('loggedInUserDetails'));
      const sessionData = sessionStorage.getItem('loggedInUserDetails');
      let loginData;
      if(sessionData){
        loginData = JSON.parse(sessionData);
      }
      if(loggedInUserDetails && loginData.loginAs !== 'admin'){
        return true;
      } else {
        if(!loggedInUserDetails){
          this.router.navigate(['/login']);
        }else{
          this._location.back();
        }        
        return false;
      }
  }
}



