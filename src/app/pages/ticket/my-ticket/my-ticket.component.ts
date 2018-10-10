import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { pending_url, personal_url, closed_url, priorityLevel,problemType } from "../../../app.config"
import { TicketService } from "../../../shared/services/ticket.service";

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

  constructor(
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _ticketService: TicketService) {
    this.url = router.url;
    this.closed_url = closed_url;
    this.pending_url = pending_url;
    this.personal_url = personal_url;
    this.priority = priorityLevel;
    this.problemType = problemType;
    


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
      {headerName: "Subject", field: 'title' , width: 240, suppressSizeToFit: true },
      {headerName: "Category", field: 'problemType' , width: 130, suppressSizeToFit: true},
      {headerName: 'Priority', field: 'priorityLevel', cellRenderer: "editPriority" , width: 130, suppressSizeToFit: true},
      {headerName : "Assisgn To" ,field:'assignedTo', cellRenderer: "editAssignto", width: 130, suppressSizeToFit: true },
      {headerName: "Country", field: 'country' ,width: 130, suppressSizeToFit: true },
      {headerName: "Operator",field: 'operator' , width: 100, suppressSizeToFit: true},
      {headerName: "Raised By", field: 'raiseby', width: 100, suppressSizeToFit: true},
    ];
  }


  getClosedTicktes = async () => {
    this.rowdata = await this._ticketService.getClosedTicktes();
    console.log(this.rowdata);
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

  getPendingTicktes = async () => {
    this.rowdata = await this._ticketService.getPendingTicktes();
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

  getPersonalTicktes = async () => {
    this.rowdata = await this._ticketService.getPersonalTicktes();
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

}
