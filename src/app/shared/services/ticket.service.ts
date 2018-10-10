import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { urls } from '../../app.config';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class TicketService {

  constructor(private _httpService: HttpClient) { }

  public getAllTickets() {
    return this._httpService.get(urls.BASE_URL + urls.ticket).toPromise() as any;
  }

  public saveTicket = async (data): Promise<any[]> => {

    let parameterList = "?" + Object.keys(data).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&');


    const result = await this._httpService.post(urls.BASE_URL + urls.ticket, data, httpOptions).toPromise() as any;
    return result;
  }

  public updateStatus = async (data): Promise<any[]> => {

    let parameterList = "?" + Object.keys(data).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&');


    const result = await this._httpService.put(urls.BASE_URL + urls.updatestatus, data, httpOptions).toPromise() as any;
    return result;
  }

  public updateAssigned = async (data): Promise<any[]> => {

    let parameterList = "?" + Object.keys(data).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&');


    const result = await this._httpService.put(urls.BASE_URL + urls.updateassignto, data, httpOptions).toPromise() as any;
    return result;
  }
  public updatePriority = async (data): Promise<any[]> => {

    let parameterList = "?" + Object.keys(data).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&');


    const result = await this._httpService.put(urls.BASE_URL + urls.updatepriority, data, httpOptions).toPromise() as any;
    return result;
  }

  public getAllUsers = async (): Promise<any[]> => {

    return this._httpService.get(urls.BASE_URL + urls.allUsers).toPromise() as any;
  }

  public getClosedTicktes() {
    return this._httpService.get(urls.BASE_URL + urls.closeTicket).toPromise() as any;
  }

  public getPendingTicktes() {
    return this._httpService.get(urls.BASE_URL + urls.pendingTicket).toPromise() as any;
  }

  public getPersonalTicktes() {
    return this._httpService.get(urls.BASE_URL + urls.personalTicket).toPromise() as any;
  }

  public login(){
    return this._httpService.get(urls.BASE_URL + urls.auth).toPromise() as any;
  }

  public getDetails(id) {
    // let parameterList = "?" + Object.keys(id).map(function (k) {
    //   return encodeURIComponent(k) + '=' + encodeURIComponent(id[k])
    // }).join('&');
    return this._httpService.get(urls.BASE_URL + urls.remarks + "?ticketId=" +id).toPromise() as any;
  }
}