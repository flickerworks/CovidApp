import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoggedInUserModel, Payload, UserModel, UserRegisterModel } from '../models/shared.model';

@Injectable ({providedIn: 'root'})
export class RestfullServices {
    
    public baseUrl: string = 'https://deap.techmahindra.com/UMPWebContainer/UMPRequestProcessor';
    
    headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
    });

    options = new HttpHeaderResponse({
        headers: this.headers
    });

    constructor(private http: HttpClient) {}


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
        return throwError(
            source['value'] ? 
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

    post(request: any, type: string): Observable<any> {
        const payload: Payload = {
            KEY: type,
            PAYLOAD:{
                [type]: request
            }
        }
        const _request = this.drawPayload(payload);
        return this.postApi(JSON.stringify(_request));
    }
    
}