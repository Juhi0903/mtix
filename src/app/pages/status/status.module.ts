import { CommonModule } from "@angular/common";
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { StatusComponent } from './status/status.component';
import { TicketService} from "../../shared/services/ticket.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [StatusComponent],
  providers: [
    TicketService
  ]
})
export class StatusModule { }
