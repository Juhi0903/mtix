import { Component, OnInit , Input,  EventEmitter, Output} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketService} from "../../../shared/services/ticket.service";
import {status, priorityLevel,problemType,details } from '../../../app.config';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent {

  @Input() ticketid;
  @Input() title;
  @Input() raiseOn ;
  details : any =[];
  date = new Date();
  remarks : any;
  
  @Output() clickevent = new EventEmitter<string>();

  constructor(public activeModal: NgbActiveModal, private _ticketService : TicketService) {
    // this.details = details;
    // this.today = this.todayDate(this.raiseOn);
   }

  ngOnInit() {
    this.getTicketRemarks();
  }

  getTicketRemarks = async()=>{
    this.details = await this._ticketService.getDetails(this.ticketid);
    this.details.forEach((res , index) => {
      res['addedOn'] = this.todayDate(res['addedOn']);
      console.log(res['addedOn']);
    });
    console.log(this.details);
  }

  todayDate(dateparam){
    return dateparam.toString().substring(0,10);
  }

  submitRemarks = async () => {
    let data = {
      remarks : this.remarks,
      ticketId : this.ticketid,
    }
    console.log(data);
    let result = await this._ticketService.saveRemaks(data);
    console.log(result);
    this.activeModal.close('Close click');
  }

}
