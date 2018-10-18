import { Component, OnInit, ViewChild, Input ,Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {ICellRendererAngularComp, ICellEditorAngularComp} from "ag-grid-angular";
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { pending_url, personal_url, closed_url, priorityLevel,problemType } from "../../../app.config"
import { TicketService } from "../../../shared/services/ticket.service";
import { SESSION_STORAGE, StorageService , LOCAL_STORAGE } from 'angular-webstorage-service';
import {StatusComponent} from '../../status/status/status.component';
import { TicketDetailsComponent} from '../../ticket-details/ticket-details/ticket-details.component';


@Component({
  selector: 'status-edit-url',
  template: '<a (click)="onClick()">{{ticketid}}</a>'
})

export class EditAndViewDetails implements ICellRendererAngularComp {
  params: any;
  url: string;
  public orgDomain:string;
  ticketid : any;
  title : any;
  raiseOn : any;
  id : any;

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
    this.ticketid = params.node.data.ticketId;
    this.title = params.node.data.title;
    this.raiseOn = params.node.data.addedOn;
  }

  onClick() {
    const modalRef = this.modalService.open(TicketDetailsComponent , {size : 'lg'});
    modalRef.componentInstance.clickevent.subscribe(($e) => {
      this.params.node.data.assignedTo = $e;
      // this.ticketid = $e;
      // console.log($e);
    });
    modalRef.componentInstance.ticketid = this.ticketid;
    modalRef.componentInstance.title = this.title;
    modalRef.componentInstance.raiseOn = this.raiseOn;
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
  }

  onClick() {
    const modalRef = this.modalService.open(StatusComponent);
    modalRef.componentInstance.clickevent.subscribe(($e) => {
      this.params.node.data.status = $e;
      this.status = $e;
    });
    modalRef.componentInstance.status = this.status;
    modalRef.componentInstance.ticketId = this.ticketId;
    // modalRef.componentInstance.randomValue = 1001;
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
    this.session = this.storage.get('token');
    this.frameworkComponents = {
      editStatus: EditStatus,
      ticketdetails : EditAndViewDetails
    };
    this.today = this.todayDate(this.date);

  }

  ngOnInit() {
    this.setColumnDefs();
    if (this.url === this.closed_url)
      this.getClosedTicktes();
    if (this.url === this.pending_url)
      this.getPendingTicktes();
    if (this.url === this.personal_url)
      this.getPersonalTicktes();
  }


  setColumnDefs(){
    this.columnDefs = [
      {headerName : "Id", field:'ticketId' , cellRenderer: "ticketdetails",width: 100, suppressSizeToFit: true},
      {headerName: "Raised On", field: 'addedOn' , width: 120, suppressSizeToFit: true},
      {headerName: "Status", field: 'status' ,cellRenderer: "editStatus", width: 130, editable: true,suppressSizeToFit: true },
      {headerName: "Days", field: 'days', width: 80, suppressSizeToFit: true,valueParser: this.numberParser,
      cellClassRules: {
        "rag-yellow": "x <'50'",
        "rag-red": "x >= '20'"
      }},
      {headerName: "Subject", field: 'title' , width: 240, suppressSizeToFit: true },
      {headerName: "Platform", field: 'platform' , width: 100, suppressSizeToFit: true },
      {headerName: "Category", field: 'problemType' , width: 130, suppressSizeToFit: true},
      {headerName: 'Priority', field: 'priorityLevel', width: 130, suppressSizeToFit: true, valueParser: this.numberParser,
      cellClassRules: {
        "rag-green": "x =='Low'",
        "rag-amber": "x == 'Medium'",
        "rag-red": "x == 'High'"
      }},
      {headerName : "Assisgn To" ,field:'assignedTo', width: 130, suppressSizeToFit: true },
      {headerName: "Country", field: 'country' ,width: 130, suppressSizeToFit: true },
      {headerName: "Operator",field: 'operator' , width: 100, suppressSizeToFit: true},
      {headerName: "Biller",field: 'billerName' , width: 100, suppressSizeToFit: true},
      {headerName: "Raised By", field: 'raisedBy', width: 100, suppressSizeToFit: true},
    ];
  }


  getClosedTicktes = async () => {
    this.rowdata = await this._ticketService.getClosedTicktes();
    this.rowdata.forEach((res , index) => {
      let addedOn = new Date(res['addedOn']).getTime();
      let todate = new Date().getTime();
      let diff = todate - addedOn;
      res['days'] = Math.round(Math.abs(diff/(1000*60*60*24)));
      res['addedOn'] = this.todayDate(res['addedOn']);
    
   });
  }

  getPendingTicktes = async () => {
    this.rowdata = await this._ticketService.getPendingTicktes();
    this.rowdata.forEach((res , index) => {
      let addedOn = new Date(res['addedOn']).getTime();
      let todate = new Date().getTime();
      let diff = todate - addedOn;
      res['days'] = Math.round(Math.abs(diff/(1000*60*60*24)));
      res['addedOn'] = this.todayDate(res['addedOn']);
    
   });
  }

  getPersonalTicktes = async () => {
    this.rowdata = await this._ticketService.getPersonalTicktes();
    this.rowdata.forEach((res , index) => {
      let addedOn = new Date(res['addedOn']).getTime();
      let todate = new Date().getTime();
      let diff = todate - addedOn;
      res['days'] = Math.round(Math.abs(diff/(1000*60*60*24)));
      res['addedOn'] = this.todayDate(res['addedOn']);
    
   });
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
 

}
