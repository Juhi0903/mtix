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
import saveAs from 'file-saver';


@Component({
  selector: 'status-edit-url',
  template: '<a (click)="onClick()"><i class="ft-edit-2 info font-medium-1 mr-1"></i>{{remarks}}</a>'
})

export class EditRemaks implements ICellRendererAngularComp {
  params: any;
  ticketId : any;
  title : any;
  remarks : any;
  status : any;
  addedOn : any;
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
    this.remarks = params.node.data.remarks;
    this.addedOn = params.node.data.addedOn;
    this.ticketId = params.node.data.ticketId;
    this.title = params.node.data.title;
    this.status = params.node.data.status;
    this.id = params.node.data.id;
  }

  onClick() {
    const modalRef = this.modalService.open(StatusComponent, {size:'lg'});
    modalRef.componentInstance.clickevent.subscribe(($e) => {
      // this.params.node.data.status = $e;
      this.remarks = $e;
    });
    modalRef.componentInstance.status = this.status;
    modalRef.componentInstance.updateType = 'remarks';
    modalRef.componentInstance.ticketId = this.ticketId;
    modalRef.componentInstance.title = this.title;
    modalRef.componentInstance.remarks = this.remarks;
    modalRef.componentInstance.addedOn = this.addedOn;
    modalRef.componentInstance.id = this.id;
  }

}

@Component({
  selector: 'status-edit-url',
  template: '<a (click)="downloadFile(path,name)" href="javascript:;">{{name}}</a>'
})

export class DownloadFile implements ICellRendererAngularComp {
  params: any;
  ticketId : any;
  name : any;
  path : any;
 
  constructor(private route: ActivatedRoute,private modalService: NgbModal,private _ticketService : TicketService) {
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
    this.name = params.node.data.filename;
    this.path = params.node.data.filepath;
    this.ticketId = params.node.data.ticketId;
  }

  downloadFile(path,name){
      console.log("here");
      let filename = path;
      this._ticketService.downloadReport(filename).subscribe(
        data => {
         saveAs(data, name);
        },
        err => {
          alert("Problem while downloading the file.");
          console.error(err);
        }
      );
    }
  

}

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
  ticketType : any;
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
  subcolumnDefs : any;
  showRemarks = false;
  showStatus = false;
  showAnalysis = false;
  showChart = false;
  // gridOptions : any;
  gridOptions: GridOptions = {
    columnDefs : this.columnDefs,
    rowData : this.rowdata,
  };
  subTicketList : any = [];
  Open = 10000;
  @Output() clickevent = new EventEmitter<string>();
  frameworkComponents : any;
   newdate: any;

  constructor(private _ticketService : TicketService,private router: Router, private route: ActivatedRoute,private modalService: NgbModal) {
    this.ticketid= this.route.snapshot.paramMap.get('id');
    // this.lastUpdatedOn= this.route.snapshot.paramMap.get('date');
    console.log(this.ticketid);
    this.getParentTicketInfo();
    this.getAllSubTickets();
    this.getTicketRemarks();
    this.frameworkComponents = {
      editremaks: EditRemaks,
      downloadfile : DownloadFile,
    };
  
   }

  ngOnInit() {

    // console.log(this.lastUpdatedOn);
    this.columnDefs = [
      {headerName : "Date", field:'addedOn' , width: 130, suppressSizeToFit: true},
      {headerName: "Ticket", field: 'type' , width: 100, suppressSizeToFit: true},
      {headerName: "SPOC", field: 'assignedTo' , width: 200, suppressSizeToFit: true},
      {headerName: "Status", field: 'status' , width: 140, suppressSizeToFit: true},
      {headerName: "Step", field: 'stage' , width: 120, suppressSizeToFit: true},
      {headerName: "Sub Step", field: 'subStage' , width: 120, suppressSizeToFit: true},
      {headerName: "Remarks", field: 'remarks' , cellRenderer: "editremaks" ,width: 450, suppressSizeToFit: true},
      {headerName: "Attachment", field: 'filename' , width: 180, cellRenderer: "downloadfile",suppressSizeToFit: true},
    ];

    // this.subcolumnDefs = [
    //   {headerName: "Sub Ticket", field: 'ticketId' , width: 130, suppressSizeToFit: true},
    //   {headerName : "Date", field:'addedOn' , width: 100, suppressSizeToFit: true},
    //   {headerName: "Subject", field: 'title' , width: 260, suppressSizeToFit: true},
    //   {headerName: "Status", field: 'status' , width: 130, suppressSizeToFit: true},
    //   {headerName: "Category", field: 'problemType' , width: 120, suppressSizeToFit: true},
    //   {headerName: "Assigned", field: 'assignedTo' , width: 180, suppressSizeToFit: true},
    //   {headerName: "Raised By", field: 'raisedBy' , width: 180, suppressSizeToFit: true},
    //   ];
    
  }

  getTicketRemarks = async()=>{
    this.details = await this._ticketService.getDetails(this.ticketid);
    let length = this.details.length-1;
    // this.details.forEach((res , index) => {
    //   res['addedOn'] = this.todayDate(res['addedOn']);
    // });
    this.rowdata = [];
    let finalMap = new Map();
    let raisedOn =  new Date(this.raiseOn).getTime();
    let todate =  new Date().getTime();
    let diff = todate - raisedOn;
    let day = Math.round(Math.abs(diff/(1000*60*60*24)));
    // console.log(day);
    this.details.forEach((res , index) => {
      this.detailsArray = {} as detailsArray;
      let date = res['addedOn'].toString().substring(0,16);
      // console.log(date);
      this.detailsArray['addedOn'] = date.replace('T','-');
      this.detailsArray['remarks'] = res['remarks'];
      this.detailsArray['type'] =    this.ticketType;
      this.detailsArray['assignedTo'] = res['addedBy'];
      this.detailsArray['status'] = res['status'];
      this.detailsArray['ticketId'] = res['ticketId'];
      this.detailsArray['stage'] = res['stage']
      this.detailsArray['subStage'] = res['subStage'];
      this.detailsArray['id'] =  res['id'];
      this.detailsArray['filename'] = res['fileName'];
      this.detailsArray['filepath'] = res['filePath'];
      if(res['status']==null)
      this.detailsArray['status'] = 'Not Updated';
      finalMap.set(this.todayDate(res['addedOn']),this.detailsArray);
      this.rowdata.push(this.detailsArray);
      // console.log(finalMap);
     
      });
    if(day > 0) {
    for(let i=0;i<day;i++){
      this.detailsArray = {} as detailsArray;
        let res = new Date(this.raiseOn)
        let added = new Date(res.setHours(res.getHours()+24*i)); // y +'-' +m +'-' +

        let m =  new Date(added).getMonth()+1;
        let y =  new Date(added).getFullYear();
        let d =  new Date(added).getDate();
        if(d<= 9)
        this.newdate = y +'-' +m +'-0' + d;
        else
        this.newdate = y +'-' +m +'-' + d;
      
        // console.log(date);
       let closedDate = Number(new Date(this.lastUpdatedOn).getTime());
       let lastedData = Number(new Date(this.newdate).getTime());
       if(!finalMap.has(this.newdate)){
        this.detailsArray['addedOn'] =this. newdate + '-00:00';
        this.detailsArray['status'] = 'Not Updated';
        this.detailsArray['assignedTo'] = 'System';
        this.detailsArray['type'] = this.ticketType;
        this.detailsArray['ticketId'] = this.ticketid;
        this.detailsArray['id'] = 0;
        if(this.status==='Closed'){
        if(closedDate >= lastedData){
            console.log("if status closed");
            finalMap.set(this.newdate,this.detailsArray);
            this.rowdata.push(this.detailsArray);
        }
      }
        else if(this.status!='Closed'){
          finalMap.set(this.newdate,this.detailsArray);
          this.rowdata.push(this.detailsArray);
        }

       }
     };
     this.rowdata.sort(function(a, b) {
      var nameA = a.addedOn; 
      var nameB = b.addedOn; 
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
     
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
    // console.log(data);
    let result = await this._ticketService.saveRemaks(data);
    // console.log(result);
    // this.router.navigate([ '/' +  urls.ticket], { relativeTo: this.route.parent });
    // this.activeModal.close('Close click');
    this.remarks = '';
    this.getTicketRemarks();
  }

  getParentTicketInfo = async () =>{
    this.ticketDetails = await this._ticketService.getTicketDetails(this.ticketid);
    // console.log(this.ticketDetails);
    this.ticketDetails.forEach((res , index) => {
      res['addedOn'] = this.todayDate(res['addedOn']);
      this.title = res['title'];
      this.raiseOn = res['addedOn'];
      this.lastUpdatedOn = res['updatedOn'];
      this.status = res['status'];
      this.ticketid = res['ticketId'];
      this.assignedTo = res['assignedTo'];
      this.id = res['id'];
      // this.ticketId = res['ticketId'];
      if(res['parentTicket']!=null)
        this.ticketType= 'Sub Ticket';
      else 
      this.ticketType= 'Main Ticket';
      
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
    // console.log("showAnalysis");
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
      this.getTicketRemarks();
    });
    modalRef.componentInstance.status = this.status;
    modalRef.componentInstance.ticketId = this.ticketid;
    modalRef.componentInstance.title = this.title;
    // console.log(this.status ,">>>>>>>>" , this.ticketid);
  }

  changeAssignedTo(){
    const modalRef = this.modalService.open(AssignedComponent);
    modalRef.componentInstance.clickevent.subscribe(($e) => {
      this.assignedTo = $e;
      // console.log($e);
      this.getTicketRemarks();
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

  createSubTicket(){
     let url = "subticket" + "/" + this.ticketid;
     this.router.navigate([ '/' + url], { relativeTo: this.route.parent });
  }

  downloadFile(path,name){
    console.log("here");
    let filename = path;
    this._ticketService.downloadReport(filename).subscribe(
      data => {
       saveAs(data, name);
      },
      err => {
        alert("Problem while downloading the file.");
        console.error(err);
      }
    );
  }

  exportData(){
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
      columnKeys: ['addedOn' ,'type','assignedTo','status','stage','subStage','remarks'],
      fileName: this.ticketid +'_' +postfix +".xls"
    };
    this.gridOptions.api.exportDataAsCsv(params);
  }
}

