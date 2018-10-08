import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketService} from "../../../shared/services/ticket.service";

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
                    <div class="input-group-prepend"><span class="input-group-text">$</span></div>
                    <input type="number" class="form-control" [(ngModel)]="bidrate" placeholder="Bidrate" name="bidrate">
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

export class StatusComponent {

  @Input() id;
  @Input() eventId;
  @Input() status;

  @Output() clickevent = new EventEmitter<string>();

  constructor(public activeModal: NgbActiveModal, private _ticketService: TicketService) { }

  

  saveChangesBidrate = async()=>{
    // this.eventId = this.eventId!=null? this.eventId: 0
    let data : any = {
      id : this.id,
      status : this.status
    }
      await this._ticketService.updateAssigned(data)
      
          this.clickevent.emit(this.status);
          this.activeModal.close('Close click');
  }

}
