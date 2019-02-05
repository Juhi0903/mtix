import { Component, OnInit, ViewChild, Input ,Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {ICellRendererAngularComp, ICellEditorAngularComp} from "ag-grid-angular";
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { pending_url, personal_url, closed_url, priorityLevel,problemType, raised_closed_url, raised_all_url, raised_working_url,review_ticket_url } from "../../../app.config"
import { TicketService } from "../../../shared/services/ticket.service";
import { SESSION_STORAGE, StorageService , LOCAL_STORAGE } from 'angular-webstorage-service';
import {StatusComponent} from '../../status/status/status.component';
import { TicketDetailsComponent} from '../../ticket-details/ticket-details/ticket-details.component';
import { formatDate } from '@angular/common';


@Component({
  selector: 'status-edit-url',
  template: '<a title="{{url}}" [routerLink]="url" target="_blank">{{ticketid}}</a>'
})

export class EditAndViewDetails implements ICellRendererAngularComp {
  params: any;
  url: string;
  public orgDomain:string;
  ticketid : any;
  title : any;
  raiseOn : any;
  id : any;
  status : any;
  lastUpdatedOn : any;

  constructor(private route: ActivatedRoute,private modalService: NgbModal) {
  }
  agInit(params: any): void {
    this.params = params;
    this.setUrl(params);
  }

  refresh(params: any): boolean {
    this.params = params;
    this.setUrl(params);
    return true;
  }

  private setUrl(params) {
    this.ticketid = params.node.data.ticketId;
    this.url = "/ticket/ticketdetails" + "/" + params.node.data.ticketId;
  }
}


@Component({
  selector: 'status-edit-url',
  template: '<a (click)="onClick()"><i class="ft-edit-2 info font-medium-1 mr-1"></i>{{status}}</a>'
})

export class EditStatus implements ICellRendererAngularComp {
  params: any;
  url: string;
  public ticketId: any;
  status : any;
  assignedTo : any;

  constructor(private route: ActivatedRoute,private modalService: NgbModal) {
  }
  agInit(params: any): void {
    this.params = params;
    this.setStatus(params);
  }

  refresh(params: any): boolean {
    this.params = params;
    this.setStatus(params);
    return true;
  }

  private setStatus(params) {
    // this.url = "/" + this.orgDomain + "/" + urls.editOffer + "/" + params.node.data.offerId;
    this.status = params.node.data.status;
    this.ticketId = params.node.data.ticketId;
    // this.assignedTo = params.node.data.assignedTo;
  }

  onClick() {
    const modalRef = this.modalService.open(StatusComponent, {size:'lg'});
    modalRef.componentInstance.clickevent.subscribe(($e) => {
      this.params.node.data.status = $e;
      this.status = $e;
    });
    modalRef.componentInstance.status = this.status;
    modalRef.componentInstance.ticketId = this.ticketId;
    // modalRef.componentInstance.assignedTo = this.assignedTo;
  }
}


@Component({
  selector: 'app-my-ticket',
  templateUrl: './my-ticket.component.html',
  styleUrls: ['./my-ticket.component.scss']
})
export class MyTicketComponent implements OnInit {

  url: any;
  closed_url: any;
  personal_url: any;
  pending_url: any;
  raised_working_url : any;
  raised_closed_url : any;
  raised_all_url : any;
  review_ticket_url : any;
  rowdata: any = [];
  columnDefs : any =[];
  priority : any = [];
  problemType : any ;
  createTicketForm: FormGroup;
  session : any;
  frameworkComponents : any;
  date : any = new Date();
  today : any;

  constructor(
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _ticketService: TicketService,
    @Inject(LOCAL_STORAGE) private storage: StorageService) {
    
    this.url = router.url;
    this.closed_url = closed_url;
    this.pending_url = pending_url;
    this.personal_url = personal_url;
    this.priority = priorityLevel;
    this.problemType = problemType;
    this.raised_all_url = raised_all_url;
    this.raised_closed_url = raised_closed_url;
    this.raised_working_url = raised_working_url;
    this.review_ticket_url = review_ticket_url;
    this.session = this.storage.get('token');
    this.frameworkComponents = {
      editStatus: EditStatus,
      ticketdetails : EditAndViewDetails
    };
    this.today = this.todayDate(this.date);

  }

  ngOnInit() {
    this.setColumnDefs();
    console.log(this.url);
    if (this.url === this.closed_url)
      this.getClosedTicktes();
    else if (this.url === this.pending_url)
      this.getPendingTicktes();
    else if (this.url === this.personal_url)
      this.getPersonalTicktes();
    else if(this.url == this.raised_all_url)
      this.getRaisedTicktes();
    else if(this.url == this.raised_closed_url)
      this.getRaisedClosedTicktes();
    else if(this.url == this.raised_working_url)
      this.getRaisedPendingTicktes();
    else if(this.url = this.review_ticket_url)
      this.getReviewTicket();
  }


  setColumnDefs(){
    this.columnDefs = [
      {headerName : "Id", field:'ticketId' , cellRenderer: "ticketdetails",width: 130, suppressSizeToFit: true},
      {headerName: "Raised On", field: 'addedOn' , width: 120, suppressSizeToFit: true},
      {headerName: "Days", field: 'days', width: 80, suppressSizeToFit: true,valueParser: this.numberParser,
      cellClassRules: {
        "rag-light": "x <'50'",
        "rag-red": "x >= '20'"
      }},
      {headerName: "Subject", field: 'title' , width: 240, suppressSizeToFit: true },
      {headerName: "Status", field: 'status' ,cellRenderer: "editStatus", width: 130, suppressSizeToFit: true,valueParser: this.numberParser,
      cellClassRules: {
        "rag-green": "x =='Closed'",
        "rag-amber": "x == 'Integration'",
        "rag-red": "x == 'Yet To Start'"
      }},
      {headerName: "Category", field: 'problemType' , width: 130, suppressSizeToFit: true},
      {headerName: 'Priority', field: 'priorityLevel', width: 130, suppressSizeToFit: true, valueParser: this.numberParser,
      cellClassRules: {
        "rag-green": "x =='Low'",
        "rag-yellow": "x == 'Moderate'",
        "rag-amber": "x == 'High'",
        "rag-red" : "x== 'Immediate'"
      }},
      {headerName: "Raised By", field: 'raisedBy', width: 180, suppressSizeToFit: true},
      {headerName: "Assigned To", field: 'assignedTo', width: 180, suppressSizeToFit: true},
    ];
  }


  getClosedTicktes = async () => {
    this.rowdata = await this._ticketService.getClosedTicktes();
     this.formateDate();
  }

  getPendingTicktes = async () => {
    this.rowdata = await this._ticketService.getPendingTicktes();
    this.formateDate();
  }

  getPersonalTicktes = async () => {
    this.rowdata = await this._ticketService.getPersonalTicktes();
    this.formateDate();
  }

  getRaisedTicktes = async () => {
    this.rowdata = await this._ticketService.getTicketsRaisedByMe();
    this.formateDate();
  }
  getRaisedPendingTicktes = async () => {
    this.rowdata = await this._ticketService.getPendingTicketsRaisedByMe();
    this.formateDate();
  }
  getRaisedClosedTicktes = async () => {
    this.rowdata = await this._ticketService.getClosedTicketsRaisedByMe();
    this.formateDate();
    
  }
  getReviewTicket = async () => {
    this.rowdata = await this._ticketService.getReviewerTicket();
     this.formateDate();
  }

  numberParser(params) {
    var newValue = params.newValue;
    var valueAsNumber;
    if (newValue === null || newValue === undefined || newValue === "") {
      valueAsNumber = null;
    } else {
      valueAsNumber = parseFloat(params.newValue);
    }
    return valueAsNumber;
  }
  
  todayDate(dateparam){
    return dateparam.toString().substring(0,10);
  }

  formateDate(){
    let diff;
    this.rowdata.forEach((res , index) => {
      let addedOn = new Date(res['addedOn']).getTime();
      if(res['status']=='Closed'){
        let closedOn = new Date(res['updatedOn']).getTime();
         diff = closedOn - addedOn;
      }
      else{
      let todate = new Date().getTime();
        diff = todate - addedOn;
      }
      res['days'] = Math.round(Math.abs(diff/(1000*60*60*24)));
      let time = new Date(res['addedOn']).setHours(new Date(res['addedOn']).getHours() + 5);
      res['addedOn'] = formatDate(time,'yyyy-MM-dd','en-US')
       let tempRaised = (res['raisedBy'].toString().split('@')[0]);
      res['raisedBy'] = this.toCamelCase(tempRaised);
      let tempAssigned = (res['assignedTo'].toString().split('@')[0]);
      res['assignedTo'] = this.toCamelCase(tempAssigned);
       
    
   });
   this.rowdata.sort(function(a, b) {
    var nameA = Number((a.ticketId).toString().split('_')[1]); 
    var nameB = Number((b.ticketId).toString().split('_')[1]);
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      if(nameA = nameB){
        return (a.id < b.id) ? -1 : 1;
      }
      return 0;
  });
  }
  
  toCamelCase(param){
    let firstchar = param.toString().charAt(0).toUpperCase();
    let otherChar = param.toString().substring(1,param.length);
  
    return firstchar.concat(otherChar);
  
  }

}
