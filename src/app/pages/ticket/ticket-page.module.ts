import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyTicketComponent , EditStatus , EditAndViewDetails} from './my-ticket/my-ticket.component';
import { TicketPagesRoutingModule } from "./ticket-page-routing.module";
import { TicketService} from "../../shared/services/ticket.service";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { StorageServiceModule } from 'angular-webstorage-service';
import {StatusModule} from '../status/status.module';
import {StatusComponent} from '../status/status/status.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {TicketDetailsModule } from '../ticket-details/ticket-details.module';
import {TicketDetailsComponent } from '../ticket-details/ticket-details/ticket-details.component';


@NgModule({
  imports: [
    CommonModule,
    TicketPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule.withComponents([EditStatus, EditAndViewDetails]),
    StorageServiceModule,
    StatusModule,
    NgbModule,
    TicketDetailsModule
  ],
  entryComponents: [
    StatusComponent,
    TicketDetailsComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    MyTicketComponent,
    EditStatus,
    EditAndViewDetails

  ],
  providers: [
    TicketService
  ]
})
export class TicketPageModule { }
