import {Component, OnInit, ViewChild, Input} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute ,Router , Params } from '@angular/router';

@Component({
  selector: 'app-my-ticket',
  templateUrl: './my-ticket.component.html',
  styleUrls: ['./my-ticket.component.scss']
})
export class MyTicketComponent implements OnInit {


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
}
