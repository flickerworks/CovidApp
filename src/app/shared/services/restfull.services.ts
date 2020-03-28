import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
    LoggedInUserModel,
} from '../models/shared.model';

@Injectable ({providedIn: 'root'})
export class RestfullServices {
    
    public baseUrl: string = '';
    public loginUrl: string = '';
    
    headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    options = new HttpHeaderResponse({
        headers: this.headers
    });

    constructor(private http: HttpClient) {}

    loginUser(loginData: LoggedInUserModel): Observable<LoggedInUserModel[]> {
        return this.http.post(
            this.baseUrl.concat(this.loginUrl),
            loginData,
            this.options
        )
        .pipe(
            map(data => {
                const responseData: LoggedInUserModel[] = [];
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        responseData.push({...data[key]});
                    }
                }
                return responseData;
            })
        )
    }
}