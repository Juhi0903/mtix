import { CommonModule } from "@angular/common";
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import { AssignedComponent } from './assigned/assigned.component';
import { TicketService} from "../../shared/services/ticket.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AssignedComponent],
  providers: [
    TicketService
  ]
})
export class AssignedModule { }
