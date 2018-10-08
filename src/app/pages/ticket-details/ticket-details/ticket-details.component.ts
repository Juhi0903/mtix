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
  
  @Output() clickevent = new EventEmitter<string>();

  constructor(public activeModal: NgbActiveModal) {
    this.details = details;
   }

  ngOnInit() {
  }

}
