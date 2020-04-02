import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { GlobalServices } from './global.services';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptService implements HttpInterceptor{

  constructor(private globalService: GlobalServices) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.globalService.getToken(),
    authRequest = request.clone({setHeaders: {
      Authorization: "Bearer "+ token
    }})

    return next.handle(authRequest).pipe(
      map(event => { 
        return event;
      }),
      catchError(error => {
        return of(error);
      })
    )
  }
  
}
