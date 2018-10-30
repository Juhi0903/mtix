import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketService} from "../../../shared/services/ticket.service";
import {status} from "../../../app.config";
import {StageComponent } from '../../stage-substage/stage/stage.component';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})

export class StatusComponent  implements OnInit{

  @Input() ticketId;
  @Input() eventId;
  @Input() status;
  StatusForm : FormGroup;
  statusList : any =[];
  enableStage = false;
  enableSubStage = false
  stageList = [];
  substageList = [];

  @Output() clickevent = new EventEmitter<string>();

  constructor(public activeModal: NgbActiveModal, private _ticketService: TicketService, private modalService: NgbModal,private _formBuilder: FormBuilder) { 
    this.statusList = status;
  }

  ngOnInit() {
    this.StatusForm = this._formBuilder.group({
      formInformation : this._formBuilder.group({
        status : new FormControl(this.status,[Validators.required]),
        stage : new FormControl(''),
        substage : new FormControl(''),
        remarks : new FormControl('',[Validators.required]),
      })
  });
}

  saveChangedStatus = async()=>{
    let status = this.StatusForm.value.formInformation.status;
    let data : any = {
      ticketId : this.ticketId,
      status : status,
      remarks : this.StatusForm.value.formInformation.remarks,
    }
    if(status == 'Integration'){
      data.stage = this.StatusForm.value.formInformation.stage,
      data.subStage = this.StatusForm.value.formInformation.substage
    }
      await this._ticketService.updateStatus(data);
      console.log(data);
      this.clickevent.emit(this.status);
      this.activeModal.close('Close click');
  }

  checkStatus= async() =>{
    let status = this.StatusForm.value.formInformation.status;
    if(status=='Integration'){
      this.StatusForm.get('formInformation.stage').setValidators([Validators.required]);
      this.StatusForm.get('formInformation.substage').setValidators([Validators.required]);
      this.stageList = await this._ticketService.getStage();
      this.enableStage = true;
    }
    else{
    this.enableStage= false;
    this.enableSubStage= false;
    this.StatusForm.get('formInformation.stage').setValidators(null);
    this.StatusForm.get('formInformation.substage').setValidators(null);
    this.StatusForm.patchValue({
      formInformation:{
        stage: '',
        substage :'',
      },
    });
    }
    this.StatusForm.get('formInformation.stage').updateValueAndValidity();
    this.StatusForm.get('formInformation.substage').updateValueAndValidity();
  }

  checkStage= async() =>{
    let status = this.StatusForm.value.formInformation.status;
    if(status=='Integration'){
    let data = {
      stage  : this.StatusForm.value.formInformation.stage
    }
    this.substageList = await this._ticketService.getSubStage(data);
    this.enableSubStage= true;
    }
    else{
      this.enableSubStage= false;
    }
    
  }

  createNewStage = async() =>{
    const modalRef = this.modalService.open(StageComponent);
    modalRef.componentInstance.clickevent.subscribe(($e) => {
     this.stageList = $e;
    });
    
  }

  createNewSubStage = async() =>{
    const modalRef = this.modalService.open(StageComponent);
    modalRef.componentInstance.clickevent2.subscribe(($e) => {
      this.substageList = $e;
     });
     modalRef.componentInstance.clickevent.subscribe(($e) => {
      this.stageList = $e;
     });
     modalRef.componentInstance.stage = this.StatusForm.value.formInformation.stage;
  }

}
