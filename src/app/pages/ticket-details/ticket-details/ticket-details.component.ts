import { Component, OnInit , Input,  EventEmitter, Output} from '@angular/core';
// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketService} from "../../../shared/services/ticket.service";
import {detailsArray } from '../../../app.config';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import {GridOptions} from 'ag-grid-community';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {ICellRendererAngularComp, ICellEditorAngularComp} from "ag-grid-angular";
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {urls,status, priorityLevel,problemType , platform} from '../../../app.config';
import {StatusComponent} from '../../status/status/status.component';
import {AssignedComponent} from '../../assigned/assigned/assigned.component';
// import {EditAssignTo} from '../../full-layout-page/all-tickets/all-tickets.component';
// import {EditStatus} from '../../ticket/my-ticket/my-ticket.component';


@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent {

  ticketid;
  @Input() title;
  @Input() raiseOn ;
  assignedTo : any;
  id : any;
  status;
  lastUpdatedOn;
  details : any =[];
  date = new Date();
  remarks : any;
  detailsArray : any ;
  data = [];
  rowdata = [];
  ticketDetails = [];
  showsubTable = false;
  columnDefs : any;
  showRemarks = false;
  showStatus = false;
  showAnalysis = false;
  showChart = false;
  gridOptions : any;
  subTicketList : any = [];
  Open = 10000;
  @Output() clickevent = new EventEmitter<string>();

  constructor(private _ticketService : TicketService,private router: Router, private route: ActivatedRoute,private modalService: NgbModal) {
    this.ticketid= this.route.snapshot.paramMap.get('id');
    this.lastUpdatedOn= this.route.snapshot.paramMap.get('date');
    console.log(this.lastUpdatedOn);
    this.getParentTicketInfo();
    this.getAllSubTickets();
  
   }

  ngOnInit() {
    this.getTicketRemarks();
    console.log(this.lastUpdatedOn);
    this.columnDefs = [
      {headerName : "Date", field:'addedOn' , width: 100, suppressSizeToFit: true, pinned: "left"},
      {headerName: "Ticket", field: 'type' , width: 100, suppressSizeToFit: true, pinned: "left"},
      {headerName: "SPOC", field: 'assignedTo' , width: 200, suppressSizeToFit: true, pinned: "left"},
      {headerName: "Step", field: 'status' , width: 140, suppressSizeToFit: true, pinned: "left"},
      {headerName: "Sub Step", field: '' , width: 120, suppressSizeToFit: true, pinned: "left"},
      {headerName: "Remarks", field: 'remarks' , width: 450, suppressSizeToFit: true, pinned: "left"},
    ];
    
  }

  getTicketRemarks = async()=>{
    this.details = await this._ticketService.getDetails(this.ticketid);
    let length = this.details.length-1;
    this.details.forEach((res , index) => {
      res['addedOn'] = this.todayDate(res['addedOn']);
    });
    this.rowdata = [];
    let finalMap = new Map();
    let raisedOn =  new Date(this.raiseOn).getTime();
    let todate =  new Date().getTime();
    let diff = todate - raisedOn;
    // if(this.status=='Closed'){
    //   let closedDate = Number(new Date(this.lastUpdatedOn).getDate());
    //   diff = closedDate - raisedOn;
    // }
    
   
    let day = Math.round(Math.abs(diff/(1000*60*60*24)));
    this.details.forEach((res , index) => {
      this.detailsArray = {} as detailsArray;
      res['addedOn'] = this.todayDate(res['addedOn']);
      this.detailsArray['addedOn'] = res['addedOn'];
      this.detailsArray['remarks'] = res['remarks'];
      this.detailsArray['type'] =    'Main Ticket';
      this.detailsArray['assignedTo'] = res['addedBy'];
      this.detailsArray['status'] = res['status'];
      this.detailsArray['ticketId'] = res['ticketId'];
      if(res['status']==null)
      this.detailsArray['status'] = 'Not Updated';
      // spoc = res['addedBy'];
      finalMap.set(res['addedOn'],this.detailsArray);
      this.data.push(this.detailsArray);
      // console.log(this.data);
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
      //  console.log(added);
       if(!finalMap.has(added)){
        this.detailsArray['addedOn'] = added;
        this.detailsArray['status'] = 'Not Updated';
        this.detailsArray['assignedTo'] = 'System';
        this.detailsArray['type'] = 'Main Ticket';
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
  }
    this.showStatus = true;
     this.showAnalysis = false;
     this.showChart = false;
  }

  todayDate(dateparam){
    return dateparam.toString().substring(0,10);
  }

  submitRemarks = async () => {
    let data = {
      remarks : this.remarks,
      ticketId : this.ticketid,
      status : this.status
    }
    console.log(data);
    let result = await this._ticketService.saveRemaks(data);
    console.log(result);
    this.router.navigate([ '/' +  urls.ticket], { relativeTo: this.route.parent });
    // this.activeModal.close('Close click');
  }

  getParentTicketInfo = async () =>{
    this.ticketDetails = await this._ticketService.getTicketDetails(this.ticketid);
    console.log(this.ticketDetails);
    this.ticketDetails.forEach((res , index) => {
      res['addedOn'] = this.todayDate(res['addedOn']);
      this.title = res['title'];
      this.raiseOn = res['addedOn'];
      this.lastUpdatedOn = res['updatedOn'];
      this.status = res['status'];
      this.ticketid = res['ticketId'];
      this.assignedTo = res['assignedTo'];
      this.id = res['id'];
   });
  }

  getAllSubTickets =  async() =>{
     this.subTicketList = await this._ticketService.getSubTicket(this.ticketid);
     this.subTicketList.forEach((res , index) => {
      res['addedOn'] = this.todayDate(res['addedOn']);
     });
    // console.log(">>sub ticket==== ", data);
  }

  
  showAnalysisTab(){
    this.showStatus = false;
    this.showAnalysis = true;
    this.showChart = false;
    console.log("showAnalysis");
  }
  showChartTab(){
    this.showStatus = false;
    this.showAnalysis= false;
    this.showChart = true;
  }

  isNumberKey(event){
    console.log(event);
  }

  changeStatus(){
    const modalRef = this.modalService.open(StatusComponent, {size:'lg'});
    modalRef.componentInstance.clickevent.subscribe(($e) => {
      this.status = $e;
    });
    modalRef.componentInstance.status = this.status;
    modalRef.componentInstance.ticketId = this.ticketid;
    // modalRef.componentInstance.id = this.id;
    console.log(this.status ,">>>>>>>>" , this.ticketid);
  }

  changeAssignedTo(){
    const modalRef = this.modalService.open(AssignedComponent);
    modalRef.componentInstance.clickevent.subscribe(($e) => {
      this.assignedTo = $e;
      // console.log($e);
    });
    modalRef.componentInstance.assignedTo = this.assignedTo;
    modalRef.componentInstance.id = this.id;
    modalRef.componentInstance.ticketId = this.ticketid;
    modalRef.componentInstance.title = this.title;

    // console.log(this.assignedTo ,">>>>>>>>" , this.ticketid ,  ">>>>>>>" , this.id , ">>>>>>>>", this.title);
  }

  expandDetails(id, index){
    if(this.Open==index)
    this.Open= 1000;
    else
    this.Open = index;
    // console.log(id ," >>>>>>>>>>>" , index);
   
  }

  showMoreDetails(ticketId,raisedOn){
    this.router.navigate([ '/' +'ticketdetails/' +ticketId +'/' +raisedOn], { relativeTo: this.route.parent });
    // [routerLink]="['/'+ticketdetails/ + obj.ticketId +'/' +obj.raisedBy]"
  }
}

