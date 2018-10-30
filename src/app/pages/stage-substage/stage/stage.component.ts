import { Component, OnInit , Output, EventEmitter, Input} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketService} from "../../../shared/services/ticket.service";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {

  // stage : any;
  subStage : any;
  stageList = [];
  subStageList = [];
  StageForm : FormGroup;
  @Input() stage ;
  @Output() clickevent = new EventEmitter<any>();
  @Output() clickevent2 = new EventEmitter<any>();
  constructor(public activeModal: NgbActiveModal,private _ticketService: TicketService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.StageForm = this._formBuilder.group({
      stageInformation : this._formBuilder.group({
        stage : new FormControl(this.stage,[Validators.required]),
        subStage : new FormControl('',[Validators.required]),
      })
  });
}

  submitNewStage= async()=>{
    let data ={
      stage : this.StageForm.value.stageInformation.stage,
      subStage : this.StageForm.value.stageInformation.subStage,
    }
    console.log(data);
    const result = await this._ticketService.createNewStage(data);
     this.stageList = await this._ticketService.getStage();
     let data1 = {
      stage  : this.StageForm.value.stageInformation.stage
    }
    this.subStageList = await this._ticketService.getSubStage(data1);
    this.clickevent.emit(this.stageList);
    this.clickevent2.emit(this.subStageList);
    this.activeModal.close('Close click');
  }
}
