import {Component, OnInit, ViewContainerRef, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute ,Router , Params } from '@angular/router';
import {urls,status, priorityLevel,problemType , platform, techSubProblem} from '../../../app.config';
import { TicketService} from "../../../shared/services/ticket.service";
import { ToasterService } from "../../../shared/services/toaster.service";
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpResponse, HttpEventType, HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
  providers : [TicketService],
})
export class CreateTicketComponent implements OnInit {

  createTicketForm : FormGroup;
  status : any = []; 
  priority : any = [];
  problemType : any =[];
  platform : any = [];
  users : any = [];
  ticketList : any = [];
  showPlatform : any = false;
  showColumn : any = false;
  ticketId : any;
  title : any;
  showIdCoulmn = false;
  ticketDetails = [];
  subProblem = [];
  selectedFiles : any;
  currentFileUpload: File;
  file = false;
  filename : any;
  progress: { percentage: number } = { percentage: 0 };

  constructor(
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _ticketService : TicketService ,
    private toaster : ToastsManager, vcr: ViewContainerRef,
    private _httpclient : HttpClient)
   {
    this.ticketId= this.route.snapshot.paramMap.get('id');
    if(this.ticketId!=null){
      this.showIdCoulmn = true;
      this.getParentTicketInfo();
    }
    console.log(this.ticketId);
     this.status = status;
     this.priority = priorityLevel;
     this.problemType = problemType;
     this.platform = platform;
     this.subProblem = techSubProblem;
     this.toaster.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
    this._initForm();
    this.getTickets();
    this.getUsers();
  }

  _initForm = ():void => {
    this.createTicketForm = this._formBuilder.group({
      ticketInformation : this._formBuilder.group({
        ticketId : new FormControl(this.ticketId),
        title : new FormControl(null),
        problemType : new FormControl('',[Validators.required]),
        priorityLevel : new FormControl('',[Validators.required]),
        country : new FormControl(''),
        operator : new FormControl(''),
        biller : new FormControl(''),
        platform : new FormControl(''),
        subProblem : new FormControl(''),
        assignTo : new FormControl('',[Validators.required]),
        supervisor : new FormControl('',[Validators.required]),
        details : new FormControl(null, [Validators.required,Validators.maxLength(500)]),

      })
    });

  }


  public getTickets = async () =>{
    const data = await this._ticketService.getAllTickets();
    // console.log(data);
  }

  public getUsers = async () =>{
   this.users = await this._ticketService.getAllUsers();
    // console.log(data);
  }


  resetTicketForm(){
    this._initForm();
  }

  submitNewTicket = async () => {
    let problemType = this.createTicketForm.value.ticketInformation.problemType;
    let subProblemType = this.createTicketForm.value.ticketInformation.subProblem;
    console.log(problemType);
    
    let data : any = {
      title : this.createTicketForm.value.ticketInformation.title,
      problemType : this.createTicketForm.value.ticketInformation.problemType,
      priorityLevel : this.createTicketForm.value.ticketInformation.priorityLevel,
      details : this.createTicketForm.value.ticketInformation.details,
      status : 'Yet To Start', // need to change,
      assignTo : this.createTicketForm.value.ticketInformation.assignTo,
      supervisor : this.createTicketForm.value.ticketInformation.supervisor,
      country : this.createTicketForm.value.ticketInformation.country,
    }
    if(problemType==='Technical'){
      data.subProblem = subProblemType;
      data.platform = this.createTicketForm.value.ticketInformation.platform;
    }
    if(subProblemType==='Integration'){
      // data.country = this.createTicketForm.value.ticketInformation.country,
      data.operator = this.createTicketForm.value.ticketInformation.operator,
      data.biller = this.createTicketForm.value.ticketInformation.biller
    }
    if(this.file==true){
      data.fileName = this.filename;
      // data.filePath = '/home/juhi/Documents/File/' + this.filename;
      data.filePath = '/home/ubuntu/sanchit/mtix/backup/files/' + this.filename;
    }
    console.log(data);
    if(this.ticketId!=null){
      data.parentTicket = this.createTicketForm.value.ticketInformation.ticketId;
       await this._ticketService.saveSubTicket(data);
     }
     else{
      data.parentTicket = 'Null'
      await this._ticketService.saveTicket(data);
     }
     this.router.navigate([ '/' +  urls.ticket], { relativeTo: this.route.parent });
  }

  CheckProblemType = async() => {
    let problemType = this.createTicketForm.value.ticketInformation.problemType;
    if(problemType==='Technical'){
      this.createTicketForm.get('ticketInformation.subProblem').setValidators([Validators.required]);
      this.createTicketForm.get('ticketInformation.platform').setValidators([Validators.required]);
      this.showPlatform = true;
    }
    else{
      this.createTicketForm.get('ticketInformation.subProblem').setValidators(null);
      this.createTicketForm.get('ticketInformation.platform').setValidators(null);
      this.showPlatform = false;
      this.showColumn = false;
    }
    this.createTicketForm.get('ticketInformation.subProblem').updateValueAndValidity();
    this.createTicketForm.get('ticketInformation.platform').updateValueAndValidity();
  }

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
// const path = 'http://localhost:3000/v1/user/upload';
//     const fd = new FormData();
//     fd.append('file',this.selectedFiles,this.selectedFiles.name);
//     // console.log(fd);
//     this._httpclient.post(path,fd).subscribe(res=>{
//       console.log(res)
//     });
  }

  typeSuccess(message) {
    console.log("toaster service");
    this.toaster.success(message, 'Success!', { "toastLife": 4000 });
}

  getParentTicketInfo = async () =>{
    this.ticketDetails = await this._ticketService.getTicketDetails(this.ticketId);
    this.ticketDetails.forEach((res , index) => {
      res['addedOn'] = this.todayDate(res['addedOn']);
      this.title = res['title'];
   });
  }
  todayDate(dateparam){
    return dateparam.toString().substring(0,10);
  }

  CheckSubProblemType = async(event?) => {
    let subProblem = this.createTicketForm.value.ticketInformation.subProblem;
    if(subProblem==='Integration'){
      this.createTicketForm.get('ticketInformation.country').setValidators([Validators.required]);
      this.createTicketForm.get('ticketInformation.operator').setValidators([Validators.required]);
      this.createTicketForm.get('ticketInformation.biller').setValidators([Validators.required]);
      this.showColumn = true;
    }
    else{
      this.createTicketForm.get('ticketInformation.country').setValidators(null);
      this.createTicketForm.get('ticketInformation.operator').setValidators(null);
      this.createTicketForm.get('ticketInformation.biller').setValidators(null);
      this.showColumn = false;
    }
    this.createTicketForm.get('ticketInformation.country').updateValueAndValidity();
    this.createTicketForm.get('ticketInformation.operator').updateValueAndValidity();
    this.createTicketForm.get('ticketInformation.biller').updateValueAndValidity();
    
  }

  

}
