import { CommonModule } from "@angular/common";
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PriorityComponent } from './priority/priority.component';
import { TicketService} from "../../shared/services/ticket.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [PriorityComponent],
  providers: [
    TicketService
  ]
})
export class PriorityModule { }
