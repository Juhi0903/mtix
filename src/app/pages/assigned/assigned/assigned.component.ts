import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketService} from "../../../shared/services/ticket.service";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header" style="background-color: #484848 ; color: white; font-weight: bold">
      <h5 class="modal-title">{{ticketId}}</h5>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
     <div class="px-3">
      <form  [formGroup]="AssignedForm" (ngSubmit)="saveChangesAssignedTo()" class="form form-horizontal striped-rows form-bordered">
       <div class="form-body" formGroupName="formInformation">
        <div class="row">  
            <label class="col-md-3 label-control">Primary Member</label>
            <div class="col-md-9">
                <div class="input-group">
                <select  formControlName="assignedTo" name="assignedTo"  class="form-control">
                <option value="" selected="" disabled="true">Select Team Member</option>
                <option *ngFor="let obj of users" [value]='obj.emailId'>{{obj.emailId}}</option>
              </select>
                </div>
            </div>
        </div>
        <div class="row">  
            <label class="col-md-3 label-control">Secondary Member</label>
            <div class="col-md-9">
                <div class="input-group">
                <select  formControlName="supervisor" name="supervisor"  class="form-control">
                <option value="" selected="" disabled="true">Select Team Member</option>
                <option *ngFor="let obj of users" [value]='obj.emailId'>{{obj.emailId}}</option>
              </select>
                </div>
            </div>
        </div>
        <div class="row">
        <label class="col-md-3 label-control">Remarks</label>
          <div class="col-md-9">
              <div class="input-group">
                <textarea rows="8" class="form-control" formControlName="remarks" placeholder="Assigning ticket because " name="remarks" required></textarea>
                <small class="form-text text-muted danger" *ngIf="!AssignedForm.get('formInformation.remarks').valid && (AssignedForm.get('formInformation.remarks').dirty || AssignedForm.get('formInformation.remarks').touched) && 
											AssignedForm.get('formInformation.remarks').hasError('maxlength')">
										Max Length cannot exceed 100 characters.
							</small>
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
      <button type="button" class="btn btn-raised btn-primary" [disabled]="!AssignedForm.valid" (click)="saveChangesAssignedTo()">Save</button>
     </div>
    </div>
  `
})

export class AssignedComponent implements OnInit  {

  @Input() id;
  @Input() eventId;
  @Input() assignedTo;
  @Input() ticketId;
  @Input() title;
  remarks : any;
  AssignedForm : FormGroup;
  ticketDetails = [];

  @Output() clickevent = new EventEmitter<string>();
  users : any =[];

  constructor(public activeModal: NgbActiveModal, private _ticketService: TicketService,private _formBuilder: FormBuilder) {
    this.getAllUsers();
   }

   ngOnInit() {
    this.AssignedForm = this._formBuilder.group({
      formInformation : this._formBuilder.group({
        assignedTo : new FormControl('',[Validators.required]),
        remarks : new FormControl('',[Validators.required,Validators.maxLength(100)]),
        supervisor : new FormControl('',[Validators.required]),
      })
  });

  this.getTicketDetails();
}

  saveChangesAssignedTo= async()=>{
    let data : any = {
      id : this.id,
      assignedTo : this.AssignedForm.value.formInformation.assignedTo,
      remarks : this.AssignedForm.value.formInformation.remarks,
      ticketId : this.ticketId,
      title : this.title,
      supervisor : this.AssignedForm.value.formInformation.supervisor,
    }
    this.activeModal.close('Close click');
    console.log(data);
      await this._ticketService.updateAssigned(data);
      this.clickevent.emit(this.AssignedForm.value.formInformation.assignedTo);
      
  }

  getAllUsers = async() =>{
  this.users = await this._ticketService.getAllUsers();
  }

  getTicketDetails = async() => {
    this.ticketDetails = await this._ticketService.getTicketDetails(this.ticketId);
    // console.log(this.ticketDetails[0]);
    this.AssignedForm.patchValue({
      formInformation:{
        assignedTo: this.ticketDetails[0]['assignedTo'],
        supervisor : this.ticketDetails[0]['supervisor']
      },
    });
  }

}
