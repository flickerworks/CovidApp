import { Injectable } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginResponse } from './shared/models/shared.model';

@Injectable({
  providedIn: 'root'
})
export class MgrAuthGuardService implements CanActivate {
  constructor(private router: Router, private _location: Location){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let loggedInUserDetails: LoginResponse;
      const session = sessionStorage.getItem('loggedInUserDetails');
      if(session){
        loggedInUserDetails = JSON.parse(session);
      }
      if(loggedInUserDetails && loggedInUserDetails.loginAs !== 'admin'){
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



