import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute ,Router , Params } from '@angular/router';


@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {

  createTicketForm : FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router )
   { }

  ngOnInit() {
    this._initForm();
  }

  _initForm = ():void => {
    this.createTicketForm = this._formBuilder.group({
      ticketInformation : this._formBuilder.group({
        title : new FormControl(null),
        problemType : new FormControl('',[Validators.required]),
        priorityLevel : new FormControl('',[Validators.required]),
        assignTo : new FormControl('',[Validators.required]),
        details : new FormControl(null),

      })
    });

  }

  resetTicketForm(){
    this._initForm();
  }

}
