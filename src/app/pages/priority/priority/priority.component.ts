import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketService} from "../../../shared/services/ticket.service";
import {status, priorityLevel,problemType } from '../../../app.config';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header" style="background-color: gainsboro ; color: black; font-weight: bold;">
      <h5 class="modal-title">Change Priority</h5>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
     <div class="px-3">
      <form class="form">
       <div class="form-body">
        <div class="row">  
            <label class="col-md-3 label-control">Priority Level</label>
            <div class="col-md-9">
                <div class="input-group">
                <select  [(ngModel)]="priority" name="priority"  class="form-control">
                  <option value="" selected="" disabled="true">Select Priority Level</option>
                  <option *ngFor="let obj of priorities" [value]='obj.name'>{{obj.name}}</option>
                </select>
                </div>
            </div>
        </div>
       </div>
      </form>
     </div>
   </div>
    <div class="modal-footer">
     <div class="form-actions">
      <button type="button" class="btn btn-raised btn-warning" (click)="activeModal.close('Close click')"> Close</button>
      <button type="button" class="btn btn-raised btn-primary" (click)="saveChangesPriority()">Save</button>
     </div>
    </div>
  `
})

export class PriorityComponent {

  @Input() id;
  @Input() eventId;
  @Input() priority ;
  priorities : any = [];

  @Output() clickevent = new EventEmitter<string>();

  constructor(public activeModal: NgbActiveModal, private _ticketService: TicketService) { 
    this.priorities = priorityLevel;
  }

  saveChangesPriority = async() =>{
    // this.eventId = this.eventId!=null? this.eventId: 0;
  console.log(this.priority);
    let data : any = {
      id : this.id,
      priorityLevel : this.priority
    }
    const d = await this._ticketService.updatePriority(data);
      this.clickevent.emit(this.priority);
      this.activeModal.close('Close click');
  }

}
