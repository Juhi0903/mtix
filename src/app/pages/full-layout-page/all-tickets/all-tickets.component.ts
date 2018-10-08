import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
// import {GridOptions} from 'ag-grid-angular/main';
import {ICellRendererAngularComp, ICellEditorAngularComp} from "ag-grid-angular";
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketService} from "../../../shared/services/ticket.service";
import {status, priorityLevel,problemType } from '../../../app.config';
import {PriorityComponent } from '../../priority/priority/priority.component';
import {AssignedComponent} from '../../assigned/assigned/assigned.component';
import {StatusComponent} from '../../status/status/status.component';
import { TicketDetailsComponent} from '../../ticket-details/ticket-details/ticket-details.component';

@Component({
  selector: 'status-edit-url',
  template: '<a title="Optimise Offer" (click)="onClick()"><i class="ft-edit-2 info font-medium-1 mr-1"></i>{{offerId}}</a>'
})

export class EditStatus implements ICellRendererAngularComp {
  params: any;
  url: string;
  public orgDomain:string;
  offerId : any;

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
    this.offerId = params.node.data.status;
  }

  onClick() {
    const modalRef = this.modalService.open(StatusComponent);
    modalRef.componentInstance.clickevent.subscribe(($e) => {
      // this.params.node.data.rotationValues = $e;
      // this.percentage = $e;
    });
    // modalRef.componentInstance.offerId = this.offerId;
    // modalRef.componentInstance.percentage = this.percentage;
    // modalRef.componentInstance.randomValue = 1001;
  }

  public showModal (){
    this.openOffer(this.offerId);
  }
  openOffer(offerId){
    const modalRef = this.modalService.open(StatusComponent);
    modalRef.componentInstance.offerId = offerId;
  }

}

@Component({
  selector: 'status-edit-url',
  template: '<a title="Optimise Offer" (click)="onClick()"><i class="ft-edit-2 info font-medium-1 mr-1"></i>{{offerId}}</a>'
})

export class EditPriority implements ICellRendererAngularComp {
  params: any;
  url: string;
  public orgDomain:string;
  offerId : any;
  id;

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
    this.offerId = params.node.data.priorityLevel;
    this.id = params.node.data.id;
  }

  onClick() {
    const modalRef = this.modalService.open(PriorityComponent);
    modalRef.componentInstance.clickevent.subscribe(($e) => {
      this.params.node.data.priorityLevel = $e;
      // this.percentage = $e;
    });
    modalRef.componentInstance.priority = this.offerId;
    modalRef.componentInstance.id = this.id;
    // modalRef.componentInstance.randomValue = 1001;
  }

}

@Component({
  selector: 'status-edit-url',
  template: '<a title="Optimise Offer" (click)="onClick()"><i class="ft-edit-2 info font-medium-1 mr-1"></i>{{assignedTo}}</a>'
})

export class EditAssignTo implements ICellRendererAngularComp {
  params: any;
  url: string;
  public orgDomain:string;
  assignedTo : any;
  id;

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
    this.assignedTo = params.node.data.assignedTo;
    this.id = params.node.data.id;
  }

  onClick() {
    const modalRef = this.modalService.open(AssignedComponent);
    modalRef.componentInstance.clickevent.subscribe(($e) => {
      this.params.node.data.assignedTo = $e;
      this.assignedTo = $e;
      // console.log($e);
    });
    modalRef.componentInstance.assignedTo = this.assignedTo;
    modalRef.componentInstance.id = this.id;
    // modalRef.componentInstance.randomValue = 1001;
  }

}

@Component({
  selector: 'status-edit-url',
  template: '<a title="Optimise Offer" (click)="onClick()">{{ticketid}}</a>'
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
    // this.url = "/" + this.orgDomain + "/" + urls.editOffer + "/" + params.node.data.offerId;
    this.ticketid = params.node.data.ticketId;
    this.title = params.node.data.title;
    this.raiseOn = params.node.data.addedOn;
  }

  onClick() {
    const modalRef = this.modalService.open(TicketDetailsComponent , {size : 'lg'});
    modalRef.componentInstance.clickevent.subscribe(($e) => {
      // this.params.node.data.assignedTo = $e;
      // this.ticketid = $e;
      // console.log($e);
    });
    modalRef.componentInstance.ticketid = this.ticketid;
    modalRef.componentInstance.title = this.title;
    modalRef.componentInstance.raiseOn = this.raiseOn;
    // modalRef.componentInstance.title = this.title;
  }

}


@Component({
  selector: 'app-all-tickets',
  templateUrl: './all-tickets.component.html',
  styleUrls: ['./all-tickets.component.scss']
})
export class AllTicketsComponent implements OnInit {

  allTicketForm : FormGroup;
  date = new Date();
  today : any;
  columnDefs : any;
  rowdata : any;
  priority : any = [];
  problemType : any =[];
  defaultColDef : any;
  getRowNodeId : any;
  gridColumnApi : any;
  gridApi : any;
  frameworkComponents;
  rowSelection;
  

  constructor(private _formBuilder: FormBuilder,private _ticketService : TicketService) { 
    this.today = this.todayDate(this.date);
    this.priority = priorityLevel;
     this.problemType = problemType;
     this.setColumnDefs();
    this.frameworkComponents = {
      editStatus: EditStatus,
      editPriority: EditPriority,
      editAssignto:EditAssignTo,
      ticketdetails : EditAndViewDetails

    };
  }

  ngOnInit() {
    this._OnInit();
    this.getAllTickets();
  }

  _OnInit(){
    this.allTicketForm = this._formBuilder.group({
      basicInformation : this._formBuilder.group({
        fromDate : new FormControl(this.today,[Validators.required]),
        toDate : new FormControl(this.today,[Validators.required]),
      })
    });
  }

  todayDate(dateparam){
    return dateparam.toISOString().substring(0,10);
  }
 

  setColumnDefs(){
    this.columnDefs = [
      {headerName : "Id", field:'ticketId' , cellRenderer: "ticketdetails",width: 100, suppressSizeToFit: true},
      {headerName: "Raised On", field: 'addedOn' , width: 120, suppressSizeToFit: true},
      {headerName: "Status", field: 'status' ,cellRenderer: "editStatus", width: 130, editable: true,
      suppressSizeToFit: true },
      {headerName: "Subject", field: 'title' , width: 240, suppressSizeToFit: true },
      {headerName: "Category", field: 'problemType' , width: 130, suppressSizeToFit: true},
      {headerName: 'Priority', field: 'priorityLevel', cellRenderer: "editPriority" , width: 130, suppressSizeToFit: true,valueParser: this.numberParser,
      cellClassRules: {
        "rag-green": "x =='Low'",
        "rag-amber": "x == 'Medium'",
        "rag-red": "x == 'High'"
      }},
      {headerName : "Assisgn To" ,field:'assignedTo', cellRenderer: "editAssignto", width: 130, suppressSizeToFit: true },
      {headerName: "Country", field: 'country' ,width: 130, suppressSizeToFit: true },
      {headerName: "Operator",field: 'operator' , width: 100, suppressSizeToFit: true},
      {headerName: "Raised By", field: 'raiseby', width: 100, suppressSizeToFit: true},
    ];

    this.rowSelection = "multiple";

    // this.defaultColDef = { editable: true };
    // this.getRowNodeId = function(data) {
    //   return data.id;
    // };
  }

  getAllTickets = async()=>{

    let toarray = this.allTicketForm.value.basicInformation.toDate.split("-"); //yyyy-MM-dd
    let fromarray = this.allTicketForm.value.basicInformation.fromDate .split("-");
    let toDate = toarray[1] + "/" + toarray[2] + "/" + toarray[0]; //MM/dd/yyyy
    let fromDate = fromarray[1] + "/" + fromarray[2] + "/" + fromarray[0];

    let report : any = {
      todate : toDate,
      fromdate : fromDate
    };
     this.rowdata = await this._ticketService.getAllTickets();
     this.rowdata.forEach((res , index) => {
       this.problemType.forEach((data)=>{
          if(res['problemType']==data['id'])
            res['problemType']=data['name']
       });
       this.priority.forEach((data)=>{
        if(res['priorityLevel']==data['id'])
          res['priorityLevel']=data['name']
     });

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
  
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    console.log(this.gridApi);
    console.log(this.gridColumnApi);
  }

}

