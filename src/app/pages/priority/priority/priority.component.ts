import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketService} from "../../../shared/services/ticket.service";
import {status, priorityLevel,problemType } from '../../../app.config';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

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
      <form [formGroup]="PriorityForm" (ngSubmit)="saveChangesPriority()" class="form form-horizontal striped-rows form-bordered">
       <div class="form-body" formGroupName="formInformation">
        <div class="row">  
            <label class="col-md-3 label-control">Priority Level</label>
            <div class="col-md-9">
                <div class="input-group">
                <select formControlName="priority"  [(ngModel)]="priority" name="priority"  class="form-control">
                  <option value="" selected="" disabled="true">Select Priority Level</option>
                  <option *ngFor="let obj of priorities" [value]='obj.name'>{{obj.name}}</option>
                </select>
                </div>
            </div>
        </div>
        <div class="row">
        <label class="col-md-3 label-control">Remarks</label>
          <div class="col-md-9">
              <div class="input-group">
                <textarea rows="8" class="form-control" formControlName="remarks" placeholder="Changing Priority because" name="remarks" required></textarea>
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
      <button type="button" class="btn btn-raised btn-primary" [disabled]="!PriorityForm.valid" (click)="saveChangesPriority()">Save</button>
     </div>
    </div>
  `
})

export class PriorityComponent {

  @Input() id;
  @Input() eventId;
  @Input() priority ;
  @Input() ticketId;
  @Input() title;
  priorities : any = [];
  PriorityForm : FormGroup;
  @Output() clickevent = new EventEmitter<string>();

  constructor(public activeModal: NgbActiveModal, private _ticketService: TicketService,private _formBuilder: FormBuilder) { 
    this.priorities = priorityLevel;
  }

  ngOnInit() {
    this.PriorityForm = this._formBuilder.group({
      formInformation : this._formBuilder.group({
        priority : new FormControl('',[Validators.required]),
        remarks : new FormControl('',[Validators.required]),
      })
  });
}
  saveChangesPriority = async() =>{
    let data : any = {
      id : this.id,
      priorityLevel : this.PriorityForm.value.formInformation.priority,
      remarks : this.PriorityForm.value.formInformation.remarks,
      ticketId : this.ticketId,
    
    }
    const d = await this._ticketService.updatePriority(data);
    console.log(data);
      this.clickevent.emit(this.priority);
      this.activeModal.close('Close click');
  }

}
