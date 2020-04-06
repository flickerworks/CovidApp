import { Injectable } from '@angular/core';
import {Location} from '@angular/common';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoggedInUserModel, LoginResponse } from './shared/models/shared.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private routes: Router, private _location: Location){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let loggedInUserDetails: LoginResponse;
      const session = sessionStorage.getItem('loggedInUserDetails');
      if(session){
        loggedInUserDetails = JSON.parse(session);
      }
      if(loggedInUserDetails && loggedInUserDetails.loginAs === 'admin'){
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
