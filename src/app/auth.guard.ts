import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoggedInUserModel } from './shared/models/shared.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private routes : Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let loggedInUserDetails: LoggedInUserModel = JSON.parse(sessionStorage.getItem('loggedInUserDetails'));
      if(loggedInUserDetails){
        return true;
      } else {
        this.routes.navigate(['/login']);
        return false;
      }
  }
  
}
