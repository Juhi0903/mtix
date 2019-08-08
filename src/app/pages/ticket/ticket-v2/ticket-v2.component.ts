import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute ,Router , Params } from '@angular/router';
import {urls,status, priorityLevel,problemType , platform, headstatus} from '../../../app.config';
import { TicketService} from "../../../shared/services/ticket.service";
import {GridOptions} from 'ag-grid-community';
import {ICellRendererAngularComp, ICellEditorAngularComp} from "ag-grid-angular";
import { formatDate } from '@angular/common';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'status-edit-url',
  template: '<a title="{{url}}" [routerLink]="url" target="_blank">{{ticketid}}</a>'
})

export class TicketDetails implements ICellRendererAngularComp {
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
  selector: 'app-ticket-v2',
  templateUrl: './ticket-v2.component.html',
  styleUrls: ['./ticket-v2.component.scss']
})
export class TicketV2Component implements OnInit {

  allTicketForm : FormGroup;
  status : any = []; 
  priority : any = [];
  problemType : any =[];
  platform : any = [];
  users : any = [];
  rowdata : any = [];
  defaultColDef : any;
  getRowNodeId : any;
  gridColumnApi : any;
  gridApi : any;
  frameworkComponents;
  columnDefs : any;
  rowSelection;
  gridOptions: GridOptions = {
    columnDefs : this.columnDefs,
    rowData : this.rowdata,
  };
  showtable = false;

  constructor(private _formBuilder: FormBuilder,
    private _ticketService : TicketService ) { 
     this.status = headstatus;
     this.priority = priorityLevel;
     this.problemType = problemType;
     this.platform = platform;
     this.setColumnDefs();
     this.frameworkComponents = {
      ticketdetails : TicketDetails
    };

  }

  ngOnInit() {
    this.getUsers();
    this._initForm();

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

  public getUsers = async () =>{
    this.users = await this._ticketService.getAllUsers();
     // console.log(data);
   }

   _initForm = ():void => {
    this.allTicketForm = this._formBuilder.group({
      basicInformation : this._formBuilder.group({
        status : new FormControl('',[Validators.required]),
        assignTo : new FormControl('',[Validators.required]),
        category : new FormControl('',[Validators.required])

      })
    });
  }

  getTickets = async() => {
    let data = {
      category : this.allTicketForm.value.basicInformation.category,
      status : this.allTicketForm.value.basicInformation.status,
      assignTo : this.allTicketForm.value.basicInformation.assignTo
    }
    console.log(data);
    this.rowdata = await this._ticketService.getTicketV2(data);
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
    this.showtable = true;

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

  toCamelCase(param){
    let firstchar = param.toString().charAt(0).toUpperCase();
    let otherChar = param.toString().substring(1,param.length);
  
    return firstchar.concat(otherChar);
  
  }

  todayDate(dateparam){
    return dateparam.toString().substring(4,16);
  }
 

}
