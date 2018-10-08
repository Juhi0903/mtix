import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketService} from "../../../shared/services/ticket.service";
import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header" style="background-color: #484848 ; color: white; font-weight: bold">
      <h5 class="modal-title">Change Person</h5>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
     <div class="px-3">
      <form class="form">
       <div class="form-body">
        <div class="row">  
            <label class="col-md-3 label-control">Member</label>
            <div class="col-md-9">
                <div class="input-group">
                <select  [(ngModel)]="assignedTo" name="assignedTo"  class="form-control">
                <option value="" selected="" disabled="true">Select Team Member</option>
                <option *ngFor="let obj of users" [value]='obj.emailid'>{{obj.emailid}}</option>
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
      <button type="button" class="btn btn-raised btn-primary" (click)="saveChangesBidrate()">Save</button>
     </div>
    </div>
  `
})

export class AssignedComponent  {

  @Input() id;
  @Input() eventId;
  @Input() assignedTo;

  @Output() clickevent = new EventEmitter<string>();
  users : any =[];

  constructor(public activeModal: NgbActiveModal, private _ticketService: TicketService) {
    this.getAllUsers();
   }

  saveChangesBidrate= async()=>{
    let data : any = {
      id : this.id,
      assignedTo : this.assignedTo
    }
      await this._ticketService.updateAssigned(data);
          this.clickevent.emit(this.assignedTo);
          this.activeModal.close('Close click');
    
    
  }

  getAllUsers = async() =>{
  this.users = await this._ticketService.getAllUsers();
  }

}
