import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StageComponent } from './stage/stage.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TicketService} from "../../shared/services/ticket.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [StageComponent],
  providers: [
    TicketService
  ]
})
export class StageSubstageModule { }
