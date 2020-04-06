import { Injectable } from '@angular/core';
import {Location} from '@angular/common';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginResponse } from './shared/models/shared.model';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService implements CanActivate {

  constructor(private router: Router, private _location: Location){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let loggedInUserDetails: LoginResponse;
      const session = sessionStorage.getItem('loggedInUserDetails');
      if(session){
        loggedInUserDetails = JSON.parse(session);
      }
      if(loggedInUserDetails){
        this._location.back();
        return false;
      } else {      
        return true;
      }
  }
}
