import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { Observable, throwError, ReplaySubject } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';
import { LoggedInUserModel, Payload, State, City } from '../models/shared.model';
import { GlobalServices } from './global.services';
import { DatePipe } from '@angular/common';

@Injectable ({providedIn: 'root'})
export class RestfullServices {
    
    public baseUrl: string = 'https://deap.techmahindra.com/UMPWebContainer/UMPRequestProcessor';
    states = new ReplaySubject<State[]>();
    allCities = new ReplaySubject<City[]>();
    headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
    });

    options = new HttpHeaderResponse({
        headers: this.headers
    });

    constructor(private http: HttpClient, private globalService: GlobalServices, private datePipe: DatePipe) {
        this.get('assets/DB/states.json').subscribe(res => {
            this.states.next(res.states);
        })
        this.get('assets/DB/cities.json').subscribe(res => {
            this.allCities.next(res.cities);
        })
    }

    postApi(requestData:any):Observable<any>{
        return this.http.post(this.baseUrl, requestData, {headers: this.headers}).pipe(
            catchError((error, caught) => {
                return this.onApiError(caught);
            }),
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


    onApiError(cought){
        const source = cought.source.source.source.source.source;
        this.globalService.showLoader.next(false);
        return throwError(
            source && source['value'] ? 
            `Something bad happened, please try again later. \n Form ${source['value'].url}`
            : "Internal server error, please try again"
        )
    }

    getRequestFormat(){
        return {
            MESSAGE: {
              HEADER: {
                LOGIN: "vp0017711@Covid"
              },
              PAYLOAD: {},
              SESSION: {
                LATITUDE: "0.0",
                LONGITUDE: "0.0",
                APP: "CovidApp",
                ORG: "Covid",
                TRANSACTION: "",
                KEY: "",
                TYPE: "",
                CHANNEL: "b2c"
              }
            }
        }
    }

    drawPayload(payload: Payload){
        let _payload = this.getRequestFormat();
        _payload.MESSAGE.SESSION.TRANSACTION = payload.KEY;
        _payload.MESSAGE.SESSION.KEY = payload.KEY;
        _payload.MESSAGE.SESSION.TYPE = payload.KEY;
        Object.assign(_payload.MESSAGE.PAYLOAD, payload.PAYLOAD);
        return _payload;
    }

    get(url: string):Observable<any>{
        return this.http.get(url, {headers: this.headers});
    }


    post(request: any, type: string): Observable<any> {
        this.globalService.showLoader.next(true);
        const payload: Payload = {
            KEY: type,
            PAYLOAD:{
                [type]: request
            }
        }
        const _request = this.drawPayload(payload);
        return this.postApi(JSON.stringify(_request)).pipe(
            flatMap(response => {
                this.globalService.showLoader.next(false);
                return new Observable(observer => {
                    observer.next(response);
                })  
            })
        )                      
    }

    downloadExcel(startDate, endDate){
        let userDetails;
        const url: string = "https://deap.techmahindra.com/Covid19App/export/user";
        const session = sessionStorage.getItem('loggedInUserDetails');
        if(session){
            userDetails = JSON.parse(session);
        }
        const request = {
            "requestFrom": (userDetails) ? userDetails.firstName : "",
            "requestMsisdn": (userDetails) ? userDetails.phone : "",
            "requestRole": "QuarantineManager",
            "requestBody": (startDate && endDate) ? {
                "startDate": this.datePipe.transform(startDate, "yyyy-MM-dd"),
                "endDate": this.datePipe.transform(endDate, "yyyy-MM-dd")
            } : {},
            "appDetails": {
                "appName": "covid19App",
                "appVersion": "1.0"
            }
        }
        return this.http.post(url, request, {headers: this.headers}).pipe(
            catchError((error, caught) => {
                return this.onApiError(caught);
            }),
            map(data => {
                return data;
            })
        )
    }
    
}