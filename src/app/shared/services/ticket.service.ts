import { Injectable } from '@angular/core';
import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { urls } from '../../app.config';
import { catchError, map, tap } from 'rxjs/operators';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';


@Injectable()
export class TicketService {

  httpOptions: any;

  constructor(private _httpService: HttpClient, @Inject(SESSION_STORAGE) private storage: StorageService ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.storage.get('token')
      })
    };  
  }

  public getAllTickets= () : Promise<any[]> =>{
    return this._httpService.get(urls.BASE_URL + urls.ticket).toPromise() as any;
  }

  public saveTicket = async (data): Promise<any[]> => {

    let parameterList = "?" + Object.keys(data).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&');


    const result = await this._httpService.post(urls.BASE_URL + urls.ticket, data, this.httpOptions).toPromise() as any;
    return result;
  }

  public updateStatus = async (data): Promise<any[]> => {

    let parameterList = "?" + Object.keys(data).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&');


    const result = await this._httpService.put(urls.BASE_URL + urls.updatestatus, data, this.httpOptions).toPromise() as any;
    return result;
  }

  public updateAssigned = async (data): Promise<any[]> => {

    let parameterList = "?" + Object.keys(data).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&');


    const result = await this._httpService.put(urls.BASE_URL + urls.updateassignto, data, this.httpOptions).toPromise() as any;
    return result;
  }
  public updatePriority = async (data): Promise<any[]> => {

    let parameterList = "?" + Object.keys(data).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&');


    const result = await this._httpService.put(urls.BASE_URL + urls.updatepriority, data, this.httpOptions).toPromise() as any;
    return result;
  }

  public getAllUsers = async (): Promise<any[]> => {
    return this._httpService.get(urls.BASE_URL + urls.allUsers).toPromise() as any;
  }

  public getClosedTicktes() {
    return this._httpService.get(urls.BASE_URL + urls.closeTicket, {
      headers: {
        'Authorization': this.storage.get('token')
      }
    }).toPromise() as any;
  }

  public getPendingTicktes() {
    return this._httpService.get(urls.BASE_URL + urls.pendingTicket, {
      headers: {
        'Authorization': this.storage.get('token')
      }
    }).toPromise() as any;
  }

  public getPersonalTicktes() {
    return this._httpService.get(urls.BASE_URL + urls.personalTicket, {
      headers: {
        'Authorization': this.storage.get('token')
      }
    }).toPromise() as any;
  }

  public login = async (): Promise<any[]> => {
    return this._httpService.get(urls.BASE_URL + urls.auth + "?token=", { responseType: 'text' }).toPromise() as any;
  }

  public getDetails(id) {
    return this._httpService.get(urls.BASE_URL + urls.remarks + "?ticketId=" + id, {
      headers: {
        'Authorization': this.storage.get('token')
      }
    }).toPromise() as any;
  }


  public saveRemaks = async (data): Promise<any[]> => {

    let parameterList = "?" + Object.keys(data).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&');

    const result = await this._httpService.post(urls.BASE_URL + urls.remarks, data, this.httpOptions).toPromise() as any;
    return result;
  }

  public getStatusCount = async (): Promise<any[]> => {
    return this._httpService.get(urls.BASE_URL + urls.tickets, this.httpOptions).toPromise() as any;
  }
}