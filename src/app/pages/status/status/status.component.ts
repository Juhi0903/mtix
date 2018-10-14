import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketService} from "../../../shared/services/ticket.service";
import { status} from "../../../app.config";

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header" style="background-color: gainsboro ; color: black; font-weight: 500;">
      <h5 class="modal-title">Change Status</h5>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
     <div class="px-3">
      <form class="form">
       <div class="form-body">
        <div class="row">  
            <label class="col-md-3 label-control">Status</label>
            <div class="col-md-9">
                <div class="input-group">
                  <select  [(ngModel)]="status" name="status"  class="form-control" required>
                    <option value="" selected="" disabled="true">Select Priority Level</option>
                    <option *ngFor="let obj of statusList" [value]='obj.name'>{{obj.name}}</option>
                  </select>
                </div>
            </div>
        </div>
        <div class="row">
        <label class="col-md-3 label-control">Remarks</label>
          <div class="col-md-9">
              <div class="input-group">
                <textarea rows="8" class="form-control" [(ngModel)]="remarks" placeholder="Recent Update" name="remarks" required></textarea>
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
      <button type="button" class="btn btn-raised btn-primary" (click)="saveChangesStatus()">Save</button>
     </div>
    </div>
  `
})

export class StatusComponent {

  @Input() ticketId;
  @Input() eventId;
  @Input() status;

  statusList : any =[];
  remarks : any;

  @Output() clickevent = new EventEmitter<string>();

  constructor(public activeModal: NgbActiveModal, private _ticketService: TicketService) { 
    this.statusList = status;
  }

  saveChangesStatus = async()=>{
    let data : any = {
      ticketId : this.ticketId,
      status : this.status,
      remarks : this.remarks
    }
      await this._ticketService.updateStatus(data);
      this.clickevent.emit(this.status);
      this.activeModal.close('Close click');
  }

}
