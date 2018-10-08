import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketService} from "../../shared/services/ticket.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TicketDetailsComponent],
  providers: [
    TicketService
  ]
})
export class TicketDetailsModule { }
