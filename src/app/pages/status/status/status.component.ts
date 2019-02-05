import {Component, OnInit, Input, EventEmitter, Output,Inject} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketService} from "../../../shared/services/ticket.service";
import {status,email,headstatus} from "../../../app.config";
import {StageComponent } from '../../stage-substage/stage/stage.component';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpResponse, HttpEventType, HttpClient} from '@angular/common/http';
import { SESSION_STORAGE, StorageService ,LOCAL_STORAGE } from 'angular-webstorage-service';



@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})

export class StatusComponent  implements OnInit{

  @Input() ticketId;
  @Input() eventId;
  @Input() status;
  @Input() updateType ;
  @Input() remarks ;
  @Input() addedOn ;
  @Input() id ;
  @Input() title;
  assignedTo;
  date = new Date();
  StatusForm : FormGroup;
  statusList : any =[];
  enableStage = false;
  enableSubStage = false
  enableStatus = true;
  stageList = [];
  substageList = [];
  users : any = [];
  ticketDetails = [];
  to : any;
  cc: any;
  selectedFiles : any;
  currentFileUpload: File;
  file = false;
  filename : any;
  progress: { percentage: number } = { percentage: 0 };
  email : any = [];
  check : any;
  @Output() clickevent = new EventEmitter<string>();
  @Output() clickevent1 = new EventEmitter<string>();

  constructor(public activeModal: NgbActiveModal, private _ticketService: TicketService, private modalService: NgbModal,private _formBuilder: FormBuilder,@Inject(LOCAL_STORAGE) private storage: StorageService) {
    
    this.getUsers();
    // this.checkStatus();
    // this.checkStage();
  }

  ngOnInit() {
    this.getTicketInfo().then( data => {
      // console.log(this.assignedTo);
      if(this.storage.get('token')=== this.assignedTo)
      this.statusList = headstatus;
      else
      this.statusList = status;
    });;
    
    this.StatusForm = this._formBuilder.group({
      formInformation : this._formBuilder.group({
        status : new FormControl(this.status,[Validators.required]),
        stage : new FormControl(''),
        substage : new FormControl(''),
        remarks : new FormControl(this.remarks,[Validators.required,Validators.maxLength(300)]),
        user : new FormControl(''),
      })
  });

  if(this.status==='Integration'){
      this.enableStage = true;
      this.checkStatus();
      // this.checkStage();
  }
  if(this.updateType=='remarks' || this.updateType=='Reviewed')
    this.enableStatus =false;
}

  saveChangedStatus = async()=>{
    let status = this.StatusForm.value.formInformation.status;
    let remarks = this.StatusForm.value.formInformation.remarks;
       this.check = remarks.includes('@globocom.info');
      if(this.check==true){
        this.users.forEach((res , index) => {
          // console.log(res['email']);
          if(remarks.includes(res['email'])){
            this.email.push(res['email']);
            // console.log(res['email']);
          }
        });
      }
    let user = this.StatusForm.value.formInformation.user;
    let data : any = {
      ticketId : this.ticketId,
      status : status,
      remarks : this.StatusForm.value.formInformation.remarks,
      updateType : 'status',
      
    }
    if(status == 'Integration'){
      data.stage = this.StatusForm.value.formInformation.stage,
      data.subStage = this.StatusForm.value.formInformation.substage
    }
    if(this.file==true){
      data.fileName = this.filename;
      // data.filePath = '/home/juhi/Documents/File/' + this.filename;
      data.filePath = '/home/ubuntu/sanchit/mtix/backup/files/' + this.filename;
      console.log(data.filePath);
    }
    // console.log(data);
    if(this.check==true && this.email.length==1){
      data.to = this.email[0];
      data.title = this.title;
    }
    if(this.check==true && this.email.length>=2){
      data.to = this.email[0];
      data.cc = this.email[1];
      data.title = this.title;
    }
    if(this.updateType=='remarks'){
      // console.log(this.addedOn.includes("00:00"));
      if(this.addedOn.includes("00:00")){
        data.addedOn = this.addedOn.replace('00:00','12:30');
      }
      else{
        data.addedOn = this.addedOn;
      }
      data.updateType = this.updateType;``
      data.status = 'Not Updated';
      data.id = this.id;
    }
    if(this.updateType=='Reviewed'){
      data.status = 'Reviewed';
      data.reviewed = 1;
      this.activeModal.close('Close click');
      await this._ticketService.updateReview(data);
    }
    else{
    // console.log(data);
    this.activeModal.close('Close click');
    await this._ticketService.updateStatus(data);
    
    }

    this.clickevent.emit(this.status);
    this.clickevent1.emit(this.StatusForm.value.formInformation.remarks);
    
      
  }

  checkStatus= async() =>{
    let status = this.StatusForm.value.formInformation.status;
    if(this.status==='Integration' || status=='Integration'){
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
    if(this.status=='Integration' || status=='Integration'){
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

  public getUsers = async () =>{
    let data = await this._ticketService.getAllUsers();
    
    data.forEach((res,index)=>{
      let email = {} as email;
      email['email'] = res['emailId'];
      this.users.push(email);

    })
    //  console.log(this.users);
   }

  //  updateRemarks(){
  //    if(this.count==0) 
  //     this.to = this.StatusForm.value.formInformation.user;
  //   else if(this.count==1)
  //    this.cc = this.StatusForm.value.formInformation.user
     
  //    if(this.count<2){
  //   this.StatusForm.patchValue({
  //     formInformation:{
  //       remarks : this.StatusForm.value.formInformation.remarks.substring(0,this.StatusForm.value.formInformation.remarks.length-1)+ this.StatusForm.value.formInformation.user
  //     },
  //   });
  // }
  // this.count++;
  //  }

   selectFile(event){
    // console.log(event);
    this.selectedFiles = event.target.files[0];
    this.filename = this.selectedFiles.name;
    this.file = true;
  
  }
upload(){
  console.log(this.selectedFiles.name);
  this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles;
    this._ticketService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });
 
    this.selectedFiles = undefined;
  }

  getTicketInfo = async () =>{
    const data = await this._ticketService.getTicketDetails(this.ticketId);
    this.assignedTo = data[0].assignedTo;
  }
   
}
