import { Component, OnInit , Input,Inject,LOCALE_ID} from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
// import {GridOptions} from 'ag-grid-angular/main';
import { formatDate } from '@angular/common';
import {GridOptions} from 'ag-grid-community';
import {ICellRendererAngularComp, ICellEditorAngularComp} from "ag-grid-angular";
import { ActivatedRoute , Router} from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketService} from "../../../shared/services/ticket.service";
import {status, priorityLevel,problemType, statusCount , raised_notupdated , issued_notupdated} from '../../../app.config';
import {PriorityComponent } from '../../priority/priority/priority.component';
import {AssignedComponent} from '../../assigned/assigned/assigned.component';
import {StatusComponent} from '../../status/status/status.component';
import { TicketDetailsComponent} from '../../ticket-details/ticket-details/ticket-details.component';
import { CreateTicketComponent } from '../create-ticket/create-ticket.component';


@Component({
  selector: 'status-edit-url',
  template: '<a title="{{url}}" [routerLink]="url" target="_blank"><i class="ft-edit-2 info font-medium-1 mr-1"></i>create</a>'
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
    this.url = "/ticket/subticket" + "/" + params.node.data.ticketId;
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
    // modalRef.componentInstance.assignedTo = this.assignedTo;
    modalRef.componentInstance.id = this.id;
    modalRef.componentInstance.ticketId = this.ticketId;
    modalRef.componentInstance.title = this.title;
  }

}

@Component({
  selector: 'status-edit-url',
  template: '<a title="{{url}}" [routerLink]="url" target="_blank">{{ticketid}}</a>'
})

export class ViewDetails implements ICellRendererAngularComp {
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
  selector: 'app-all-tickets',
  templateUrl: './all-tickets.component.html',
  styleUrls: ['./all-tickets.component.scss']
})
export class AllTicketsComponent implements OnInit {

  allTicketForm : FormGroup;
  date : any = new Date();
  // pipe = new DatePipe('en-US')
  quickSearchValue : any;
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
  url : any;
  showForm : any = false;
  showtable : any = false;
  raised_notupdated : any;
  issued_notupdated : any;
  constructor(private _formBuilder: FormBuilder,private _ticketService : TicketService,private router: Router,private route: ActivatedRoute) { 
    this.today = this.todayDate(this.date);
    // console.log(this.today);
    this.priority = priorityLevel;
    this.problemType = problemType;
    this.raised_notupdated = raised_notupdated;
    this.issued_notupdated = issued_notupdated;
     this.status = status;
     this.setColumnDefs();
     this.emailId= this.route.snapshot.paramMap.get('id');
     this.stat= this.route.snapshot.paramMap.get('status');
     this.notupdated=this.route.snapshot.routeConfig.path;
    //  console.log(this.notupdated);
    this.frameworkComponents = {
      editPriority: EditPriority,
      editAssignto:EditAssignTo,
      ticketdetails : ViewDetails,
      createSubTicket : CreateSubTicket

    };

    this.url = router.url;
    // console.log(this.url);
    if(this.url==this.raised_notupdated || this.url==this.issued_notupdated)
      this.showForm = true;
    else{
      this.showtable = true;
      this.getAllTickets();
    }
      


  }

  ngOnInit() {
    this._OnInit();
  }

  _OnInit(){
    this.allTicketForm = this._formBuilder.group({
      basicInformation : this._formBuilder.group({
        // status : new FormControl(''),
        fromdate : new FormControl(new Date().toISOString().substring(0,10)),
      })
    });
  }

  todayDate(dateparam){
    return dateparam.toString().substring(4,16);
  }
 

  setColumnDefs(){
    this.columnDefs = [
      {headerName : "Id", field:'ticketId' , cellRenderer: "ticketdetails",width: 90, suppressSizeToFit: true, pinned: "left"},
      {headerName: "Date", field: 'addedOn' , width: 90, suppressSizeToFit: true, pinned: "left"},
      {headerName: "Subject", field: 'title' , width: 200, suppressSizeToFit: true,pinned: "left" },
      {headerName: 'Priority', field: 'priorityLevel' , width: 80, suppressSizeToFit: true,valueParser: this.numberParser,
      cellClassRules: {
        "rag-green": "x =='Low'",
        "rag-yellow": "x == 'Mode'",
        "rag-amber": "x == 'High'",
        "rag-red" : "x== 'Imme'"
      }},
      {headerName: "Category", field: 'problemType' , width: 80, suppressSizeToFit: true},
      {headerName: "Sub Category", field: 'subProblemType' ,  width: 100, suppressSizeToFit: true },
      {headerName: "Geo", field: 'country' ,width: 70, suppressSizeToFit: true },
      {headerName: "Operator", field: 'operator' ,width: 80, suppressSizeToFit: true },
      {headerName: "Biller", field: 'billerName' ,width: 80, suppressSizeToFit: true },
      {headerName: "Raised", field: 'raisedBy', width: 90, suppressSizeToFit: true},
      {headerName : "Assisgn" ,field:'assignedTo', width: 90, suppressSizeToFit: true },
      {headerName: "Days", field: 'days', width: 70, suppressSizeToFit: true, valueParser: this.numberParser,
      cellClassRules: {
        "rag-light": "x <'50'",
        "rag-red": "x >= '20'"
      }},
      {headerName: "Status", field: 'status' , width: 80, suppressSizeToFit: true,valueParser: this.numberParser,
      cellClassRules: {
        "rag-green": "x == 'Closed'",
        "rag-red": "x == 'Yet To Start'"
      }},
      {headerName: "Reviewer", field: 'reviewer' , width: 100, suppressSizeToFit: true},
      {headerName: "Reviewed", field: 'reviewed' , width: 100, suppressSizeToFit: true,valueParser: this.numberParser,
      cellClassRules: {
        "rag-green": "x =='Reviewed'",
        "rag-red" : "x== 'Not Reviewed'"
      }},
      {headerName: "Updated", field: 'updatedOn' , width: 90, suppressSizeToFit: true}
    ];
    this.defaultColDef = { width: 100 };
    // this.rowSelection = "multiple";
  }

  getAllTickets = async()=>{
    if(this.emailId!= null && this.stat!= null){
      let data = {
        status : this.stat,
        assignTo : this.emailId
      }
      this.rowdata = await this._ticketService.getTicketsByStatusAndPerson(data);
    }
    else if(this.emailId== null && this.stat!= null){
      let Status;
      if(this.stat==="Pending")
        Status = "Pending From Biller";
      else if(this.stat==="Start")
        Status = "Yet To Start";
      else if(this.stat==="Closed")
        Status = "Closed";
      else if(this.stat==="Working")
        Status = "Working";
      else if(this.stat==="Hold")
        Status = "Hold";
      let data = {
        status : Status
      }
      // console.log(Status);
      if(this.stat==="Total")
        this.rowdata = await this._ticketService.getAllTickets();
      else
      this.rowdata = await this._ticketService.getTicketByStatus(Status); 
    }
     else{
      this.rowdata = await this._ticketService.getAllTickets();
    }
    let diff;
     
     this.rowdata.forEach((res , index) => {
       let addedOn = new Date(res['addedOn']).getTime(); //MM/dd/yyyy
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
       res['addedOn'] = formatDate(time,'yyyy-MM-dd','en-US') ;  //new Date(time).
       res['updatedOn'] = formatDate(new Date(res['updatedOn']),'yyyy-MM-dd','en-US'); //this.todayDate(new Date(res['updatedOn']));
       if(res['reviewed']==1)
        res['reviewed'] = 'Reviewed';
       else if(res['status']!='Closed')
        res['reviewed'] = '';
       else
       res['reviewed'] = 'Not Reviewed';
       let tempRaised = (res['raisedBy'].toString().split('@')[0]);
       res['raisedBy'] = this.toCamelCase(tempRaised);
       let tempReviewer = (res['reviewer'].toString().split('@')[0]);
       res['reviewer'] = this.toCamelCase(tempReviewer);
       let tempAssigned = (res['assignedTo'].toString().split('@')[0]);
       res['assignedTo'] = this.toCamelCase(tempAssigned);
       res['problemType'] = (res['problemType'].toString().substring(0,4));
       res['priorityLevel'] = (res['priorityLevel'].toString().substring(0,4));
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
        // status : '',
        fromdate : ''
    }
  });
}

getNotUpdatedTickets = async() => {
  
  if(this.url==this.raised_notupdated){
    let date = this.allTicketForm.value.basicInformation.fromdate;
    // console.log(date);
    this.rowdata = await this._ticketService.getNotUpdatedTickets(date);
    this.showtable = true;
  }
  else if(this.url==this.issued_notupdated){
    let date = this.allTicketForm.value.basicInformation.fromdate;
    // console.log(date);
    this.rowdata = await this._ticketService.getIssueNotUpdatedTickets(date);
    
    this.showtable = true;
  }

  this.rowdata.forEach(res => {
    let diff;
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
    if(res['reviewed']==1)
    res['reviewed'] = 'Reviewed';
    else if(res['status']!='Closed')
    res['reviewed'] = '';
      else
    res['reviewed'] = 'Not Reviewed';
    let tempRaised = (res['raisedBy'].toString().split('@')[0]);
    res['raisedBy'] = this.toCamelCase(tempRaised);
    let tempReviewer = (res['reviewer'].toString().split('@')[0]);
    res['reviewer'] = this.toCamelCase(tempReviewer);
    let tempAssigned = (res['assignedTo'].toString().split('@')[0]);
    res['assignedTo'] = this.toCamelCase(tempAssigned);
  });
}
  
toCamelCase(param){
  let firstchar = param.toString().charAt(0).toUpperCase();
  let otherChar = param.toString().substring(1,param.length);

  return firstchar.concat(otherChar);

}

private onQuickFilterChanged() {
  this.gridOptions.api.setQuickFilter(this.quickSearchValue);
}
}

