import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { extend } from 'lodash';
import 'rxjs/add/observable/throw';

import { urls } from '../../app.config';

export interface IRequestOptions {
    headers?: HttpHeaders;
    observe?: 'body';
    params?: HttpParams;
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    body?: any;
}

export function httpServiceCreator(http: HttpClient) {
    return new HttpService(http);
}

@Injectable()
export class HttpService {
    private api = urls.BASE_URL;
    constructor(public http: HttpClient) { }

    public Get<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
        console.log('Change url', endPoint);
        return this.http.get<T>(this.api + endPoint, options);
    }


    public Post<T>(endPoint: string, params?: Object, options?: IRequestOptions): Observable<T> {
        console.log(this.api + endPoint);
        return this.http.post<T>(this.api + endPoint, params, options);
    }


    public Put<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<T> {
        console.log(this.api + endPoint);
        return this.http.put<T>(this.api + endPoint, params, options);
    }


    public Delete<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
        return this.http.delete<T>(this.api + endPoint, options);
    }

}