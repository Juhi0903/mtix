import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyTicketComponent } from './my-ticket/my-ticket.component';
import { TicketPagesRoutingModule } from "./ticket-page-routing.module";

@NgModule({
  imports: [
    CommonModule,
    TicketPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    MyTicketComponent
  ]
})
export class TicketPageModule { }
