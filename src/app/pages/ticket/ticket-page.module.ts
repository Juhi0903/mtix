import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyTicketComponent } from './my-ticket/my-ticket.component';
import { TicketPagesRoutingModule } from "./ticket-page-routing.module";
import { TicketService} from "../../shared/services/ticket.service";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    CommonModule,
    TicketPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule.withComponents([])
  ],
  entryComponents: [
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    MyTicketComponent
  ],
  providers: [
    TicketService
  ]
})
export class TicketPageModule { }
