import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute ,Router , Params } from '@angular/router';
import {urls,status, priorityLevel,problemType , platform} from '../../../app.config';
import { TicketService} from "../../../shared/services/ticket.service";
import { ToasterService } from "../../../shared/services/toaster.service";
import { ToastsManager } from 'ng6-toastr/ng2-toastr';



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
  showColumn : any = false;

  constructor(
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _ticketService : TicketService ,
    private toaster : ToastsManager, vcr: ViewContainerRef)
   {
     this.status = status;
     this.priority = priorityLevel;
     this.problemType = problemType;
     this.platform = platform;
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
        title : new FormControl(null),
        problemType : new FormControl('',[Validators.required]),
        priorityLevel : new FormControl('',[Validators.required]),
        country : new FormControl(''),
        operator : new FormControl(''),
        biller : new FormControl(''),
        platform : new FormControl('',[Validators.required]),
        assignTo : new FormControl(''),
        details : new FormControl(null, [Validators.required]),

      })
    });

  }


  public getTickets = async () =>{
    const data = await this._ticketService.getAllTickets();
    console.log(data);
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
    console.log(problemType);
    
    let data : any = {
      title : this.createTicketForm.value.ticketInformation.title,
      problemType : this.createTicketForm.value.ticketInformation.problemType,
      priorityLevel : this.createTicketForm.value.ticketInformation.priorityLevel,
      details : this.createTicketForm.value.ticketInformation.details,
      status : 'Yet To Start', // need to change,
      platform : this.createTicketForm.value.ticketInformation.platform,
      assignTo : this.createTicketForm.value.ticketInformation.assignTo
    }
    if(problemType==='Integration'){
      data.country = this.createTicketForm.value.ticketInformation.country,
      data.operator = this.createTicketForm.value.ticketInformation.operator,
      data.biller = this.createTicketForm.value.ticketInformation.biller
    }

    console.log(data);
    await this._ticketService.saveTicket(data).then(data =>{
      this.typeSuccess('New Ticket Created Successfully!');
        // this.createTicketForm.patchValue({
        //   ticketInformation:{
        //     title : '',
        //     problemType : '',
        //     priorityLevel: '',
        //     details: '',
        //     platform: '',
        //     assignTo: '',
        //     country: '',
        //     operator: '',
        //     biller : '',
        //   }
        // });
       
  

        this.router.navigate([ '/' +  urls.ticket], { relativeTo: this.route.parent });
    });
    // console.log(re);
  }

  CheckProblemType = async(event?) => {
    let problemType = this.createTicketForm.value.ticketInformation.problemType;
    if(problemType==='Integration')
      this.showColumn = true;
    else
      this.showColumn = false;
    
  }

  addFiles(){

  }

  typeSuccess(message) {
    console.log("toaster service");
    this.toaster.success(message, 'Success!', { "toastLife": 4000 });
}

}
