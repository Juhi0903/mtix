import { Component, OnInit , Input} from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
// import {GridOptions} from 'ag-grid-angular/main';
import {GridOptions} from 'ag-grid-community';
import {ICellRendererAngularComp, ICellEditorAngularComp} from "ag-grid-angular";
import { ActivatedRoute , Router} from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketService} from "../../../shared/services/ticket.service";
import {status, priorityLevel,problemType, statusCount } from '../../../app.config';
import {PriorityComponent } from '../../priority/priority/priority.component';
import {AssignedComponent} from '../../assigned/assigned/assigned.component';
import {StatusComponent} from '../../status/status/status.component';
import { TicketDetailsComponent} from '../../ticket-details/ticket-details/ticket-details.component';
import { CreateTicketComponent } from 'app/pages/full-layout-page/create-ticket/create-ticket.component';

// import {StatusDetailsComponent } from '../../status-details/status-details/status-details.component';

@Component({
  selector: 'status-edit-url',
  template: '<a title="{{url}}" [routerLink]="url"><i class="ft-edit-2 info font-medium-1 mr-1"></i>create</a>'
})

export class CreateSubTicket implements ICellRendererAngularComp {
  params: any;
  ticketId : any;
  url : any;

  constructor(private route: ActivatedRoute,private modalService: NgbModal) {
    this.route.parent.paramMap.subscribe(params => {
    });
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
    this.url = "/subticket" + "/" + params.node.data.ticketId;
  }
}
@Component({
  selector: 'status-edit-url',
  template: '<a (click)="onClick()"><i class="ft-edit-2 info font-medium-1 mr-1"></i>{{priorityLevel}}</a>'
})

export class EditPriority implements ICellRendererAngularComp {
  params: any;
  url: string;
  public orgDomain:string;
  priorityLevel : any;
  id;
  ticketId : any;
  title : any;
  

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
    this.priorityLevel = params.node.data.priorityLevel;
    this.id = params.node.data.id;
    this.ticketId = params.node.data.ticketId;
    this.title = params.node.data.title;
  }

  onClick() {
    const modalRef = this.modalService.open(PriorityComponent);
    modalRef.componentInstance.clickevent.subscribe(($e) => {
      this.params.node.data.priorityLevel = $e;
      this.priorityLevel = $e;
    });
    modalRef.componentInstance.priority = this.priorityLevel;
    modalRef.componentInstance.id = this.id;
    modalRef.componentInstance.ticketId = this.ticketId;
    modalRef.componentInstance.title = this.title;
  }

}

@Component({
  selector: 'status-edit-url',
  template: '<a (click)="onClick()"><i class="ft-edit-2 info font-medium-1 mr-1"></i>{{assignedTo}}</a>'
})

export class EditAssignTo implements ICellRendererAngularComp {
  params: any;
  url: string;
  public orgDomain:string;
  assignedTo : any;
  id;
  ticketId : any;
  title : any;

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
    this.ticketId = params.node.data.ticketId;
    this.title = params.node.data.title;
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
    modalRef.componentInstance.ticketId = this.ticketId;
    modalRef.componentInstance.title = this.title;
  }

}

@Component({
  selector: 'status-edit-url',
  template: '<a title="{{url}}" [routerLink]="url">{{ticketid}}</a>'
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
    this.url = "/ticketdetails" + "/" + params.node.data.ticketId;
    // this.ticketid = params.node.data.ticketId;
    // this.title = params.node.data.title;
    // this.raiseOn = params.node.data.addedOn;
    // this.status = params.node.data.status;
    // this.lastUpdatedOn = params.node.data.updatedOn;
  }

  // onClick() {
  //   const modalRef = this.modalService.open(TicketDetailsComponent , {size : 'lg'});
  //   modalRef.componentInstance.clickevent.subscribe(($e) => {
  //     this.params.node.data.assignedTo = $e;
  //     // this.ticketid = $e;
  //     // console.log($e);
  //   });
  //   modalRef.componentInstance.ticketid = this.ticketid;
  //   modalRef.componentInstance.title = this.title;
  //   modalRef.componentInstance.raiseOn = this.raiseOn;
  //   modalRef.componentInstance.status = this.status;
  //   modalRef.componentInstance.lastUpdatedOn = this.lastUpdatedOn;
  // }

}


@Component({
  selector: 'app-all-tickets',
  templateUrl: './all-tickets.component.html',
  styleUrls: ['./all-tickets.component.scss']
})
export class AllTicketsComponent implements OnInit {

  allTicketForm : FormGroup;
  date : any = new Date();
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
  gridOptions: GridOptions = {
    columnDefs : this.columnDefs,
    rowData : this.rowdata,
  };
  status : any = [];
  users : any =[];
  emailId : any;
  stat : any;
  statusCount = [];
  statusList = [];
  notupdated : any = null;
  constructor(private _formBuilder: FormBuilder,private _ticketService : TicketService,private router: Router,private route: ActivatedRoute) { 
    this.today = this.todayDate(this.date);
    // console.log(this.today);
    this.priority = priorityLevel;
     this.problemType = problemType;
     this.status = status;
     this.setColumnDefs();
     this.emailId= this.route.snapshot.paramMap.get('id');
     this.stat= this.route.snapshot.paramMap.get('status');
     this.notupdated=this.route.snapshot.routeConfig.path;
    this.frameworkComponents = {
      editPriority: EditPriority,
      editAssignto:EditAssignTo,
      ticketdetails : EditAndViewDetails,
      createSubTicket : CreateSubTicket

    };


  }

  ngOnInit() {
    // this._OnInit();
    this.getAllTickets();
    // this.getUsers();
  }

  _OnInit(){
    this.allTicketForm = this._formBuilder.group({
      basicInformation : this._formBuilder.group({
        status : new FormControl(''),
        assignTo : new FormControl(''),
      })
    });
  }

  todayDate(dateparam){
    return dateparam.toString().substring(4,16);
  }
 

  setColumnDefs(){
    this.columnDefs = [
      {headerName : "Id", field:'ticketId' , cellRenderer: "ticketdetails",width: 120, suppressSizeToFit: true, pinned: "left"},
      // {headerName: "Parent", field: 'parentTicket' , width: 90, suppressSizeToFit: true, pinned: "left"},
      
      {headerName: "Raised On", field: 'addedOn' , width: 100, suppressSizeToFit: true, pinned: "left"},
      {headerName: "Subject", field: 'title' , width: 240, suppressSizeToFit: true,pinned: "left" },
      {headerName: 'Priority', field: 'priorityLevel', cellRenderer: "editPriority" , width: 100, suppressSizeToFit: true,valueParser: this.numberParser,
      cellClassRules: {
        "rag-green": "x =='Low'",
        "rag-yellow": "x == 'Moderate'",
        "rag-amber": "x == 'High'",
        "rag-red" : "x== 'Immediate'"
      }},
      {headerName: "Country", field: 'country' ,width: 100, suppressSizeToFit: true },
      // {headerName: "Platform", field: 'platform' , width: 100, suppressSizeToFit: true },
      
      {headerName: "Category", field: 'problemType' , width: 100, suppressSizeToFit: true},
      {headerName: "Raised By", field: 'raisedBy', width: 100, suppressSizeToFit: true},
      {headerName : "Assisgn To" ,field:'assignedTo', cellRenderer: "editAssignto", width: 130, suppressSizeToFit: true },
      // {headerName: "Country", field: 'country' ,width: 100, suppressSizeToFit: true },
      // {headerName: "Operator",field: 'operator' , width: 100, suppressSizeToFit: true},
      // {headerName: "Biller",field: 'billerName' , width: 100, suppressSizeToFit: true},
      
      {headerName: "Days", field: 'days', width: 80, suppressSizeToFit: true, valueParser: this.numberParser,
      cellClassRules: {
        "rag-light": "x <'50'",
        "rag-red": "x >= '20'"
      }},
      {headerName: "Status", field: 'status' , width: 100, suppressSizeToFit: true,valueParser: this.numberParser,
      cellClassRules: {
        "rag-green": "x == 'Closed'",
        "rag-red": "x == 'Yet To Start'"
      }},
      {headerName: "Last Updated", field: 'updatedOn' , width: 130, suppressSizeToFit: true},
      {headerName: "Sub Ticket", field: '' , cellRenderer: "createSubTicket", width: 100, suppressSizeToFit: true },
    ];

    this.defaultColDef = { width: 100 };
    // this.rowSelection = "multiple";
  }

  getAllTickets = async()=>{
    // let status = this.allTicketForm.value.basicInformation.status;
    // let assignTo = this.allTicketForm.value.basicInformation.assignTo;
    // if(status=='' && assignTo==''){
    //   this.rowdata = await this._ticketService.getAllTickets();
    // } 
    // else{
    //   if(status!='' && assignTo!=''){
    //     let report : any = {
    //       status : status,
    //       assignTo : assignTo,
    //     }
    //     this.rowdata = await this._ticketService.getTicketsByStatusOrPerson(report);
    //   }
    //   else if(status!=''){
    //     let report : any = {
    //       status : status,
    //     }
    //     this.rowdata = await this._ticketService.getTicketsByStatusOrPerson(report);
    //   }
    //   else if(assignTo!=''){
    //     let report : any = {
    //       assignTo : assignTo,
    //     }
    //     this.rowdata = await this._ticketService.getTicketsByStatusOrPerson(report);
    //   }
    // }
    if(this.emailId!= null && this.stat!= null){
      let data = {
        status : this.stat,
        assignTo : this.emailId
      }
      this.rowdata = await this._ticketService.getTicketsByStatusAndPerson(data);
    }
    else if(this.notupdated=='ticket/notupdated'){
      this.rowdata = await this._ticketService.getNotUpdatedTickets();
    }
     else{
      this.rowdata = await this._ticketService.getAllTickets();
    }
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
       if(res['parentTicket']==null){
         res['parentTicket'] = res['ticketId'];
       }
       res['days'] = Math.round(Math.abs(diff/(1000*60*60*24)));
       let time = new Date(res['addedOn']).setHours(new Date(res['addedOn']).getHours() + 5);
       res['addedOn'] = new Date(time).toString().substring(4,16);
       res['updatedOn'] = this.todayDate(new Date(res['updatedOn']));
     
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

  //  this.getAnalysedData(this.rowdata);
    
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
  
  // onGridReady(params) {
  //   this.gridApi = params.api;
  //   this.gridColumnApi = params.columnApi;
  //   console.log(this.gridApi);
  //   console.log(this.gridColumnApi);
  // }

  exportToExcel(){
    let exportOnlySelected = false;
    let dt = new Date();
    let day = dt.getDate();
    let month = dt.getMonth() + 1;
    let year = dt.getFullYear();
    let hour = dt.getHours();
    let mins = dt.getMinutes();
    let postfix = day + "." + month + "." + year + "_" + hour + "." + mins;
    let params = {
      skipHeader: false,
      skipFooters: true,
      skipGroups: true,
      onlySelected: exportOnlySelected,
      columnKeys: ['ticketId' ,'addedOn','status','days','title','platform','problemType',
                    'priorityLevel' , 'assignedTo' , 'country','operator','billerName','raisedBy'],
      fileName: "Ticket_" + postfix +".xls"
    };
    this.gridOptions.api.exportDataAsCsv(params);
  }

  public getUsers = async () =>{
    this.users = await this._ticketService.getAllUsers();
     // console.log(data);
   }

   removeRestrictions(){
    this.allTicketForm.patchValue({
      basicInformation:{
        status : '',
        assignTo : ''
    }
  });
}

  

}

