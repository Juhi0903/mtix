import { Component, OnInit, Input } from '@angular/core';
import {GridOptions} from 'ag-grid-community';
import { TicketService} from "../../../shared/services/ticket.service";
import {detailsArray } from '../../../app.config';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-status-details',
  templateUrl: './status-details.component.html',
  styleUrls: ['./status-details.component.scss']
})
export class StatusDetailsComponent implements OnInit {

  @Input() ticketid;
  @Input() title;
  @Input() raiseOn ;
  @Input() status;
  @Input() lastUpdatedOn;
  details : any =[];
  detailsArray : any = [];
  date = new Date();
  columnDefs : any;
  rowdata = [];
  data = [];
  ticketDetails = [];
  showRemarks = false;
  gridOptions: GridOptions = {
    columnDefs : this.columnDefs,
    rowData : this.rowdata,
  };

  constructor(public activeModal: NgbActiveModal, private _ticketService : TicketService) { }

  ngOnInit() {
    this.getTicketRemarks();
    this.getParentTicketInfo();
    console.log(this.ticketid);
    this.columnDefs = [
      {headerName : "Date", field:'addedOn' , cellRenderer: "ticketdetails",width: 100, suppressSizeToFit: true, pinned: "left"},
      {headerName: "Ticket", field: 'remarks' , width: 100, suppressSizeToFit: true, pinned: "left"},
      {headerName: "SPOC", field: 'addedBy' , width: 200, suppressSizeToFit: true, pinned: "left"},
      {headerName: "Step", field: 'status' , width: 140, suppressSizeToFit: true, pinned: "left"},
      {headerName: "Sub Step", field: '' , width: 120, suppressSizeToFit: true, pinned: "left"},
      {headerName: "Update", field: '' , width: 100, suppressSizeToFit: true, pinned: "left"},

    ]
  }

  getTicketRemarks = async()=>{
    this.details = await this._ticketService.getDetails(this.ticketid);
    let spoc : any;
    let length = this.details.length-1;
    this.details.forEach((res , index) => {
      res['addedOn'] = this.todayDate(res['addedOn']);
    });

    let finalMap = new Map();
    let raisedOn =  new Date(this.raiseOn).getTime();
    let todate =  new Date().getTime();
    let diff = todate - raisedOn;
    let day = Math.round(Math.abs(diff/(1000*60*60*24)));
    this.details.forEach((res , index) => {
      this.detailsArray = {} as detailsArray;
      res['addedOn'] = this.todayDate(res['addedOn']);
      this.detailsArray['addedOn'] = res['addedOn'];
      this.detailsArray['remarks'] = 'Main Ticket';
      this.detailsArray['addedBy'] = res['addedBy'];
      this.detailsArray['status'] = res['status'];
      console.log(res['status']);
      if(res['status']==null)
      this.detailsArray['status'] = 'Not Updated';
      spoc = res['addedBy'];
      finalMap.set(res['addedOn'],this.detailsArray);
      this.data.push(this.detailsArray);
      });

    if(day ==0) this.rowdata = this.data;
    else {
    for(let i=0;i<day;i++){
      this.detailsArray = {} as detailsArray;
       let m =  new Date(this.raiseOn).getMonth()+1;
       let y =  new Date(this.raiseOn).getFullYear();
       let added = y +'-' +m +'-' + (new Date(this.raiseOn).getDate()+i);
       let closedDate = Number(new Date(this.lastUpdatedOn).getDate());
       let lastedData = Number(new Date(added).getDate());
       if(!finalMap.has(added)){
        this.detailsArray['addedOn'] = added;
        this.detailsArray['status'] = 'Not Updated';
        this.detailsArray['addedBy'] = spoc;
        this.detailsArray['remarks'] = 'Main Ticket';
        if(this.status==='Closed'){
        if(closedDate >= lastedData){
            finalMap.set(added,this.detailsArray);
            this.rowdata.push(this.detailsArray);
        }
      }
        else if(this.status!='Closed'){
          finalMap.set(added,this.detailsArray);
          this.rowdata.push(this.detailsArray);
        }

       }
       else{
         let tempData = finalMap.get(added);
          this.rowdata.push(tempData);
       }
     };
     this.showRemarks = true;
  }
  console.log(this.rowdata);
  }

  todayDate(dateparam){
    return dateparam.toString().substring(0,10);
  }

  getParentTicketInfo = async () =>{
    this.ticketDetails = await this._ticketService.getTicketDetails(this.ticketid);
    console.log(this.ticketDetails);
    this.ticketDetails.forEach((res , index) => {
      res['addedOn'] = this.todayDate(res['addedOn']);
      this.title = res['title'];
   });
  }

}
